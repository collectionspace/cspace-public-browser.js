import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getItemShortID } from 'cspace-refname';
import { blobUrl } from '../helpers/urlHelpers';
import config from '../config';

const propTypes = {
  gatewayUrl: PropTypes.string.isRequired,
  holdingInstitutions: PropTypes.arrayOf(PropTypes.string),
  mediaCsid: PropTypes.string,
  shortID: PropTypes.string.isRequired,
};

const defaultProps = {
  holdingInstitutions: [],
};

export default class SearchResultImage extends Component {
  constructor(props) {
    super();

    this.state = {
      gatewayUrl: props.gatewayUrl,
      mediaCsid: props.mediaCsid,
    };

    if (AbortController) {
      this.abortController = new AbortController();
    }
  }

  getMaterialMediaCsid(gatewayUrl, indexName, materialShortID) {
    const url = gatewayUrl + '/es/' + indexName + '/doc/_search?size=1&terminate_after=1';

    const query = {
      _source: 'collectionspace_denorm:mediaCsid',
      query: {
        term: { 'materials_common:shortIdentifier': materialShortID },
      },
    };

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
      signal: this.abortController ? this.abortController.signal : undefined,
    })
      .then(response => response.json())
      .then(data => data.hits.hits[0]._source['collectionspace_denorm:mediaCsid'][0])
      .catch(() => undefined);
  };

  init(materialShortID, mediaCsid, holdingInstitutions) {
    if (!mediaCsid && holdingInstitutions.length > 0) {

      const instShortID = getItemShortID(holdingInstitutions.find(value => !!value));
      const instGatewayUrl = config.get(['institutions', instShortID, 'gatewayUrl']);
      const instIndexName = config.get(['institutions', instShortID, 'esIndexName']);

      if (instGatewayUrl) {
        this.getMaterialMediaCsid(instGatewayUrl, instIndexName, materialShortID)
          .then((instMediaCsid) => {
            this.setState({
              gatewayUrl: instGatewayUrl,
              mediaCsid: instMediaCsid,
            });
          });
      }
    }
  }

  componentDidMount() {
    const {
      holdingInstitutions,
      mediaCsid,
      shortID,
    } = this.props;

    this.init(shortID, mediaCsid, holdingInstitutions);
  }

  componentWillReceiveProps(nextProps) {
    const {
      holdingInstitutions: nextHoldingInstitutions,
      gatewayUrl: nextGatewayUrl,
      mediaCsid: nextMediaCsid,
      shortID: nextShortID,
    } = nextProps;

    const {
      gatewayUrl,
      mediaCsid,
      shortID,
    } = this.props;

    if (
      mediaCsid !== nextMediaCsid
      || gatewayUrl !== nextGatewayUrl
      || shortID !== nextShortID
    ) {
      this.setState({
        gatewayUrl: nextGatewayUrl,
        mediaCsid: nextMediaCsid,
      });

      this.init(nextShortID, nextMediaCsid, nextHoldingInstitutions);
    }
  }

  componentWillUnmount() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  render() {
    const {
      gatewayUrl,
      mediaCsid,
    } = this.state;

    const imageUrl = mediaCsid && blobUrl(gatewayUrl, mediaCsid, 'OriginalJpeg');

    let style;

    if (imageUrl) {
      style = {
        backgroundImage: `url(${imageUrl})`,
      };
    }

    return (
      <div style={style} />
    );
  }
}

SearchResultImage.propTypes = propTypes;
SearchResultImage.defaultProps = defaultProps;