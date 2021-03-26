import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Immutable from 'immutable';
import FieldList from './FieldList';
import DetailNavBar from './DetailNavBar';
import ImageGallery from './ImageGalleryContainer';
import InstitutionIndex from './InstitutionIndexContainer';
import InstitutionSection from './InstitutionSectionContainer';
import config from '../../config';
import styles from '../../../styles/cspace/DetailPanel.css';

const propTypes = {
  adjacents: PropTypes.shape({
    prev: PropTypes.object,
    next: PropTypes.object,
  }),
  data: PropTypes.shape({
    'collectionspace_core:refName': PropTypes.string,
    'collectionspace_denorm:title': PropTypes.string,
    'collectionspace_denorm:mediaAltText': PropTypes.string,
  }),
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
  readDetail: PropTypes.func,
};

const defaultProps = {
  adjacents: {},
  data: undefined,
  readDetail: () => undefined,
};

export default class DetailPanel extends Component {
  componentDidMount() {
    this.readDetail();
  }

  componentDidUpdate(prevProps) {
    const {
      params,
    } = this.props;

    const {
      params: prevParams,
    } = prevProps;

    if (params.get('csid') !== prevParams.get('csid')) {
      this.readDetail();
    }
  }

  readDetail() {
    const {
      readDetail,
    } = this.props;

    readDetail();
  }

  renderDescription() {
    const {
      data,
    } = this.props;

    const descFormatter = config.get('detailDescription');
    const desc = descFormatter && descFormatter(data);

    return <p>{desc}</p>;
  }

  renderFieldList() {
    const {
      data,
    } = this.props;

    return (
      <FieldList config={config.get('detailFields')} data={data} />
    );
  }

  renderHeader() {
    const {
      adjacents,
      data,
      params,
    } = this.props;

    const titleFormatter = config.get('detailTitle');
    const title = titleFormatter && titleFormatter(data);

    const subtitleFormatter = config.get('detailSubtitle');
    const subtitle = subtitleFormatter && subtitleFormatter(data);

    const {
      'collectionspace_core:refName': refName,
    } = data;

    return (
      <header>
        <DetailNavBar params={params} prev={adjacents.prev} next={adjacents.next} />
        {title && <h1>{title}</h1>}
        {subtitle && <h2>{subtitle}</h2>}
        <InstitutionIndex refName={refName} />
      </header>
    );
  }

  renderImageGallery() {
    const {
      data,
    } = this.props;

    const mediaAltText = data['collectionspace_denorm:mediaAltText'];
    const referenceField = config.get('referenceField');
    const referenceValue = data[referenceField];

    return (
      <ImageGallery mediaAltText={mediaAltText[0]} referenceValue={referenceValue} />
    );
  }

  renderPageTitle() {
    const {
      data,
    } = this.props;

    const {
      'collectionspace_denorm:title': title,
    } = data;

    return (
      <Helmet>
        <title>{title}</title>
      </Helmet>
    );
  }

  renderInstitutions() {
    const {
      data,
      params,
    } = this.props;

    const institutionsConfig = config.get('institutions');

    if (!institutionsConfig) {
      return null;
    }

    const selectedInstitutionId = params.get('#');

    const referenceField = config.get('referenceField');
    const referenceValue = data[referenceField];

    return (
      <InstitutionSection
        config={institutionsConfig}
        selectedInstitutionId={selectedInstitutionId}
        referenceValue={referenceValue}
      />
    );
  }

  render() {
    const {
      data,
    } = this.props;

    if (!data) {
      return null;
    }

    return (
      <div className={styles.common}>
        {this.renderPageTitle()}
        {this.renderHeader()}
        {this.renderDescription()}
        {this.renderImageGallery()}
        {this.renderFieldList()}
        {this.renderInstitutions()}
      </div>
    );
  }
}

DetailPanel.propTypes = propTypes;
DetailPanel.defaultProps = defaultProps;
