// @flow

import React from 'react';

import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
// import * as actions from '../actions';
import type { ReduxState } from '../redux/type';
import LandingChefs from '../components/LandingChefs';
import * as actions from '../actions';
import { load as loadCities } from '../redux/modules/cities';
import Loader from '../components/UIKit/Loader';

class Connected extends React.Component<*, *> {
  componentDidMount() {
    this.props.loadCities();
  }
  render() {
    if (!this.props.city || !this.props.cities) {
      return <Loader />;
    }
    return (
      <LandingChefs
        {...{
          city: this.props.city,
          cities: this.props.cities,
          goToCreateEvent: this.props.goToCreateEventForm,
        }}
      />
    );
  }
}

export default connect(
  ({ cities, city }: ReduxState) => {
    const citiesData = cities.data ? cities.data : [];

    //, city_image_web: { url }
    return {
      cities: citiesData.map(({ city }) => city),
      city: city.data ? city.data : null,
    };
  },
  { ...actions, loadCities },
)(Connected);
