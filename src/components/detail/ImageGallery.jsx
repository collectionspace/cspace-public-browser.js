import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import Immutable from 'immutable';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import config from '../../config';
import { blobUrl } from '../../helpers/urlHelpers';
import styles from '../../../styles/cspace/ImageGallery.css';

const propTypes = {
  findMedia: PropTypes.func,
  institutionId: PropTypes.string,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  media: PropTypes.instanceOf(Immutable.Map),
  referenceValue: PropTypes.string.isRequired,
};

const defaultProps = {
  institutionId: undefined,
  media: undefined,
  findMedia: () => undefined,
};

const messages = defineMessages({
  defaultAltText: {
    id: 'imageGallery.defaultAltText',
    defaultMessage: 'Image {num}',
  },
  titledAltText: {
    id: 'imageGallery.titledAltText',
    defaultMessage: '{title} Image {num}',
  },
  thumbnailAltText: {
    id: 'imageGallery.thumbnailAltText',
    defaultMessage: 'Thumbnail: {altText}',
  },
});

const getInstitutionIds = () => {
  const institutionsConfig = config.get('institutions');

  return (institutionsConfig ? Object.keys(institutionsConfig) : []);
};

class ImageGallery extends Component {
  componentDidMount() {
    this.findMedia();
  }

  componentDidUpdate(prevProps) {
    const {
      referenceValue,
    } = this.props;

    const {
      referenceValue: prevReferenceValue,
    } = prevProps;

    if (referenceValue !== prevReferenceValue) {
      this.findMedia();
    }
  }

  findMedia() {
    const {
      findMedia,
      institutionId,
      media,
      referenceValue,
    } = this.props;

    const institutionIds = (typeof institutionId === 'undefined')
      ? [null, ...getInstitutionIds()]
      : [institutionId];

    institutionIds.forEach((instId) => {
      if (!media || !media.get(instId)) {
        findMedia(referenceValue, instId);
      }
    });
  }

  render() {
    const {
      institutionId,
      intl,
      media,
    } = this.props;

    if (!media) {
      return null;
    }

    const institutionIds = (typeof institutionId === 'undefined')
      ? [null, ...getInstitutionIds()]
      : [institutionId];

    const items = [];

    institutionIds.forEach((instId) => {
      const mediaMap = media.get(instId) || Immutable.Map();
      const title = mediaMap.get('title');
      const mediaCsids = mediaMap.get('csids') || Immutable.List();
      const mediaAltTexts = mediaMap.get('altTexts') || Immutable.List();

      if (mediaCsids && mediaCsids.size > 0) {
        const gatewayUrl = instId
          ? config.get(['institutions', instId, 'gatewayUrl'])
          : config.get('gatewayUrl');

        mediaCsids.forEach((mediaCsid, index) => {
          let altText = mediaAltTexts.get(index);
          if (!altText) {
            const num = index + 1;
            altText = title ? intl.formatMessage(messages.titledAltText, { title, num })
              : intl.formatMessage(messages.defaultAltText, { num });
          }

          items.push({
            original: blobUrl(gatewayUrl, mediaCsid, config.get('detailImageDerivative')),
            thumbnail: blobUrl(gatewayUrl, mediaCsid, 'Thumbnail'),
            originalAlt: altText,
            thumbnailAlt: intl.formatMessage(messages.thumbnailAltText, { altText }),
          });
        });
      }
    });

    if (items.length > 0) {
      return (
        <div className={styles.common}>
          <Gallery
            disableArrowKeys
            items={items}
            showFullscreenButton={false}
            showPlayButton={false}
            showThumbnails={items.length > 1}
          />
        </div>
      );
    }

    return <div />;
  }
}

ImageGallery.propTypes = propTypes;
ImageGallery.defaultProps = defaultProps;

export default injectIntl(ImageGallery);
