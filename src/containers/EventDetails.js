//@flow
//@jsx React.createElement

import React from 'react';
import R from 'ramda';
import moment from 'moment';
import EventDetails from '../components/EventDetails';
import type { PropsT as EventPropsT } from '../components/EventDetails/Main';
import type { ParseReviewsInstance } from '../parseApi/api/Reviews';
import type { ParseEventInstance } from '../parseApi/api/Event';
import type { ReduxState } from '../redux/type';
import Loader from '../components/UIKit/Loader';
import queryString from 'query-string';

import { followChef, unfollowChef } from '../server/api/followers';
import * as actions from '../actions';
import * as auth from '../actions/auth';

import {
  remapEventFunc,
  paymentBaseSelector,
  getServiceFee,
  getEventsWithPrices,
} from '../selectors';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { load as loadReviews } from '../redux/modules/reviews';
import { updateMeta } from '../redux/modules/meta';

import asyncConnectPromise from '../decorators/asyncConnectPromise';
import { event } from '../server/api';

import type { PropsT as ReviewProps } from '../components/Review';

import CONFIG from '../config';
const { env: { PUBLIC_URL } } = CONFIG;

const { getEventById } = event;
// import type {ReduxState} from '../redux/type';

type Props = {
  newEventId?: string,
  onBookNowClick: Function,
  onAmountChanged: Function,
  push: Function,
  amount: number,
  price: number,
  currency?: { symbol: string },
  loaded: boolean,
  futureEvents: Array<any>,
  futureEventsLoading: boolean,
  city: Object,
  loading: boolean,
  location: Object,
  events: Array<any>,
  attendees: Array<any>,
  reviews: Array<ReviewProps>,
  loadReviews: Function,
  event: Object,
  eventNotFound: boolean,
  params: Object,
  anonymousUser: boolean,
};

function throttle(callback, limit) {
  var wait = false;
  return function(...args) {
    if (!wait) {
      callback.apply(null, args);
      wait = true;
      setTimeout(function() {
        wait = false;
      }, limit);
    }
  };
}

const throttledFollowChef = throttle(
  async ({ chefId, userId, loadEventWithEvents, eventId }) => {
    console.log('throttledFollowChef');
    await followChef({ chefId, userId });
    await loadEventWithEvents(eventId);
  },
  1000,
);
//$FlowIssue
const viewEventSelector = (state: ReduxState): Props => {
  const loading =
    state.event.meta.state !== 'success' || state.fee.meta.state !== 'success';
  const loaded = state.event.meta.state === 'success';
  const anonymousUser = !state.session.objectId;
  const userId = state.session ? state.session.objectId : null;

  if (loading) {
    return { loading };
  }

  const events: Array<ParseEventInstance> = getEventsWithPrices(
    ({ events }) => events,
  )(state);
  const reviews: Array<ParseReviewsInstance> = state.reviews.data || [];

  const attendees: Array<Object> = state.attendees.data || [];
  const eventNotFound = state.event.data.notFound;

  if (eventNotFound) {
    return { eventNotFound };
  }

  return {
    ...paymentBaseSelector(state),
    userId,
    futureEvents: events && events.map(remapEventFunc),
    futureEventsLoading: loading,
    price: getServiceFee(state),
    city: state.city.data,
    event: state.event.data,
    events,
    reviews,
    reviewsLoading: state.reviews.meta.state !== 'success',
    attendees,
    loading,
    loaded,
    anonymousUser,
  };
};

const isWaitingList = pathname => pathname.indexOf('waitingList') !== -1;
const isPrivateDinnerRequest = pathname =>
  pathname.indexOf('privateDinnerRequest') !== -1;

const getRandomArrayItem = items =>
  items[Math.floor(Math.random() * items.length)];

