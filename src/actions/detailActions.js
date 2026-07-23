/* global fetch */

import config from '../config';
import { locationToDetailParams } from '../helpers/urlHelpers';

import {
  getDetailData,
  getDetailParams,
  isDetailPending,
  isDetailInstSearchPending,
} from '../reducers';

import {
  CLEAR_DETAIL,
  DETAIL_READ_FULFILLED,
  DETAIL_READ_REJECTED,
  DETAIL_READ_STARTED,
  INST_SEARCH_FULFILLED,
  INST_SEARCH_REJECTED,
  INST_SEARCH_STARTED,
  SET_DETAIL_PARAMS,
} from '../constants/actionCodes';

import {
  getSearchResultPayload,
} from '../helpers/esQueryHelpers';

export const clearDetail = () => ({
  type: CLEAR_DETAIL,
});

export const setDetailParams = (location, match) => {
  const params = locationToDetailParams(location, match);

  return {
    type: SET_DETAIL_PARAMS,
    payload: params,
  };
};

export const findInstitutionHoldings = (institutionId) => (dispatch, getState) => {
  const params = getDetailParams(getState());
  const data = getDetailData(getState());

  if (
    !params
    || !data
    || isDetailPending(getState())
    || isDetailInstSearchPending(getState(), institutionId)
  ) {
    return Promise.resolve();
  }

  const holdingsConfig = config.get('institutionHoldings') || {};

  const {
    sortField,
    sortOrder,
    query: queryBuilder,
  } = holdingsConfig;

  const institutionsConfig = config.get('institutions') || {};
  const institutionConfig = institutionsConfig[institutionId];

  if (!queryBuilder || !institutionConfig) {
    return Promise.resolve();
  }

  const {
    gatewayUrl,
  } = institutionConfig;

  const url = `${gatewayUrl}/es/_search`;
  const query = queryBuilder(data);

  const payload = {
    query,
    from: 0,
    size: 500,
  };

  if (sortField) {
    payload.sort = {
      [sortField]: {
        order: sortOrder || 'asc',
      },
    };
  }

  dispatch({
    type: INST_SEARCH_STARTED,
    meta: {
      institutionId,
      params,
    },
  });

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error();

        error.response = response;

        return Promise.reject(error);
      }

      return response.json();
    })
    .then((responseData) => {
      dispatch({
        type: INST_SEARCH_FULFILLED,
        payload: responseData,
        meta: {
          institutionId,
          params,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: INST_SEARCH_REJECTED,
        payload: error,
        meta: {
          institutionId,
          params,
        },
      });
    });
};

export const findAllInstitutionHoldings = () => (dispatch) => {
  const institutionsConfig = config.get('institutions');

  if (!institutionsConfig) {
    return Promise.resolve();
  }

  return Promise.all(Object.keys(institutionsConfig).map((institutionId) => (
    dispatch(findInstitutionHoldings(institutionId))
  )));
};

export const readDetail = () => (dispatch, getState) => {
  const params = getDetailParams(getState());

  if (!params || isDetailPending(getState())) {
    return Promise.resolve();
  }

  const gatewayUrl = config.get('gatewayUrl');
  const url = `${gatewayUrl}/es/_msearch`;

  const csid = params.get('csid');
  const index = params.get('index');
  const searchParams = params.get('searchParams');

  const detailPayload = {
    query: {
      term: {
        'ecm:name': csid,
      },
    },
    from: 0,
    size: 1,
  };

  const bodyParts = [
    JSON.stringify({ preference: 'detail' }),
    JSON.stringify(detailPayload),
  ];

  if (searchParams && typeof index !== 'undefined') {
    const adjacentResultsPayload = getSearchResultPayload(
      searchParams,
      3,
      Math.max(0, index - 1),
    );

    bodyParts.push(JSON.stringify({ preference: 'adjacent' }));
    bodyParts.push(JSON.stringify(adjacentResultsPayload));
  }

  dispatch({
    type: DETAIL_READ_STARTED,
    meta: {
      params,
    },
  });

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-ndjson' },
    body: bodyParts.join('\n'),
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error();

        error.response = response;

        return Promise.reject(error);
      }

      return response.json();
    })
    .then((data) => {
      dispatch({
        type: DETAIL_READ_FULFILLED,
        payload: data,
        meta: {
          params,
        },
      });

      dispatch(findAllInstitutionHoldings());
    })
    .catch((error) => {
      dispatch({
        type: DETAIL_READ_REJECTED,
        payload: error,
        meta: {
          params,
        },
      });
    });
};
