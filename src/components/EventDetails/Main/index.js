// @flow

export * as fixtures from './fixtures';

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

import R from 'ramda';
import { Row, Col } from 'react-flexbox-grid';
import FoodDescriptionSection from '../FoodDescriptionSection';
import ChefInfoSection from '../ChefInfoSection';
import Reviews from '../../Review';
import ShareButtons from '../ShareButtons';
import HeaderSection from '../HeaderSection';
import { GMapCenteredOnPlace } from '../../UIKit/GMap';
import Events from '../../Events';
import type { PropsT as HeaderT } from '../HeaderSection';
import type { EventT } from '../../Events';
import type { CoordsT } from '../../UIKit/GMap';
import type { PropsT as ReviewProps } from '../../Review';
import type { Props as ChefInfoSectionProps } from '../ChefInfoSection';
import type { AttendeeT } from '../FoodDescriptionSection';

import Card from '../Card';

const OTHER_EVENTS_HEADER = 'EVENTS IN DEINER NÄHE';
export type PropsT = {
  goToNewEvent?: Function,
  onUnfollow: Function,
  doesFollowChef: boolean,
  showWaitingList: boolean,
  showPrivateDinnerRequest: boolean,
  goToWaitingList: Function,
  goRequestPrivateDinner: Function,
  onRequestPrivateDinnerSubmit: Function,
  goToEvent: Function,
  onBookNowClick: Function,
  onAmountChanged: Function,
  onFetchMoreReviews: Function,
  attendees: Array<AttendeeT>,
  eventId: string,
  eventsLoading: boolean,
  events: Array<EventT>,
  futureEvents: Array<any>,
  futureEventsLoading: boolean,
  geoLocation: CoordsT,
  title: string,
  reviews: Array<ReviewProps>,
  images: Array<string>,
  foodDescription: string,
  time: string,
  date: string,
  amount: number,
  passed: boolean,
  maxAmount: number,
  price: number,
  currency: string,
  servings: number,
  servingsSold: number,
  chefInfo: ChefInfoSectionProps,
};
const res = R.compose(fixedCSSModules(styles, { allowMultiple: true }))(
  (props: PropsT) => {
    const {
      onUnfollow,
      doesFollowChef,
      showWaitingList,
      showPrivateDinnerRequest,
      eventId,
      onAmountChanged,
      onFetchMoreReviews,
      amount,
      maxAmount,
      images,
      attendees,
      eventsLoading,
      foodDescription,
      futureEvents,
      futureEventsLoading,
      chefInfo,
      events,
      reviews,
      servings,
      time,
      date,
      servingsSold,
      price,
      title,
      currency,
      geoLocation,
      passed,
      onBookNowClick,
      goToWaitingList,
      goRequestPrivateDinner,
      onRequestPrivateDinnerSubmit,
      goToNewEvent,
      goToEvent,
    } = props;
    const headerProps: HeaderT = {
      onUnfollow,
      doesFollowChef,
      showWaitingList,
      showPrivateDinnerRequest,
      futureEvents,
      futureEventsLoading,
      passed,
      images,
      eventId,
      amount,
      currency,
      date,
      time,
      maxAmount,
      foodDescription,
      servings,
      servingsSold,
      onAmountChanged,
      onBookNowClick,
      title,
      price,
      goToWaitingList,
      goRequestPrivateDinner,
      onRequestPrivateDinnerSubmit,
      goToNewEvent,
      goToEvent,
    };
    return (
      <div styleName="event-details">
        <HeaderSection {...headerProps} />
        <div styleName="container">
          <Row center="xs">
            <Col md={6} xs={10}>
              <Card>
                <FoodDescriptionSection
                  text={foodDescription}
                  attendees={attendees}
                />
              </Card>
            </Col>
            <Col md={4} xs={10} styleName="chef-info-container">
              <Card>
                <ChefInfoSection value={chefInfo} />
              </Card>
              {reviews.length ? (
                <Card
                  style={{
                    marginTop: 50,
                  }}
                >
                  <Reviews values={reviews} onFetchMore={onFetchMoreReviews} />
                </Card>
              ) : null}
            </Col>
          </Row>
          <Row center="xs">
            <Col md={12}>
              <div styleName="share-buttons">
                <span styleName="share-buttons-header">
                  SHARE WITH YOUR FRIENDS
                </span>
                <div styleName="share-buttons-wrapper">
                  <ShareButtons foodTitle={title} />
                </div>
              </div>
            </Col>
          </Row>
          <div styleName="map-section">
            <GMapCenteredOnPlace zoom={13} placeCoords={geoLocation} />
          </div>
          <div styleName="other-events">
            <h2>{OTHER_EVENTS_HEADER}</h2>
            <Row center="xs">
              <Col xs={10}>
                <Events events={events} loading={eventsLoading} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  },
);
export default res;
