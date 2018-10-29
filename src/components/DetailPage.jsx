import React from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import DetailPanel from './DetailPanel';
import styles from '../../styles/cspace/DetailPage.css';

const propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      shortID: PropTypes.string,
    }),
  }).isRequired,
};

export default function DetailPage(props) {
  const {
    location,
    match,
  } = props;

  const sortField = config.get('sortField');
  const { shortID } = match.params;
  const { hash, state } = location;

  const selectedInstitution = hash ? hash.replace(/^#/, '') : undefined;

  return (
    <div className={styles.common}>
      <DetailPanel
        isFromSearch={state && state.isFromSearch}
        searchParams={state && state.searchParams}
        selectedInstitution={selectedInstitution}
        shortID={shortID}
        sortField={sortField}
      />
    </div>
  );
}

DetailPage.propTypes = propTypes;
