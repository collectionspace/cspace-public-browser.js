/* global fetch */

import get from 'lodash/get';
import config from '../config';
import { getMedia } from '../reducers';

import {
  SET_MEDIA,
} from '../constants/actionCodes';

export const setMedia = (referenceValue, institutionId, mediaCsids, mediaAltTexts, title) => ({
  type: SET_MEDIA,
  payload: {
    title,
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

  const query = {
    _source: ['collectionspace_denorm:mediaCsid', 'collectionspace_denorm:mediaAltText', 'collectionspace_denorm:title'],
    query: {
      term: {
        [referenceField]: referenceValue,
      },
    },
    size: 1,
    terminate_after: 1,
  };

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  })
    .then((response) => response.json())
    .then((data) => {
      const source = get(data, ['hits', 'hits', 0, '_source']);
      const title = get(source, 'collectionspace_denorm:title');
      const mediaCsids = get(source, 'collectionspace_denorm:mediaCsid') || [];
      const mediaAltTexts = get(source, 'collectionspace_denorm:mediaAltText') || [];

      return dispatch(setMedia(referenceValue, institutionId, mediaCsids, mediaAltTexts, title));
    });
};
