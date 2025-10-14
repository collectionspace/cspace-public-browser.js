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

  const url = `${gatewayUrl}/es/doc/_search`;
  const referenceField = config.get('referenceField');

  const sortField = Object.keys(config.get('mediaSnapshotSort'))[0];
  const sortDirection = config.get('mediaSnapshotSort')[sortField];

  const query = {
    _source: [referenceField, 'media_common:altText'],
    query: {
      terms: {
        'collectionspace_denorm:objectCsid': [referenceValue],
      },
    },
    sort: {
      [sortParams[sortField]]: sortDirection,
    },
    size: 10000, // TODO: check if we should use scroll API instead of hardcoding the size
  };

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  })
    .then((response) => response.json())
    .then((data) => {
      const hits = get(data, ['hits', 'hits'], []);
      const mediaCsids = hits.map((hit) => get(hit, ['_source', referenceField], ''));
      const mediaAltTexts = hits.map((hit) => get(hit, ['_source', 'media_common:altText'], ''));

      return dispatch(setMedia(referenceValue, institutionId, mediaCsids, mediaAltTexts));
    });
};
