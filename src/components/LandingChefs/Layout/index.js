// @flow

export * as fixtures from './fixtures';
import React from 'react';

import Header from '../Header';
import GetStarted from '../GetStarted';
// import Contacts from '../Contacts';
import Footer from '../Footer';
import Quote from '../Quote';
import IconsRow from '../IconsRow';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

export type PropsT = {
  goToCreateEvent: Function,
  cities: Array<string>,
  city: string,
};

const Layout = applyStyles(({ goToCreateEvent, cities, city }: PropsT) => (
  <div styleName="background">
    <div styleName="landing-panel">
      <Header goToCreateEvent={goToCreateEvent} />
      <IconsRow />
      <Quote />
      <GetStarted />
      {/* <Contacts /> */}
      <Footer goToCreateEvent={goToCreateEvent} cities={cities} city={city} />
    </div>
  </div>
));

export default Layout;
