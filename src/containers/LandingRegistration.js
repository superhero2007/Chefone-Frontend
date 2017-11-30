// @flow

import React from 'react';

import { connect } from 'react-redux';
import type { ReduxState } from '../redux/type';
import LandingRegistration from '../components/Landings/Registration';
import * as actions from '../actions';
import * as auth from '../actions/auth';
import { load as loadCities } from '../redux/modules/cities';
import Loader from '../components/UIKit/Loader';
import { push } from 'react-router-redux';

class Connected extends React.Component<*, *> {
  componentDidMount() {
    this.props.loadCities();
  }
  render() {
    const { cities, push, signup } = this.props;

    if (!cities) {
      return <Loader />;
    }
    return (
      <LandingRegistration
        cities={cities}
        onSubmit={signup}
        goToLogin={() => {
          push('/l/login');
        }}
      />
    );
  }
}

export default connect(
  ({ cities }: ReduxState) => {
    const citiesData = cities.data ? cities.data : [];

    return {
      cities: citiesData,
    };
  },
  { ...actions, ...auth, loadCities, push },
)(Connected);
