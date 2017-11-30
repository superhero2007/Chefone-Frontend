// @flow

import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PaymentPage from './../components/PaymentPage';
import * as actions from '../actions';
import { load } from '../redux/modules/discount';
import { load as createOrder } from '../redux/modules/order';
import { clear as clearDiscount } from '../redux/modules/discount';
import { push } from 'react-router-redux';
import type { ReduxState } from '../redux/type';

import {
  currencyStateSelector,
  getAmount,
  getPrice,
  getServiceFee,
  getDiscountCode,
  getDiscountPrice,
  getDiscountCash,
} from '../selectors';

class Container extends React.Component<*, *> {
  componentDidMount() {
    const { noEvent } = this.props;

    if (noEvent) {
      const { eventId } = this.props.params;
      this.props.push(`/event/${eventId}`);
      return;
    }

    this.props.clearDiscount();
    this.props.onAmountChanged({ eventId: this.props.eventId });

    const { session, event, phone, amount } = this.props;

    this.props.createOrder({
      userId: session.objectId,
      eventId: event.objectId,
      amount: parseInt(amount),
      phone,
    });
  }

  render() {
    const {
      phone,
      currency,
      price,
      event,
      finalPrice,
      noEvent,
      paymentReady,
      customerInfoReady,
      orderInfoReady,
      discountCash,
    } = this.props;

    if (noEvent) return null;
    const mom = moment(event.eventMoment);

    return (
      <PaymentPage
        {...{
          paymentReady,
          customerInfoReady,
          orderInfoReady,
          clientToken: this.props.clientToken,
          customerInfoForm: { phone },
          onContinueClick: this.props.onPaymentContinueClick,
          onMaybeSofortResult: this.props.onMaybeSofortResult,
          make100PercentDiscountPayment: this.props
            .make100PercentDiscountPayment,
          orderInfoCard: {
            onAmountChanged: amount => {
              this.props.onAmountChanged({ amount });
            },
            onOrderDiscountVerify: this.props.onOrderDiscountVerify,
            currency: currency.symbol,
            price,
            discountValue: discountCash,
            finalPrice,
            guestsMax: event.servings - event.servingsSold,
            amount: this.props.amount,
            guestsNumber: {
              value: this.props.amount,
              onChange: val =>
                this.props.onAmountChanged({
                  amount: val,
                  eventId: this.props.eventId,
                }),
            },
            foodImage: event.foodImage,
            eventTitle: event.title,
            eventDate: mom.locale('de').format('LL'),
            eventTime: mom.locale('de').format('LT') + ' Uhr',
            chefAvatar: event.chefAvatar,
          },
        }}
      />
    );
  }
}

export default connect(
  (state: ReduxState) => {
    const { session, discount, event } = state;

    if (!event.data) {
      return { noEvent: true };
    }

    const clientToken = state.order.data && state.order.data.clientToken;

    const discountVerifyProgress =
      discount.meta.state === 'initial' ? '' : discount.meta.state;

    const res = {
      phone:
        state.session && state.session.phone && state.session.phone.toString(),
      clientToken,
      currency: currencyStateSelector(state),
      discountVerifyProgress,
      amount: getAmount(state),
      session,
      price: getServiceFee(state),
      finalPrice: !getDiscountCode(state)
        ? getPrice(state)
        : getDiscountPrice(state),
      discountCash: getDiscountCode(state) ? getDiscountCash(state) : null,
      event: event.data,
      paymentReady: state.order.meta.state === 'success',
      customerInfoReady: true,
      orderInfoReady: state.event.meta.state === 'success',
    };

    return res;
  },
  { ...actions, verifyDiscount: load, push, createOrder, clearDiscount },
)(Container);
