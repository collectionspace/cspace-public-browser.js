import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import styles from '../../../styles/cspace/FieldList.css';
import groupStyles from '../../../styles/cspace/FieldListGroup.css';
import fieldStyles from '../../../styles/cspace/FieldListField.css';

const propTypes = {
  config: PropTypes.shape({
    fields: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    'collectionspace_core:refName': PropTypes.string,
    'collectionspace_denorm:title': PropTypes.string,
  }).isRequired,
};

const renderField = (id, fieldConfig, data) => {
  const {
    className,
    field,
    fields,
    format,
    label,
    messages,
  } = fieldConfig;

  const title = messages
    // eslint-disable-next-line react/jsx-props-no-spreading
    ? <FormattedMessage {...messages.label} />
    : label;

  const value = fields
    ? { fields, data }
    : data[field];
  const formattedValue = (format && value) ? format(value, id) : value;

  if (!formattedValue) {
    return null;
  }

  if (title) {
    const classes = classNames(fieldStyles[className]);
    const classProp = classes ? { className: classes } : undefined;

    return (
      <React.Fragment key={id}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <div {...classProp}>{title}</div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <div {...classProp}>{formattedValue}</div>
      </React.Fragment>
    );
  }

  const classes = classNames(fieldStyles.unlabeled, fieldStyles[className]);

  return (
    <div className={classes} key={id}>
      {formattedValue}
    </div>
  );
};

const renderGroup = (id, groupConfig, config, data) => {
  const {
    className,
    fields,
    label,
    messages,
  } = groupConfig;

  const title = messages
    // eslint-disable-next-line react/jsx-props-no-spreading
    ? <FormattedMessage {...messages.label} />
    : label;

  const fieldsConfig = config.fields;

  const renderedFields = fields
    .map((fieldId) => renderField(fieldId, fieldsConfig[fieldId], data))
    .filter((renderedField) => !!renderedField);

  if (renderedFields.length === 0) {
    return null;
  }

  const classes = classNames(groupStyles.common, groupStyles[className]);

  return (
    <div className={classes} key={id}>
      {title && <h3>{title}</h3>}
      <div>
        {renderedFields}
      </div>
    </div>
  );
};

export default function FieldList(props) {
  const {
    config,
    data,
  } = props;

  const {
    groups,
    layout,
  } = config;

  return Object.keys(layout).map((layoutId) => (
    <div
      className={styles.common}
      key={layoutId}
      style={{ gridArea: layoutId }}
    >
      {layout[layoutId].map((groupId) => renderGroup(groupId, groups[groupId], config, data))}
    </div>
  ));
}

FieldList.propTypes = propTypes;
