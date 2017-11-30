// @flow

import React from 'react';
import R from 'ramda';
import queryString from 'query-string';
import { connect } from 'react-redux';
import withSimpleState from '../utils/withSimpleState';
import PrivateDinnerResult from '../components/PrivateDinnerResult';
import { PrivateDinnerRequest, _User, Event } from '../parseApi/api';
import { promiseDispatch } from '../utils';
import moment from 'moment';

const delay = sec =>
  new Promise(resolve => {
    setTimeout(() => resolve(), sec);
  });

const requestPrivateDinnerSubmit = ({
  eventId,
  amount,
  date,
  price,
  userMessage,
}) =>
  promiseDispatch(
    'onRequestPrivateDinnerSubmit',
    async (dispatch: Function, getState) => {
      const { session: { objectId: userId } } = getState();
      await PrivateDinnerRequest.Create({
        objectIdUser: _User.Pointer(userId),
        objectIdEvent: Event.Pointer(eventId),
        guests: amount,
        price,
        finalPrice: price * amount,
        privateDinnerDate: date,
        userMessage,
      });
    },
  );

export default R.compose(
  connect(
    ({ session }, props) => {
      const query = queryString.parse(props.location.search);
      const userId = session ? session.objectId : null;
      return { params: { userId, ...query } };
    },
    { requestPrivateDinnerSubmit },
  ),
  withSimpleState('type', () => 'pending'),
)(
  class Container extends React.Component<*, *> {
    componentDidMount() {
      (async () => {
        const { type, params, requestPrivateDinnerSubmit } = this.props;

        const { eventId, amount, date, price, userMessage } = params;

        const finalParams = {
          eventId,
          amount: parseInt(amount),
          date: moment(date).toDate(),
          price: parseInt(price),
          userMessage,
        };

        try {
          await delay(1500);
          await requestPrivateDinnerSubmit(finalParams);
          type.onChange('success');
        } catch (e) {
          console.log(e);
          type.onChange('fail');
        }
      })();
    }

    render() {
      console.log('1111');
      return (
        <PrivateDinnerResult {...this.props} type={this.props.type.value} />
      );
    }
  },
);
