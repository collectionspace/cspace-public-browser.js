/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { defineMessages, injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import Immutable from 'immutable';
import bodyClassName from '../../helpers/bodyClassName';
import Fixed from '../layout/Fixed';
import FilterPanel from '../search/result/FilterPanelContainer';
import SearchEntryPanel from '../search/entry/SearchEntryPanel';
import SearchResultPanel from '../search/result/SearchResultPanelContainer';
import ScrollTopButton from '../layout/ScrollTopButton';
import ToggleFilterPanelButton from '../layout/ToggleFilterPanelButton';
import { FILTER_PANEL_ID } from '../../constants/ids';
import styles from '../../../styles/cspace/SearchPage.css';

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  isFilterPanelExpanded: PropTypes.bool,
  onLocationChange: PropTypes.func,
  onTogglePanelButtonClick: PropTypes.func,
  params: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  isFilterPanelExpanded: false,
  onLocationChange: () => undefined,
  onTogglePanelButtonClick: () => undefined,
  params: undefined,
};

const messages = defineMessages({
  title: {
    id: 'SearchPage.title',
    defaultMessage: 'Search',
  },
});

class SearchPage extends Component {
  constructor() {
    super();

    this.handleFilterPanelApi = this.handleFilterPanelApi.bind(this);
    this.handleSearchResultListHitsUpdated = this.handleSearchResultListHitsUpdated.bind(this);
    this.handleToggleFilterPanelButtonClick = this.handleToggleFilterPanelButtonClick.bind(this);
  }

  componentDidMount() {
    window.document.body.classList.add(bodyClassName(styles.common));

    if (window.scrollTo) {
      window.scrollTo({
        left: 0,
        top: 0,
      });
    }

    this.handleLocationChange();
  }

  componentDidUpdate(prevProps) {
    const {
      location,
    } = this.props;

    const {
      location: prevLocation,
    } = prevProps;

    if (location !== prevLocation) {
      this.handleLocationChange();
    }
  }

  componentWillUnmount() {
    window.document.body.classList.remove(bodyClassName(styles.common));
  }

  handleFilterPanelApi(api) {
    this.filterPanelApi = api;
  }

  handleLocationChange() {
    const {
      location,
      onLocationChange,
    } = this.props;

    onLocationChange(location);
  }

  handleSearchResultListHitsUpdated() {
    if (this.filterPanelApi) {
      this.filterPanelApi.setHeight();
    }
  }

  handleToggleFilterPanelButtonClick() {
    const {
      onTogglePanelButtonClick,
    } = this.props;

    onTogglePanelButtonClick(FILTER_PANEL_ID);
  }

  render() {
    const {
      intl,
      isFilterPanelExpanded,
      params,
    } = this.props;

    if (!params) {
      return null;
    }

    const title = intl.formatMessage(messages.title);

    return (
      <div className={styles.common}>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <Fixed>
          <SearchEntryPanel />

          <ToggleFilterPanelButton
            isFilterPanelExpanded={isFilterPanelExpanded}
            onClick={this.handleToggleFilterPanelButtonClick}
          />

          <aside>
            <FilterPanel
              api={this.handleFilterPanelApi}
              isExpanded={isFilterPanelExpanded}
            />
          </aside>
        </Fixed>

        <SearchResultPanel
          params={params}
          onHitsUpdated={this.handleSearchResultListHitsUpdated}
        />

        <ScrollTopButton />
      </div>
    );
  }
}

SearchPage.propTypes = propTypes;
SearchPage.defaultProps = defaultProps;

export default injectIntl(withRouter(SearchPage));
