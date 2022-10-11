import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import Immutable from 'immutable';
import memoize from 'memoize-one';
import FilterSearchInput from './FilterSearchInput';
import Panel from '../../layout/PanelContainer';
import styles from '../../../../styles/cspace/Filter.css';

const propTypes = {
  aggregation: PropTypes.instanceOf(Immutable.Map),
  field: PropTypes.string.isRequired,
  formatValue: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  messages: PropTypes.shape({
    label: PropTypes.object.isRequired,
  }).isRequired,
  onSearchValueCommit: PropTypes.func,
  onValueCommit: PropTypes.func,
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
  searchValue: PropTypes.string,
  showSearch: PropTypes.bool,
};

const defaultProps = {
  aggregation: Immutable.Map(),
  formatValue: undefined,
  onSearchValueCommit: () => undefined,
  onValueCommit: () => undefined,
  searchValue: undefined,
  showSearch: true,
};

const messages = defineMessages({
  count: {
    id: 'filter.count',
    defaultMessage: '({count, number})',
  },
});

const getFormattedValues = memoize((aggregation, formatValue) => {
  if (!formatValue) {
    return undefined;
  }

  const formattedValues = {};

  aggregation.get('buckets').forEach((bucket) => {
    const value = bucket.get('key');
    const formattedValue = formatValue(value);

    formattedValues[value] = formattedValue;
  });

  return formattedValues;
});

const handleCheckboxFocus = (event) => {
  const {
    target: focusedFieldElement,
  } = event;

  const fieldIndex = focusedFieldElement.getAttribute('data-number');
  const focusedFieldLiElement = focusedFieldElement.parentElement.parentElement;
  const focusedFieldUlElement = focusedFieldLiElement.parentElement;
  const newScrollPosition = focusedFieldLiElement.getBoundingClientRect().height * fieldIndex;

  focusedFieldUlElement.scrollTop = newScrollPosition;
  focusedFieldUlElement.scrollIntoView({ block: 'end', behavior: 'instant' });
};

class Filter extends Component {
  constructor() {
    super();

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSearchInputCommit = this.handleSearchInputCommit.bind(this);
  }

  handleSearchInputCommit(value) {
    const {
      id,
      onSearchValueCommit,
    } = this.props;

    onSearchValueCommit(id, value);
  }

  handleCheckboxChange(event) {
    const {
      history,
      id,
      onValueCommit,
    } = this.props;

    const {
      target: checkbox,
    } = event;

    const {
      dataset,
      name,
    } = checkbox;

    const { type } = dataset;
    const value = (type === 'number') ? Number.parseInt(name, 10) : name;

    onValueCommit(history, id, value, checkbox.checked);
  }

  renderBuckets() {
    const {
      aggregation,
      formatValue,
      id,
      params,
      searchValue,
    } = this.props;

    const formattedValues = getFormattedValues(aggregation, formatValue);
    const buckets = aggregation.get('buckets');

    let matchingBuckets = buckets;

    if (searchValue) {
      const needle = searchValue.toLowerCase();

      matchingBuckets = buckets.filter((bucket) => {
        const value = bucket.get('key');
        const formattedValue = formattedValues ? formattedValues[value] : value;
        const haystack = formattedValue.toLowerCase();

        return haystack.includes(needle);
      });
    }

    let selectedValues = params.get(id) || Immutable.List();

    if (!Immutable.List.isList(selectedValues)) {
      selectedValues = Immutable.List.of(selectedValues);
    }

    return matchingBuckets.map((bucket, index) => {
      const value = bucket.get('key');
      const type = typeof value;
      const count = bucket.get('doc_count');
      const isSelected = (selectedValues.indexOf(value) >= 0);
      const formattedValue = formattedValues ? formattedValues[value] : value;

      return (
        <li key={value}>
          {/* The linter is not figuring out that there is an input inside this label. */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            <input
              checked={isSelected}
              data-type={type !== 'string' ? type : undefined}
              data-number={index}
              name={value}
              type="checkbox"
              onChange={this.handleCheckboxChange}
              onFocus={handleCheckboxFocus}
            />

            <div>
              <span>
                {formattedValue}
                {' '}
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <FormattedMessage {...messages.count} values={{ count }} />
              </span>
            </div>
          </label>
        </li>
      );
    });
  }

  render() {
    const {
      aggregation,
      id,
      messages: filterMessages,
      searchValue,
      showSearch,
    } = this.props;

    const buckets = aggregation.get('buckets');
    const isEmpty = !buckets || buckets.size === 0;

    if (isEmpty) {
      return null;
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    const title = <FormattedMessage {...filterMessages.label} />;

    return (
      <Panel id={`Filter-${id}`} title={title}>
        <div className={styles.common}>
          {
            showSearch
            && (
              <FilterSearchInput
                value={searchValue}
                onCommit={this.handleSearchInputCommit}
              />
            )
          }
          <ul>
            {this.renderBuckets(buckets)}
          </ul>
        </div>
      </Panel>
    );
  }
}

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;

export default withRouter(Filter);
