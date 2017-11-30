// @flow

import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FrontPage from '../components/FrontPage/PureFrontPage';
import Loader from '../components/UIKit/Loader';
import type { PropsT as FrontPageT } from '../components/FrontPage/PureFrontPage';
import * as actions from '../actions';

import { signupMailchimp } from '../actions/auth';
import { homeSelector, remapEventFunc } from '../selectors';

class Home extends React.Component<*, *> {
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.props.loadCitiesAndEvents();
  }

  onShowMoreClick() {
    this.props.push('/discover/Hamburg');
    //this.props.push(`/discover/${events[0].city}`);
  }

  render() {
    const {
      city,
      events,
      sticky,
      eventsLoaded,
      stickyLoading,
      push,
    } = this.props;

    if (!eventsLoaded || stickyLoading) {
      return <Loader />;
    }

    let cities = this.props.cities || [];

    const remapedEvents = events.map(remapEventFunc);
    const bestEvent = remapEventFunc(sticky);
    const frontPageProps: FrontPageT = {
      city,
      goToLandingChefs: () => push(`/landing-chefs`),
      goToCity: name => push(`/discover/${name}`),
      cities: cities.map(({ city, city_image_web: { url } }) => ({
        image: url,
        name: city,
      })),

      events: remapedEvents,
      bestEvent,
      signupMailchimp: this.props.signupMailchimp,
    };

    return <FrontPage {...frontPageProps} />;
  }
}

export default R.compose(
  connect(homeSelector, {
    ...actions,
    signupMailchimp,
    push,
  }),
)(Home);
