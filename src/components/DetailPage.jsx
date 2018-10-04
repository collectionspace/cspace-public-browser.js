import React from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import DetailPanel from './DetailPanel';
import styles from '../../styles/cspace/DetailPage.css';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      shortID: PropTypes.string,
    }),
  }).isRequired,
};

export default function DetailPage(props) {
  const sortField = config.get('sortField');
  const { shortID } = props.match.params;
  const { hash } = props.location;
  const selectedInstitution = hash ? hash.replace(/^#/, '') : undefined;

  return (
    <div className={styles.common}>
      <DetailPanel
        selectedInstitution={selectedInstitution}
        shortID={shortID}
        sortField={sortField}
      />
    </div>
  );
}

DetailPage.propTypes = propTypes;