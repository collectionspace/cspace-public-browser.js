import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from '../../../styles/cspace/ExhibitionSection.css';

const propTypes = {
  exhibition: PropTypes.shape({
    title: PropTypes.string,
    generalNote: PropTypes.string,
    curatorialNote: PropTypes.string,
  }),
  historyNote: PropTypes.string,
  ownerConrtibutionNote: PropTypes.string,
  viewerContributionNote: PropTypes.string,
};

const defaultProps = {
  exhibition: undefined,
  historyNote: undefined,
  ownerConrtibutionNote: undefined,
  viewerContributionNote: undefined,
};

const messages = defineMessages({
  objectStoryHeader: {
    id: 'exhibitionSection.objectStoryHeader',
    defaultMessage: 'Object Story',
  },
  donorStoryHeader: {
    id: 'exhibitionSection.donorStoryHeader',
    defaultMessage: 'Donor Story',
  },
  curatorialStoryHeader: {
    id: 'exhibitionSection.curatorialStoryHeader',
    defaultMessage: 'Curatorial Story',
  },
});

export default function ExhibitionSection(props) {
  const {
    exhibition,
    historyNote,
    viewerContributionNote,
    ownerConrtibutionNote,
  } = props;

  return (
    <div className={styles.common}>
      <hr />
      <h1>{exhibition.title}</h1>
      <div />

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <h2><FormattedMessage {...messages.objectStoryHeader} /></h2>
      <div>{historyNote}</div>

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <h2><FormattedMessage {...messages.donorStoryHeader} /></h2>
      <div>{ownerConrtibutionNote}</div>
      <div>{exhibition.generalNote}</div>

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <h2><FormattedMessage {...messages.curatorialStoryHeader} /></h2>
      <div>{viewerContributionNote}</div>
      <div>{exhibition.curatorialNote}</div>
    </div>
  );
}

ExhibitionSection.propTypes = propTypes;
ExhibitionSection.defaultProps = defaultProps;
