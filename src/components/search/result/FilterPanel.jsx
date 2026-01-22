/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import FilterList from './FilterList';
import config from '../../../config';
import styles from '../../../../styles/cspace/FilterPanel.css';
import cssDimensions from '../../../../styles/dimensions.css';

const propTypes = {
  api: PropTypes.func,
  isExpanded: PropTypes.bool,
  isPending: PropTypes.bool,
  result: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  api: () => undefined,
  isExpanded: false,
  isPending: false,
  result: Immutable.Map(),
};

const messages = defineMessages({
  title: {
    id: 'FilterPanel.title',
    defaultMessage: 'Refine results:',
  },
  noFiltersCanBeApplied: {
    id: 'FilterPanel.noFiltersCanBeApplied',
    defaultMessage: 'No filters can be applied',
  },
});

const {
  filterPanelCutoffWidth: cssFilterPanelCutoffWidth,
} = cssDimensions;

const filterPanelCutoffWidth = parseInt(cssFilterPanelCutoffWidth, 10);

export default class FilterPanel extends Component {
  constructor() {
    super();

    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.ref = React.createRef();

    this.state = {};
  }

  componentDidMount() {
    const {
      api,
    } = this.props;

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);

    api({
      setHeight: this.setHeight.bind(this),
    });

    this.setHeight();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleResize() {
    this.setHeight();
  }

  handleScroll() {
    this.setHeight();
  }

  setHeight() {
    const height = window.innerHeight;
    const rect = this.ref.current.getBoundingClientRect();
    const maxHeight = height - rect.top;

    this.setState({
      height: maxHeight,
    });
  }

  renderContent() {
    const {
      isExpanded,
      isPending,
      result,
    } = this.props;

    const isVisible = (window.innerWidth > filterPanelCutoffWidth) || isExpanded;

    if (!isVisible) {
      return undefined;
    }

    return (
      <div>
        <header>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormattedMessage {...messages.title} />
        </header>

        {
          !result.get('total') ? (
            <div className={styles.p20}>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <FormattedMessage {...messages.noFiltersCanBeApplied} />
            </div>
          ) : (
            <FilterList
              aggregations={result.get('aggregations')}
              config={config.get('filters')}
              isPending={isPending}
            />
          )
        }
      </div>
    );
  }

  render() {
    const {
      isExpanded,
    } = this.props;

    const {
      height,
    } = this.state;

    const className = isExpanded ? styles.expanded : styles.collapsed;
    const inlineStyle = height ? { height } : undefined;

    return (
      <div
        className={className}
        ref={this.ref}
        style={inlineStyle}
      >
        {this.renderContent()}
      </div>
    );
  }
}

FilterPanel.propTypes = propTypes;
FilterPanel.defaultProps = defaultProps;
