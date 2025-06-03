import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import get from 'lodash/get';
import config from '../../config';
import { searchParamsToQueryString } from '../../helpers/urlHelpers';
import styles from '../../../styles/cspace/DetailNavBar.css';
import linkStyles from '../../../styles/cspace/Link.css';

const propTypes = {
  params: PropTypes.instanceOf(Immutable.Map),
  prev: PropTypes.shape({
    'ecm:name': PropTypes.string,
  }),
  next: PropTypes.shape({
    'ecm:name': PropTypes.string,
  }),
};

const defaultProps = {
  params: Immutable.Map(),
  prev: undefined,
  next: undefined,
};

const messages = defineMessages({
  search: {
    id: 'detailNavBar.search',
    defaultMessage: 'Return to search',
  },
  prev: {
    id: 'detailNavBar.prev',
    defaultMessage: 'Previous',
  },
  next: {
    id: 'detailNavBar.next',
    defaultMessage: 'Next',
  },
});

export default function DetailNavBar({ params, prev, next }) {
  function renderLink(searchParams, index, adjacent, className, message) {
    const detailPath = config.get('detailPath');
    const csid = get(adjacent, 'ecm:name');

    return (
      <span>
        <Link
          className={className}
          to={{
            pathname: `/${detailPath}/${csid}`,
            state: {
              index,
              searchParams,
            },
          }}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormattedMessage {...message} />
        </Link>
      </span>
    );
  }

  let prevLink;
  let nextLink;
  let queryString = '';

  const index = params.get('index');
  const searchParams = params.get('searchParams');
  if (searchParams && index !== undefined) {
    const searchParamsObj = searchParams.toJS();
    prevLink = prev && renderLink(searchParamsObj, index - 1, prev, linkStyles.prev, messages.prev);
    nextLink = next && renderLink(searchParamsObj, index + 1, next, linkStyles.next, messages.next);
    queryString = searchParamsToQueryString(searchParams);
  }

  return (
    <nav className={styles.common}>
      <div>
        <Link
          className={linkStyles.back}
          to={{
            pathname: '/search',
            search: `?${queryString}`,
          }}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormattedMessage {...messages.search} />
        </Link>
      </div>

      <div>
        {prevLink}
        {nextLink}
      </div>
    </nav>
  );
}

DetailNavBar.propTypes = propTypes;
DetailNavBar.defaultProps = defaultProps;
