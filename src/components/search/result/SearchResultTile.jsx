import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import SearchResultImage from './SearchResultImageContainer';
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
  const relatedMediaCsids = doc.get('collectionspace_denorm:mediaCsid');
  const relatedMediaCount = relatedMediaCsids ? relatedMediaCsids.size : 0;

  // Use the top priority image, if a priority order has been set. Otherwise, if there is exactly
  // one related media record, its order doesn't matter, so it can be used directly. When there are
  // multiple related media records and no priority order, the media csid is left undefined, and
  // SearchResultImage retrieves the media sorted per the mediaSnapshotSort configuration.

  const mediaCsid = doc.getIn(['collectionspace_denorm:mediaPriorityList', 0, 'csid'])
    || (relatedMediaCount === 1 ? relatedMediaCsids.get(0) : undefined);

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
        hasRelatedMedia={relatedMediaCount > 0}
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