export default R.compose(
  asyncConnectPromise(async (props: *) => {
    const { params: { eventId }, store: { dispatch } } = props;

    const event = await getEventById({ eventId });

    if (!event) {
      console.error(`event ${eventId} is not fetched on server side`);
      return {};
    }

    const {
      //$FlowIssue
      objectId,
      //$FlowIssue
      image1,
      //$FlowIssue
      image2,
      //$FlowIssue
      image3,
      //$FlowIssue
      kitchen1,
      //$FlowIssue
      chefAvatar,
      //$FlowIssue
      bio,
      //$FlowIssue
      foodDescription,
      //$FlowIssue
      title,
      //$FlowIssue
      chefName,
      //$FlowIssue
      rating,
      //$FlowIssue
      rating_total,
      //$FlowIssue
      createdAt,
    } = event;

    const images = [image1, image2, image3, kitchen1].filter(img => !!img);

    const googleStructuredData = {
      '@context': 'http://schema.org/',
      '@type': 'Recipe',
      url: `${PUBLIC_URL}/events/${objectId}`,
      image: image1,
      name: title && title.slice(0, 60),
      description: foodDescription && foodDescription.slice(0, 160),
      author: {
        '@type': 'Person',
        name: chefName,
        image: chefAvatar,
        description: bio && bio.slice(0, 160),
      },
      datePublished: moment(createdAt).format('YYYY-MM-DD'),
      aggregateRating: rating_total
        ? {
            '@type': 'AggregateRating',
            ratingValue: rating.toFixed(1),
            reviewCount: rating_total,
          }
        : undefined,
    };

    dispatch(
      //$FlowIssue
      updateMeta({
        image: {
          src: image1 || (images.length && getRandomArrayItem(images)) || null,
        },
        description: foodDescription,
        title: `${title} - CHEF.ONE`,
        keywords: CONFIG.env.KEYWORDS,
        googleStructuredData,
      }),
    );
  }),
  connect(viewEventSelector, {
    ...actions,
    ...auth,
    push,
    loadReviews,
  }),
)(
  class extends React.Component<*, *> {
    props: Props;

    static defaultProps = {};
    static contextTypes = {
      router: React.PropTypes.object,
    };

    updateRouteHook(props: Object) {
      props.loadEventWithEvents(props.params.eventId);
    }

    componentWillReceiveProps(props: Object) {
      if (
        isWaitingList(props.location.pathname) &&
        props.event &&
        !props.event.doesFollowChef
      ) {
        throttledFollowChef({
          chefId: props.event.chef.objectId,
          userId: props.userId,
          loadEventWithEvents: props.loadEventWithEvents,
          eventId: props.params.eventId,
        });
        return;
      }
      if (props.params.eventId === this.props.params.eventId) {
        return;
      }
      this.updateRouteHook(props);
    }

    componentDidMount() {
      this.updateRouteHook(this.props);
    }

    async onUnfollow() {
      await unfollowChef({
        chefId: this.props.event.chef.objectId,
        //$FlowIssue
        userId: this.props.userId,
      });
      //$FlowIssue
      await this.props.loadEventWithEvents(this.props.params.eventId);
    }

    onShowMoreClick() {
      const { events } = this.props;
      if (events[0] && events[0].city) {
        this.props.push(`/discover/${events[0].city}`);
      }
    }

    onFetchMoreReviews() {
      this.props.loadReviews({
        chefId: this.props.event.chef.objectId,
        nextPage: true,
        limit: 3,
      });
    }

    render() {
      const {
        event,
        events,
        reviews,
        attendees,
        loading,
        price,
        currency,
        loaded,
        amount,
        onAmountChanged,
        onBookNowClick,
        push,
        futureEvents,
        futureEventsLoading,
        params,
        location,
      } = this.props;

      if (loading || !event) {
        return <Loader />;
      }

      const eventMom = moment(event.eventStart);

      const today = event && eventMom;
      const date = today && today.format('MMM DD. YYYY');
      const time = today && `${today.format('HH:mm')} Uhr`;

      const showWaitingList = isWaitingList(location.pathname);
      const showPrivateDinnerRequest = isPrivateDinnerRequest(
        location.pathname,
      );

      let goToNewEvent = null;
      if (event.newEventId) {
        goToNewEvent = () => push(`/event/${event.newEventId}`);
      }

      //$FlowIssue
      const eventData: EventPropsT = {
        showWaitingList,
        showPrivateDinnerRequest,
        onRequestPrivateDinnerSubmit: args => {
          const params = {
            ...args,
            eventId: this.props.params.eventId,
            date: moment(args.date).toISOString(),
          };

          const url = `/private-dinner-result?${queryString.stringify(params)}`;
          console.log(url);
          // push(url);
          window.open(url, '_self');
        },
        goToWaitingList: () => push(`/event/${params.eventId}/waitingList`),
        goRequestPrivateDinner: () =>
          push(`/event/${params.eventId}/privateDinnerRequest`),
        goToEvent: () => push(`/event/${params.eventId}`),
        goToNewEvent,
        onUnfollow: () => this.onUnfollow(),
        onBookNowClick,
        events,
        amount,
        date,
        time,
        price,
        attendees,
        reviews,
        onAmountChanged,
        doesFollowChef: event.doesFollowChef,
        geoLocation: event.geoLocation,
        passed: event.passed,
        servings: event.servings,
        servingsSold: event.servingsSold,
        title: event.title,
        maxAmount: event.servings - event.servingsSold,
        currency: currency ? currency.symbol : '',
        eventsLoading: loading,
        futureEvents,
        futureEventsLoading,
        images: [event.image1, event.image2, event.image3, event.kitchen1],
        foodDescription: event.foodDescription,
        chefInfo: {
          avatar: event.avatar,
          name: event.name,
          address: event.city && `${event.city.city}, ${event.city.country}`,
          rating: event.chef && event.chef.rating_average,
          about: event.chef.objectIdUser && event.chef.objectIdUser.bio,
        },
        onFetchMoreReviews: this.onFetchMoreReviews.bind(this),
      };

      return <div>{loaded && <EventDetails {...eventData} />}</div>;
    }
  },
);
