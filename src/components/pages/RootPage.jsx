import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Route, Switch } from 'react-router';
import Helmet from 'react-helmet';
import DetailPage from './DetailPageContainer';
import SearchPage from './SearchPageContainer';
import config from '../../config';
import styles from '../../../styles/cspace/RootPage.css';

const messages = defineMessages({
  title: {
    id: 'RootPage.title',
    defaultMessage: 'Collection Browser',
  },
});

export default function RootPage() {
  const intl = useIntl();
  const title = intl.formatMessage(messages.title);
  const detailPath = config.get('detailPath');

  return (
    <div className={styles.common}>
      <Helmet
        defaultTitle={title}
        titleTemplate={`%s | ${title}`}
      >
        <meta name="viewport" content="width=device-width" />
      </Helmet>

      <Switch>
        <Route path="/search" component={SearchPage} />
        <Route path={`/${detailPath}/:csid`} component={DetailPage} />
      </Switch>
    </div>
  );
}
