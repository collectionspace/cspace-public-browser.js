import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/cspace/Panel.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  title: PropTypes.element,
  isExpanded: PropTypes.bool,
  onHeaderClick: PropTypes.func,
};

const defaultProps = {
  children: undefined,
  isExpanded: false,
  onHeaderClick: () => undefined,
  title: undefined,
};

export default class Panel extends Component {
  constructor() {
    super();

    this.handleHeaderButtonClick = this.handleHeaderButtonClick.bind(this);
  }

  handleHeaderButtonClick() {
    const {
      id,
      onHeaderClick,
    } = this.props;

    onHeaderClick(id);
  }

  render() {
    const {
      children,
      isExpanded,
      title,
    } = this.props;

    const className = isExpanded ? styles.expanded : styles.collapsed;

    return (
      <div className={className}>
        <header>
          <button onClick={this.handleHeaderButtonClick} aria-expanded={isExpanded} type="button">{title}</button>
        </header>
        {isExpanded ? children : undefined}
      </div>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;
