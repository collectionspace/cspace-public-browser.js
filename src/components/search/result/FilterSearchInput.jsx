import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import styles from '../../../../styles/cspace/FilterSearchInput.css';

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  onCommit: PropTypes.func,
  value: PropTypes.string,
};

const defaultProps = {
  onCommit: () => undefined,
  value: '',
};

const messages = defineMessages({
  label: {
    id: 'filterSearchInput.label',
    defaultMessage: 'Search',
  },
});

class FilterSearchInput extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {
      onCommit,
    } = this.props;

    onCommit(event.target.value);
  }

  render() {
    const {
      intl,
      value,
    } = this.props;

    const label = intl.formatMessage(messages.label);

    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label>
        {label}

        <input
          className={styles.common}
          type="search"
          value={value}
          onChange={this.handleChange}
        />
      </label>
    );
  }
}

FilterSearchInput.propTypes = propTypes;
FilterSearchInput.defaultProps = defaultProps;

export default injectIntl(FilterSearchInput);
