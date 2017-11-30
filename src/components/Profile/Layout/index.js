//@flow

export * as fixtures from './fixtures';
import React from 'react';
import { isEmpty, complement } from 'ramda';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

import Profile from '../Profile';
import type { Props as ProfileT } from '../Profile';
import Review from '../Review';
import { EventsAttended, EventsOffered } from '../Events';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const notEmpty = complement(isEmpty);

export type PropsT = {
  userData: ProfileT,
  eventsAttended: *,
  eventsOffered: *,
  review: *,
};

const FullPage = applyStyles(
  ({ userData, eventsAttended, eventsOffered, review }) => (
    <div styleName="main">
      <div styleName="left-blocks">
        <Profile userData={userData} />
        <Review review={review} />
      </div>
      <div styleName="events">
        {notEmpty(eventsAttended) && <EventsAttended events={eventsAttended} />}
        {notEmpty(eventsOffered) && <EventsOffered events={eventsOffered} />}
      </div>
    </div>
  ),
);

export default FullPage;
