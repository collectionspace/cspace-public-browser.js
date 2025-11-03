/* global document, window */

import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { RawIntlProvider } from 'react-intl';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import thunk from 'redux-thunk';
import warning from 'warning';
import { loadPrefs } from './actions/prefsActions';
import config from './config';
import App from './components/App';
import { createIntl } from './intl';
import reducer from './reducers';
import * as formatters from './helpers/formatHelpers';

const cspacePublicBrowser = (...customConfigs) => {
  config.merge(...customConfigs);

  const container = config.get('container');
  const mountNode = document.querySelector(container);

  warning(
    mountNode,
    `No container element was found using the selector '${container}'. The CollectionSpace collection browser will not be rendered.`,
  );

  if (!mountNode) {
    return;
  }

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  store.dispatch(loadPrefs());

  const locale = config.get('locale');
  const messages = config.get('messages');

  const intl = createIntl({
    locale,
    messages,
    defaultLocale: 'en-US',
  });

  render(
    <RawIntlProvider value={intl}>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </RawIntlProvider>,
    mountNode,
  );

  // Run accessibility checks in dev and log issues in console
  if (process.env.NODE_ENV === 'development') {
    (async () => {
      // eslint-disable-next-line import/no-extraneous-dependencies
      const axe = await import('@axe-core/react');
      await axe.default(React, ReactDOM, 1000);
    })();
  }
};

cspacePublicBrowser.formatters = formatters;

export default cspacePublicBrowser;
