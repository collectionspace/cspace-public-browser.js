import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import SearchResultImage from './SearchResultImage';
import config from '../../../config';
import styles from '../../../../styles/cspace/SearchResultTile.css';

const propTypes = {
  gatewayUrl: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  loadImageImmediately: PropTypes.bool.isRequired,
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
  result: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default function SearchResultTile(props) {
  const {
    gatewayUrl,
    loadImageImmediately,
    index,
    params,
    result,
  } = props;

  const detailPath = config.get('detailPath');
  const referenceField = config.get('referenceField');
  const tileTitleField = config.get(['tileTitle', 'field']);
  const tileTitleFormat = config.get(['tileTitle', 'formatValue']);

  const doc = result.get('_source');
  const csid = doc.get('ecm:name');
  const url = csid && `/${detailPath}/${csid}`;
  const holdingInstitutions = doc.get('collectionspace_denorm:holdingInstitutions');
  const mediaCsid = doc.getIn(['collectionspace_denorm:mediaPriorityList', 0, 'csid'])
    || doc.getIn(['collectionspace_denorm:mediaCsid', 0]);
  const referenceValue = doc.get(referenceField);

  let title = doc.get(tileTitleField);

  if (tileTitleFormat) {
    title = tileTitleFormat(title);
  }

  return (
    <Link
      className={styles.common}
      to={{
        pathname: url,
        state: {
          index,
          searchParams: params.toJS(),
        },
      }}
    >
      <SearchResultImage
        gatewayUrl={gatewayUrl}
        holdingInstitutions={holdingInstitutions}
        loadImageImmediately={loadImageImmediately}
        mediaCsid={mediaCsid}
        referenceValue={referenceValue}
      />

      <article>
        <h2>{title}</h2>
      </article>
    </Link>
  );
}

SearchResultTile.propTypes = propTypes;
