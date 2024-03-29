import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import SearchError from './SearchError';
import SearchLoadMore from './SearchLoadMore';
import SearchPending from './SearchPending';
import SearchResultTile from './SearchResultTile';
import config from '../../../config';
import { calculateSearchPageSize } from '../../../helpers/searchDimensions';
import styles from '../../../../styles/cspace/SearchResultList.css';

const propTypes = {
  error: PropTypes.instanceOf(Error),
  hits: PropTypes.instanceOf(Immutable.List),
  isPending: PropTypes.bool,
  onHitsUpdated: PropTypes.func,
  onLoadMoreClick: PropTypes.func,
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
  showLoadMore: PropTypes.bool,
};

const defaultProps = {
  error: undefined,
  hits: Immutable.List(),
  isPending: false,
  onHitsUpdated: () => undefined,
  onLoadMoreClick: () => undefined,
  showLoadMore: false,
};

const messages = defineMessages({
  noResult: {
    id: 'searchResultList.noResult',
    defaultMessage: 'No results found',
  },
});

export default class SearchResultList extends Component {
  componentDidUpdate(prevProps) {
    const {
      hits,
      onHitsUpdated,
    } = this.props;

    const {
      hits: prevHits,
    } = prevProps;

    if (hits !== prevHits) {
      onHitsUpdated();
    }
  }

  renderError() {
    const {
      error,
    } = this.props;

    if (!error) {
      return undefined;
    }

    return (
      <SearchError error={error} />
    );
  }

  renderLoadMore() {
    const {
      isPending,
      onLoadMoreClick,
      showLoadMore,
    } = this.props;

    if (!showLoadMore || isPending) {
      return undefined;
    }

    return (
      <SearchLoadMore onClick={onLoadMoreClick} />
    );
  }

  renderPending() {
    const {
      isPending,
    } = this.props;

    if (!isPending) {
      return undefined;
    }

    return (
      <SearchPending />
    );
  }

  renderHits() {
    const {
      error,
      params,
      hits,
      isPending,
    } = this.props;

    if (hits.size === 0 && !isPending && !error) {
      return (
        <p>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormattedMessage {...messages.noResult} />
        </p>
      );
    }

    const gatewayUrl = config.get('gatewayUrl');
    const pageSize = calculateSearchPageSize();

    return hits.map((result, index) => (
      <SearchResultTile
        gatewayUrl={gatewayUrl}
        loadImageImmediately={index < pageSize}
        index={index}
        key={result.getIn(['_source', 'ecm:name'])}
        params={params}
        result={result}
      />
    ));
  }

  render() {
    return (
      <div className={styles.common}>
        {this.renderHits()}
        {this.renderLoadMore()}
        {this.renderPending()}
        {this.renderError()}
      </div>
    );
  }
}

SearchResultList.propTypes = propTypes;
SearchResultList.defaultProps = defaultProps;
