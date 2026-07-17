/* global fetch, window, AbortController */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { getItemShortID } from 'cspace-refname';
import Immutable from 'immutable';
import { blobUrl } from '../../../helpers/urlHelpers';
import config from '../../../config';
import styles from '../../../../styles/cspace/SearchResultImage.css';

const propTypes = {
  gatewayUrl: PropTypes.string.isRequired,
  holdingInstitutions: PropTypes.instanceOf(Immutable.List),
  loadImageImmediately: PropTypes.bool,
  mediaCsid: PropTypes.string,
  referenceValue: PropTypes.string.isRequired,
};

const defaultProps = {
  holdingInstitutions: Immutable.List(),
  loadImageImmediately: false,
  mediaCsid: undefined,
};

const messages = defineMessages({
  noimage: {
    id: 'searchResultImage.noimage',
    defaultMessage: 'no image available',
  },
});

export default class SearchResultImage extends Component {
  constructor(props) {
    super();

    this.handleScroll = this.handleScroll.bind(this);

    this.ref = React.createRef();

    this.state = {
      gatewayUrl: props.gatewayUrl,
    };

    if (AbortController) {
      this.abortController = new AbortController();
    }
  }

  componentDidMount() {
    const {
      holdingInstitutions,
      loadImageImmediately,
      mediaCsid,
      referenceValue,
    } = this.props;

    window.setTimeout(() => {
      if (this.isInView()) {
        this.init(referenceValue, mediaCsid, holdingInstitutions);
      } else {
        window.addEventListener('scroll', this.handleScroll);
      }
    }, loadImageImmediately ? 0 : config.get('imageLoadDelay'));
  }

  componentDidUpdate(prevProps) {
    const {
      gatewayUrl: prevGatewayUrl,
      mediaCsid: prevMediaCsid,
      referenceValue: prevReferenceValue,
    } = prevProps;

    const {
      holdingInstitutions,
      gatewayUrl,
      mediaCsid,
      referenceValue,
    } = this.props;

    if (
      mediaCsid !== prevMediaCsid
      || gatewayUrl !== prevGatewayUrl
      || referenceValue !== prevReferenceValue
    ) {
      // FIXME: Make this component stateless.
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        gatewayUrl,
      });

      this.init(referenceValue, mediaCsid, holdingInstitutions);
    }
  }

  componentWillUnmount() {
    if (this.abortController) {
      this.abortController.abort();
    }

    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.isInView()) {
      window.setTimeout(() => {
        if (this.isInView()) {
          const {
            holdingInstitutions,
            mediaCsid,
            referenceValue,
          } = this.props;

          window.removeEventListener('scroll', this.handleScroll);

          this.init(referenceValue, mediaCsid, holdingInstitutions);
        }
      }, config.get('imageLoadDelay'));
    }
  }

  getMediaCsid(gatewayUrl, indexName, referenceValue) {
    const url = `${gatewayUrl}/es/_search`;
    const referenceField = config.get('referenceField');

    const query = {
      _source: 'collectionspace_denorm:mediaCsid',
      query: {
        term: {
          [referenceField]: referenceValue,
        },
      },
      size: 1,
      terminate_after: 1,
    };

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
      signal: this.abortController ? this.abortController.signal : undefined,
    })
      .then((response) => response.json())
      // eslint-disable-next-line no-underscore-dangle
      .then((data) => data.hits.hits[0]._source['collectionspace_denorm:mediaCsid'][0])
      .catch(() => undefined);
  }

  init(referenceValue, mediaCsid, holdingInstitutions) {
    if (typeof mediaCsid !== 'undefined') {
      this.setState({
        mediaCsid,
      });

      return;
    }

    // Attempt to resove a mediaCsid from holding instutitions. This is really only used by the
    // materials browser. In other profiles, the media csid will have been received in the search
    // result.

    const cachedGatewayMediaCsid = window.sessionStorage.getItem(`image-${referenceValue}`);

    if (cachedGatewayMediaCsid) {
      const [cachedGatewayUrl, cachedMediaCsid] = cachedGatewayMediaCsid.split(',');

      this.setState({
        gatewayUrl: cachedGatewayUrl,
        mediaCsid: cachedMediaCsid,
      });

      return;
    }

    const institutions = holdingInstitutions.filter((value) => !!value);

    if (institutions.size === 0) {
      this.setState({
        mediaCsid: null,
      });

      return;
    }

    const findImage = institutions.reduce((promise, institution) => promise.catch(() => {
      const instShortId = getItemShortID(institution);
      const instGatewayUrl = config.get(['institutions', instShortId, 'gatewayUrl']);
      const instIndexName = config.get(['institutions', instShortId, 'esIndexName']);

      if (!instGatewayUrl) {
        return Promise.reject();
      }

      return (
        this.getMediaCsid(instGatewayUrl, instIndexName, referenceValue)
          .then((instMediaCsid) => {
            if (!instMediaCsid) {
              return Promise.reject();
            }

            return Promise.resolve({ instGatewayUrl, instMediaCsid });
          })
      );
    }), Promise.reject());

    findImage
      .then(({ instGatewayUrl, instMediaCsid }) => {
        try {
          window.sessionStorage.setItem(
            `image-${referenceValue}`,
            `${instGatewayUrl},${instMediaCsid}`,
          );
        } catch (err) {
          // Ignore storage error.
        }

        this.setState({
          gatewayUrl: instGatewayUrl,
          mediaCsid: instMediaCsid,
        });
      })
      .catch(() => {});
  }

  isInView() {
    const domNode = this.ref.current;

    if (domNode) {
      const rect = domNode.getBoundingClientRect();

      return (
        rect.top >= 0
        && rect.top < window.innerHeight
      );
    }

    return false;
  }

  render() {
    const {
      gatewayUrl,
      mediaCsid,
    } = this.state;

    if (mediaCsid === null) {
      return (
        <div
          aria-hidden
          className={styles.noimage}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormattedMessage {...messages.noimage} />
        </div>
      );
    }

    const imageUrl = mediaCsid && blobUrl(gatewayUrl, mediaCsid, config.get('searchResultImageDerivative'));

    let style;

    if (imageUrl) {
      style = {
        backgroundImage: `url(${imageUrl})`,
      };
    }

    return (
      <div className={styles.common} style={style} ref={this.ref} />
    );
  }
}

SearchResultImage.propTypes = propTypes;
SearchResultImage.defaultProps = defaultProps;
