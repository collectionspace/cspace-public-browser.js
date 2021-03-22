import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import SearchPending from './SearchPending';
import SearchResultTile from './SearchResultTile';
import config from '../../../config';
import styles from '../../../../styles/cspace/SearchResultList.css';

const propTypes = {
  hits: PropTypes.instanceOf(Immutable.List),
  isPending: PropTypes.bool,
  offset: PropTypes.number,
  onHitsUpdated: PropTypes.func,
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const defaultProps = {
  hits: Immutable.List(),
  isPending: false,
  offset: 0,
  onHitsUpdated: () => undefined,
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

  renderPending() {
    const {
      isPending,
      hits
    } = this.props;
    if(isPending){
      return (
        <SearchPending />
      );
    }else{
      if (hits.size === 0) {
        return (
          <p>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <FormattedMessage {...messages.noResult} />
          </p>
        );
      }
    }
  }

  renderHits() {
    const {
      params,
      hits,
    } = this.props;

    const gatewayUrl = config.get('gatewayUrl');

    return hits.map((result, index) => (
      <SearchResultTile
        gatewayUrl={gatewayUrl}
        index={index}
        key={result.getIn(['_source', 'ecm:name'])}
        params={params}
        result={result}
      />
    ));
  }

  render() {
    return (
      <div className={styles.common} ref={this.domNode}>
        {this.renderHits()}
        {this.renderPending()}
      </div>
    );
  }
}

SearchResultList.propTypes = propTypes;
SearchResultList.defaultProps = defaultProps;
