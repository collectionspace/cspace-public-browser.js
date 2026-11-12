/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import FieldList from './FieldList';
import ImageGallery from './ImageGalleryContainer';
import PanelTitle from '../layout/PanelTitle';
import config from '../../config';
import styles from '../../../styles/cspace/InstitutionHoldingList.css';

const messages = defineMessages({
  title: {
    id: 'institutionHoldingList.title',
    defaultMessage: 'Samples at {title}',
  },
});

const propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape({
    _source: PropTypes.shape({
      'collectionspace_core:uri': PropTypes.string,
    }),
  })),
  institutionConfig: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  institutionId: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
  isSelected: PropTypes.bool,
  expandPanel: PropTypes.func,
  referenceValue: PropTypes.string.isRequired,
  togglePanel: PropTypes.func,
};

const defaultProps = {
  hits: [],
  isExpanded: false,
  isSelected: false,
  expandPanel: () => undefined,
  togglePanel: () => undefined,
};

const renderResult = (data) => {
  const {
    'collectionspace_core:uri': uri,
  } = data;

  return (
    <li key={uri}>
      <FieldList
        config={config.get('institutionHoldings').detailFields}
        data={data}
        headingLevel={3}
      />
    </li>
  );
};

export default class InstitutionHoldingList extends Component {
  constructor() {
    super();

    this.ref = React.createRef();
  }

  componentDidMount() {
    const {
      isSelected,
    } = this.props;

    if (isSelected) {
      this.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      isSelected: prevIsSelected,
    } = prevProps;

    const {
      isSelected,
    } = this.props;

    if (isSelected && !prevIsSelected) {
      this.focus();
    }
  }

  focus() {
    const {
      expandPanel,
    } = this.props;

    const domNode = this.ref.current;

    if (domNode) {
      window.setTimeout(() => {
        expandPanel();

        domNode.scrollIntoView();
      }, 0);
    }
  }

  renderContent() {
    const {
      hits,
      institutionId,
      isExpanded,
      referenceValue,
    } = this.props;

    if (isExpanded) {
      return (
        <div>
          <ImageGallery institutionId={institutionId} referenceValue={referenceValue} />

          <ul>
            {/* eslint-disable-next-line no-underscore-dangle */}
            {hits.map((hit) => renderResult(hit._source))}
          </ul>
        </div>
      );
    }

    return null;
  }

  renderTitle() {
    const {
      hits,
      institutionConfig,
      isExpanded,
      togglePanel,
    } = this.props;

    const {
      title,
    } = institutionConfig;

    const formattedTitle = (
      <FormattedMessage
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...messages.title}
        tagName="h2"
        values={{
          title,
          count: hits.length,
        }}
      />
    );

    return (
      <PanelTitle
        isExpanded={isExpanded}
        title={formattedTitle}
        onClick={togglePanel}
      />
    );
  }

  render() {
    const {
      hits,
    } = this.props;

    if (hits.length === 0) {
      return null;
    }

    const {
      institutionId,
      isExpanded,
    } = this.props;

    return (
      <section
        className={isExpanded ? styles.expanded : styles.collapsed}
        id={institutionId}
        ref={this.ref}
      >
        {this.renderTitle()}
        {this.renderContent()}
      </section>
    );
  }
}

InstitutionHoldingList.propTypes = propTypes;
InstitutionHoldingList.defaultProps = defaultProps;
