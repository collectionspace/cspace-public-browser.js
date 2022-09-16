import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { defineMessages, injectIntl } from 'react-intl';
import config from '../../../config';
import styles from '../../../../styles/cspace/SortSelect.css';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  onCommit: PropTypes.func,
  value: PropTypes.string,
};

const defaultProps = {
  onCommit: () => undefined,
  value: config.get('defaultSortOrder'),
};

const messages = defineMessages({
  label: {
    id: 'sortSelect.label',
    defaultMessage: 'Sort results by',
  },
  bestmatch: {
    id: 'sortSelect.bestmatch',
    defaultMessage: 'Best match',
  },
  atoz: {
    id: 'sortSelect.atoz',
    defaultMessage: 'A to Z',
  },
  ztoa: {
    id: 'sortSelect.ztoa',
    defaultMessage: 'Z to A',
  },
  newest: {
    id: 'sortSelect.newest',
    defaultMessage: 'Newest',
  },
  oldest: {
    id: 'sortSelect.oldest',
    defaultMessage: 'Oldest',
  },
});

class SortSelect extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {
      history,
      onCommit,
    } = this.props;

    onCommit(history, event.target.value);
  }

  render() {
    const {
      intl,
      value,
    } = this.props;

    return (
      <label
        htmlFor="sort-select"
      >
        Sort by
        {' '}
        <select
          className={styles.common}
          id="sort-select"
          value={value}
          onChange={this.handleChange}
        >
          {
            ['bestmatch', 'atoz', 'ztoa', 'newest', 'oldest'].map((sortOrder) => (
              <option
                key={sortOrder}
                value={sortOrder}
              >
                {intl.formatMessage(messages[sortOrder])}
              </option>
            ))
          }
        </select>
      </label>
    );
  }
}

SortSelect.propTypes = propTypes;
SortSelect.defaultProps = defaultProps;

export default withRouter(injectIntl(SortSelect));
