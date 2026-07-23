/* global fetch, window */

import Immutable from 'immutable';
import config from '../config';
import { SEARCH_QUERY_ID, SORT_ID } from '../constants/ids';
import { locationToSearchParams, searchParamsToQueryString } from '../helpers/urlHelpers';

import {
  getSearchNextOffset,
  getSearchPageSize,
  getSearchParams,
  isSearchPending,
  searchHasMore,
} from '../reducers';

import {
  OPEN_SEARCH,
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
  SET_SEARCH_PAGE_SIZE,
  SET_SEARCH_PARAMS,
} from '../constants/actionCodes';

import {
  getAggs,
  getSearchResultPayload,
  getQuery,
  getFilterAgg,
} from '../helpers/esQueryHelpers';

export const openSearch = (history, params = Immutable.Map()) => {
  const queryString = searchParamsToQueryString(params);

  history.push({
    search: `?${queryString}`,
  });

  return {
    type: OPEN_SEARCH,
    payload: queryString,
  };
};

export const search = (fetchDelay = 0) => (dispatch, getState) => {
  const params = getSearchParams(getState());

  if (!params || isSearchPending(getState()) || !searchHasMore(getState())) {
    return Promise.resolve();
  }

  const gatewayUrl = config.get('gatewayUrl');
  const url = `${gatewayUrl}/es/_msearch`;

  const offset = getSearchNextOffset(getState()) || 0;
  const pageSize = getSearchPageSize(getState()) || 15;
  const resultPayload = getSearchResultPayload(params, pageSize, offset);

  let filterAggPayloads = [];

  if (offset === 0) {
    // When loading the first page, get aggregations.

    resultPayload.aggs = getAggs(params);

    filterAggPayloads = params
      .delete(SORT_ID)
      .delete(SEARCH_QUERY_ID)
      .keySeq()
      .flatMap((id) => {
        const filterFieldConfig = config.getFilterFieldConfig(id);

        return [
          {
            preference: id,
          },
          {
            query: getQuery(params.delete(id)),
            size: 0,
            aggs: {
              [id]: getFilterAgg(filterFieldConfig),
            },
          },
        ];
      })
      .toJS();
  }

  dispatch({
    type: SEARCH_STARTED,
  });

  const delay = new Promise((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, fetchDelay);
  });

  return delay
    .then(() => fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-ndjson' },
      body: [
        JSON.stringify({ preference: 'result' }),
        JSON.stringify(resultPayload),
        ...filterAggPayloads.map((payload) => JSON.stringify(payload)),
      ].join('\n'),
    }))
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
        type: SEARCH_FULFILLED,
        payload: data,
        meta: {
          offset,
          pageSize,
          params,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: SEARCH_REJECTED,
        payload: error,
        meta: {
          offset,
          pageSize,
          params,
        },
      });
    });
};

export const setSearchPageSize = (pageSize) => ({
  type: SET_SEARCH_PAGE_SIZE,
  payload: pageSize,
});

export const setSearchParams = (location) => {
  const params = locationToSearchParams(location);

  return {
    type: SET_SEARCH_PARAMS,
    payload: params,
  };
};

export const applyFilter = (history, id, value, isSelected) => (dispatch, getState) => {
  const params = getSearchParams(getState());

  let selectedValues = params.get(id) || Immutable.List();

  if (!Immutable.List.isList(selectedValues)) {
    selectedValues = Immutable.List.of(selectedValues);
  }

  let nextParams;

  if (isSelected) {
    nextParams = params.set(id, selectedValues.push(value));
  } else {
    const selectedIndex = selectedValues.indexOf(value);

    if (selectedIndex >= 0) {
      nextParams = (selectedValues.size > 1)
        ? params.set(id, selectedValues.delete(selectedIndex))
        : params.delete(id);
    } else {
      nextParams = params;
    }
  }

  return dispatch(openSearch(history, nextParams));
};

export const applySortOrder = (history, sortOrder) => (dispatch, getState) => (
  dispatch(openSearch(history, getSearchParams(getState()).set(SORT_ID, sortOrder)))
);
