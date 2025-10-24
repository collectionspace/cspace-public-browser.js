import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter } from 'react-router';
import { IntlProvider } from 'react-intl';
import axe from 'axe-core';
import DetailNavBar from '../../../../src/components/detail/DetailNavBar';
import styles from '../../../../styles/cspace/DetailNavBar.css';
import {
  createTestContainer,
  throwAxeViolationsError,
} from '../../../helpers/utils';

chai.should();

describe('DetailNavBar', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render without search params', function test() {
    render(
      <IntlProvider locale="en">
        <MemoryRouter>
          <DetailNavBar />
        </MemoryRouter>
      </IntlProvider>,
      this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('NAV');
    this.container.firstElementChild.className.should.equal(styles.common);
  });

  it('should render without a11y violations', async function test() {
    render(
      <IntlProvider locale="en">
        <MemoryRouter>
          <DetailNavBar />
        </MemoryRouter>
      </IntlProvider>,
      this.container,
    );

    const results = await axe.run(this.container);
    if (results.violations.length > 0) {
      throwAxeViolationsError(results.violations);
    }
    results.violations.length.should.equal(0);
  });
});
