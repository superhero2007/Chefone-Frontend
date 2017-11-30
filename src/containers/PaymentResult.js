// @flow

import React from 'react';
import PaymentResult from '../components/PaymentResult';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fb, ec } from '../utils/analytics';
import {
  currencyStateSelector,
  getDiscountCode,
  getPrice,
  getDiscountPrice,
} from '../selectors';
import { load as loadOrder } from '../redux/modules/loadedOrder';
import { setAmount } from '../redux/modules/amount';

type PropsT = ConnectedDataT &
  BindedT & {
    routeParams: {
      type: 'pending' | 'success' | 'fail',
    },
  };

type ConnectedDataT = {
  shipping: string,
  price: string,
  totalPrice: string,
  amount: number,
  currency: string,
  coupon?: string,
  event: Object,
  order: Object,
  orderLoading: boolean,
  orderLoaded: boolean,
};

type BindedT = {
  push: Function,
  loadOrder: Function,
  setAmount: Function,
};

export default connect(
  state => {
    const totalPrice = !getDiscountCode(state)
      ? getPrice(state)
      : getDiscountPrice(state);
    const amount = state.amount;
    const event = state.event && state.event.data;
    const discount = state.discount && state.discount.data;
    const coupon = discount ? discount.code : undefined;
    const shipping = event.price * amount;

    const priceStr = Number(totalPrice / amount).toFixed(2);
    const totalPriceStr = Number(totalPrice).toFixed(2);
    const shippingStr = Number(shipping).toFixed(2);
    const res: ConnectedDataT = {
      currency: currencyStateSelector(state).name,
      price: priceStr,
      totalPrice: totalPriceStr,
      shipping: shippingStr,
      amount,
      coupon,
      event,
      order: state.order && state.order.data,
      orderLoading:
        state.loadedOrder && state.loadedOrder.meta.state === 'loading',
      orderLoaded:
        state.loadedOrder && state.loadedOrder.meta.state === 'success',
    };
    return res;
  },
  { push, loadOrder, setAmount },
)(
  class Container extends React.Component<*, *> {
    props: PropsT;
    state: {
      sended: boolean,
    };
    constructor() {
      super();
      this.state = { sended: false };
    }

    sendAnalytics(props: PropsT) {
      const {
        routeParams,
        event,
        order,
        currency,
        amount,
        price,
        totalPrice,
        shipping,
        coupon,
        setAmount,
      } = props;

      if (routeParams.type === 'success' && !this.state.sended) {
        this.setState({
          sended: true,
        });

        ec.purchase({
          eventId: event.objectId,
          orderId: order.orderId,
          title: event.title,
          price,
          totalPrice,
          shipping,
          amount,
          coupon,
        });

        fb('Purchase', {
          currency,
          value: totalPrice,
        });

        setAmount({ amount: 1 });
      }
    }
    componentDidMount() {
      this.sendAnalytics(this.props);
    }

    componentWillReceiveProps(props) {
      const {
        order,
        orderLoading,
        orderLoaded,
        routeParams,
        loadOrder,
      } = props;
      this.sendAnalytics(props);
      if (routeParams.type === 'fail' && !orderLoaded && !orderLoading) {
        loadOrder(order.orderId);
      }
    }

    render() {
      const { routeParams: { type } } = this.props;
      return <PaymentResult type={type} />;
    }
  },
);
