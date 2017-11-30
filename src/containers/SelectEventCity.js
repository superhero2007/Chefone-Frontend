// @flow

import React from 'react';
import SelectEventCity from '../components/SelectEventCity';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { selectCitySelector } from '../selectors';
import { push } from 'react-router-redux';
import { chooseCity } from '../redux/modules/createEvent';
import type { ReduxState } from '../redux/type';

@connect(
  (state: ReduxState) => {
    return { ...state.createEvent, ...selectCitySelector(state) };
  },
  { ...actions, chooseCity, push },
)
export default class ConnectedSelectEventCity extends React.Component<*, *> {
  componentDidMount() {
    this.props.fetchCities();
  }

  render() {
    return (
      <SelectEventCity
        {...this.props}
        onNextClick={data => {
          this.props.chooseCity(data);
          this.props.push('/events/create/form');
        }}
        onBackClick={() => {
          this.props.push('/events');
        }}
      />
    );
  }
}
