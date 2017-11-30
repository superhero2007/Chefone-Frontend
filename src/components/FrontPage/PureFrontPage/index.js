// @flow

import React from 'react';

export * as fixtures from './fixtures';

import TitleSection from '../TitleSection';
import EventsSection from '../EventsSection';
import type { PropsT as EventType } from '../../SmallEventCard';
import HowItWorks from '../../HowItWorks';
import CitiesSection from '../CitiesSection';
import type { CityType } from '../CitiesSection';
import TeaserSection from '../TeaserSection';
import ChefsSection from '../ChefsSection';
// import DiscountSection from '../DiscountSection';
import NewDiscountSection from '../NewDiscountSection';
import StorySection from '../StorySection';
// import DonateSection from '../DonateSection';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

export type PropsT = {
  goToLandingChefs: Function,
  goToCity: Function,
  city: *,
  cities: Array<CityType>,
  events: Array<EventType>,
  bestEvent: EventType,
  signupMailchimp: Function,
};

export default fixedCSSModules(styles)(
  ({
    cities,
    goToLandingChefs,
    events,
    bestEvent,
    goToCity,
    signupMailchimp,
    city,
  }: PropsT) => {
    return (
      <div styleName="component">
        <TitleSection
          city={city}
          cities={cities.map(({ name }) => name)}
          onSelectCity={selected => {
            goToCity(selected.city);
          }}
          goToLandingChefs={goToLandingChefs}
        />
        <NewDiscountSection onSubmit={signupMailchimp} />
        <div className="container">
          <EventsSection events={events} bestEvent={bestEvent} />

          {false && (
            <div className="row">
              <HowItWorks />
            </div>
          )}
          <hr />
          <StorySection />
          <hr />
          <CitiesSection value={cities} goToCity={goToCity} />

          {false && <TeaserSection />}
          <hr />
          <ChefsSection goToLandingChefs={goToLandingChefs} />
        </div>
        {/* <DonateSection /> */}
      </div>
    );
  }
);
