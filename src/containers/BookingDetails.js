// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bookingDetailsSelector } from '../selectors';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { load as createMessage } from '../redux/modules/message';
import BookingDetails from '../components/BookingDetails';
// import type {ReduxState} from '../redux/type';

class BookingDetailsPage extends Component<*, *> {
  componentWillMount() {
    const orderId = this.props.params.orderId;
    this.props.loadBookingDetailsInfo(orderId);
  }
  render() {
    return <BookingDetails {...this.props} />;
  }
}

export default connect(bookingDetailsSelector, {
  ...actions,
  push,
  createMessage,
})(BookingDetailsPage);
