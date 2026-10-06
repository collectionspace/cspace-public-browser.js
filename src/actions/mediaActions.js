/* global fetch */

import get from 'lodash/get';
import config from '../config';
import { getMedia } from '../reducers';

import {
  SET_MEDIA,
} from '../constants/actionCodes';

// TODO: this should not be hardcoded here. Check deriving from plugin or shared lib
const sortParams = {
  updatedAt: 'collectionspace_core:updatedAt',
  identificationNumber: 'media_common:identificationNumber',
  title: 'media_common:title',
};

export const setMedia = (referenceValue, institutionId, mediaCsids, mediaAltTexts) => ({
  type: SET_MEDIA,
  payload: {
    csids: mediaCsids,
    altTexts: mediaAltTexts,
  },
  meta: {
    institutionId,
    referenceValue,
  },
});

const postQuery = (url, query) => fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(query),
}).then((response) => response.json());

/**
 * Find media by searching for published media records that are related to the record, using the
 * objectCsid field that is denormalized onto media records.
 */
const findRelatedMediaRecords = (url, referenceField, referenceValue) => {
  const mediaSnapshotSortConfig = config.get('mediaSnapshotSort');
  const [sortField, sortDirection] = typeof mediaSnapshotSortConfig === 'string'
    ? mediaSnapshotSortConfig.split(':')
    : [];
  const validSort = sortParams[sortField] && (sortDirection === 'asc' || sortDirection === 'desc');

  const query = {
    _source: [referenceField, 'media_common:altText'],
    query: {
      terms: {
        'collectionspace_denorm:objectCsid': [referenceValue],
      },
    },
    ...(validSort && { sort: { [sortParams[sortField]]: sortDirection } }),
    size: 10000, // TODO: check if we should use scroll API instead of hardcoding the size
  };

  return postQuery(url, query).then((data) => {
    const hits = get(data, ['hits', 'hits'], []);

    return {
      mediaCsids: hits.map((hit) => get(hit, ['_source', referenceField], '')),
      mediaAltTexts: hits.map((hit) => get(hit, ['_source', 'media_common:altText'], '')),
    };
  });
};

/**
 * Find media by reading the media csids that are denormalized onto the record itself. This is
 * needed for profiles (e.g. materials) that do not denormalize objectCsid onto media records.
 */
const findDenormalizedMedia = (url, referenceField, referenceValue) => {
  const query = {
    _source: ['collectionspace_denorm:mediaCsid', 'collectionspace_denorm:mediaAltText'],
    query: {
      term: {
        [referenceField]: referenceValue,
      },
    },
    size: 1,
    terminate_after: 1,
  };

  return postQuery(url, query).then((data) => {
    const source = get(data, ['hits', 'hits', 0, '_source']);

    return {
      mediaCsids: get(source, 'collectionspace_denorm:mediaCsid') || [],
      mediaAltTexts: get(source, 'collectionspace_denorm:mediaAltText') || [],
    };
  });
};

export const findMedia = (referenceValue, institutionId) => (dispatch, getState) => {
  if (getMedia(getState(), referenceValue, institutionId)) {
    return Promise.resolve();
  }

  let gatewayUrl;

  if (institutionId === null) {
    gatewayUrl = config.get('gatewayUrl');
  } else {
    gatewayUrl = config.get(['institutions', institutionId, 'gatewayUrl']);
  }

  const url = `${gatewayUrl}/es/_search`;
  const referenceField = config.get('referenceField');

  const find = (config.get('mediaSource') === 'record')
    ? findDenormalizedMedia
    : findRelatedMediaRecords;

  return find(url, referenceField, referenceValue)
    .then(({ mediaCsids, mediaAltTexts }) => (
      dispatch(setMedia(referenceValue, institutionId, mediaCsids, mediaAltTexts))
    ));
};
