// @flow

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import OrderDetails from '../components/OrderDetails';
import { load as loadOrder } from '../redux/modules/loadedOrder';
import type { ReduxState } from '../redux/type';

class OrderDetailsPage extends React.Component<*, *> {
  componentDidMount() {
    const { orderId } = this.props.params;
    this.props.loadOrder(orderId);
  }

  render() {
    const { order, orderLoaded } = this.props;
    if (!orderLoaded) return null;
    return <OrderDetails order={order} />;
  }
}

export default connect(
  (state: ReduxState) => {
    const orderLoaded = state.loadedOrder.meta.state === 'success';
    const orderLoading = state.loadedOrder.meta.state === 'loading';
    const order = orderLoaded && state.loadedOrder.data;
    return {
      orderLoaded,
      orderLoading,
      order,
    };
  },
  { ...actions, push, loadOrder },
)(OrderDetailsPage);
