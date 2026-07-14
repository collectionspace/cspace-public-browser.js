import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from '../../../../styles/cspace/SearchResultStats.css';

const propTypes = {
  total: PropTypes.shape({
    value: PropTypes.number,
    relation: PropTypes.string,
  }),
};

const defaultProps = {
  total: undefined,
};

const messages = defineMessages({
  count: {
    id: 'searchResultStats.count',
    defaultMessage: `{count, plural,
      one {# item}
      other {# items}
    } found`,
  },
});

export default function SearchResultStats(props) {
  const {
    total,
  } = props;

  const count = total ? total.value : 0;
  return (
    <div className={styles.common} aria-live="polite">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {count ? <FormattedMessage {...messages.count} values={{ count }} /> : undefined}
    </div>
  );
}

SearchResultStats.propTypes = propTypes;
SearchResultStats.defaultProps = defaultProps;
