import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import config from '../../config';
import { blobUrl } from '../../helpers/urlHelpers';
import styles from '../../../styles/cspace/ImageGallery.css';

const propTypes = {
  findMedia: PropTypes.func,
  institutionId: PropTypes.string,
  media: PropTypes.instanceOf(Immutable.Map),
  referenceValue: PropTypes.string.isRequired,
  mediaAltText: PropTypes.string.isRequired,
};

const defaultProps = {
  institutionId: undefined,
  media: undefined,
  findMedia: () => undefined,
};

const getInstitutionIds = () => {
  const institutionsConfig = config.get('institutions');

  return (institutionsConfig ? Object.keys(institutionsConfig) : []);
};

export default class ImageGallery extends Component {
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
      media,
      mediaAltText,
    } = this.props;

    if (!media) {
      return null;
    }

    const institutionIds = (typeof institutionId === 'undefined')
      ? [null, ...getInstitutionIds()]
      : [institutionId];

    const items = [];

    institutionIds.forEach((instId) => {
      const mediaCsids = media.get(instId);

      if (mediaCsids && mediaCsids.size > 0) {
        const gatewayUrl = instId
          ? config.get(['institutions', instId, 'gatewayUrl'])
          : config.get('gatewayUrl');

        mediaCsids.forEach((mediaCsid) => {
          items.push({
            original: blobUrl(gatewayUrl, mediaCsid, config.get('detailImageDerivative')),
            thumbnail: blobUrl(gatewayUrl, mediaCsid, 'Thumbnail'),
            originalAlt: mediaAltText,
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
