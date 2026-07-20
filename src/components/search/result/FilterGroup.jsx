import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import Filter from './FilterContainer';
import styles from '../../../../styles/cspace/FilterGroup.css';

const propTypes = {
  config: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
    messages: PropTypes.object,
  }).isRequired,
  fieldsConfig: PropTypes.objectOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  isPending: PropTypes.bool,
  aggregations: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  isPending: false,
  aggregations: Immutable.Map(),
};

export default function FilterGroup(props) {
  const {
    aggregations,
    config,
    fieldsConfig,
  } = props;

  const {
    fields,
    label,
    messages,
  } = config;

  const isEmpty = aggregations.isEmpty() || !fields.find((fieldId) => {
    const buckets = aggregations.getIn([fieldId, 'buckets']);

    return (buckets && buckets.size > 0);
  });

  if (isEmpty) {
    return null;
  }

  const labelMessage = messages && messages.label;

  // eslint-disable-next-line react/jsx-props-no-spreading
  const headerContent = labelMessage ? <FormattedMessage {...labelMessage} /> : label;

  return (
    <div className={styles.common}>
      {headerContent && <h1>{headerContent}</h1>}
      {
        fields.map((fieldId) => {
          const {
            field,
            formatValue,
            valueIdentifier,
            messages: fieldMessages,
            showSearch,
          } = fieldsConfig[fieldId];

          return (
            <Filter
              aggregation={aggregations.get(fieldId)}
              id={fieldId}
              field={field}
              formatValue={formatValue}
              valueIdentifier={valueIdentifier}
              key={fieldId}
              messages={fieldMessages}
              showSearch={showSearch}
            />
          );
        })
      }
    </div>
  );
}

FilterGroup.propTypes = propTypes;
FilterGroup.defaultProps = defaultProps;
