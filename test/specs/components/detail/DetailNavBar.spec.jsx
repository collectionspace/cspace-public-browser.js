/* global document */
import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';
import { IntlProvider } from 'react-intl';
import DetailNavBar from '../../../../src/components/detail/DetailNavBar';
import styles from '../../../../styles/cspace/DetailNavBar.css';

chai.should();

describe('DetailNavBar', () => {
  it('should render without search params', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      render(
        <IntlProvider locale="en">
          <MemoryRouter>
            <DetailNavBar />
          </MemoryRouter>
        </IntlProvider>,
        container,
      );
    });

    container.firstElementChild.nodeName.should.equal('NAV');
    container.firstElementChild.className.should.equal(styles.common);
  });
});
