// @flow

import React from 'react';
import { load as loadMyOrders } from '../redux/modules/myOrders';
import { load as loadReviewsForDashboard } from '../redux/modules/reviewsForDashboard';
import {
  load as loadInviteDiscounts,
  clear as clearInviteDiscounts,
} from '../redux/modules/inviteDiscounts';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Dashboard from '../components/Dashboard';
import type { PropsT } from '../components/Dashboard';
import * as actions from '../actions';
import type { ReduxState } from '../redux/type';
import { notifySuccess } from '../actions';

const onCopy = () => (dispatch: Function) => {
  console.log('!!!');
  dispatch(notifySuccess('Copied!'));
};

class ConnectedDashboard extends React.Component<*, *> {
  componentDidMount() {
    const {
      loadReviewsForDashboard,
      userId,
      loadMyOrders,
      resetOrders,
      fetchOrders,
      clearInviteDiscounts,
      loadInviteDiscounts,
    } = this.props;
    loadMyOrders({ limit: 1000, userId });
    loadReviewsForDashboard({ userId });
    clearInviteDiscounts();
    loadInviteDiscounts({ userId });
    resetOrders();
    fetchOrders({
      userId,
      finalized: true,
      chefUserId: userId,
      limit: 3,
    });
  }

  render() {
    const props: PropsT = this.props;
    return (
      <Dashboard
        {...props}
        onReviewIntentClick={orderId => {
          this.props.push(`/reviews/create/form-1/${orderId}`);
        }}
      />
    );
  }
}

export default connect(
  ({
    session: { objectId },
    reviewsForDashboard,
    myOrders,
    orders,
    inviteDiscounts,
  }: ReduxState) => {
    console.log(inviteDiscounts);
    const reviewsLoading = reviewsForDashboard.meta.state === 'loading';
    const ordersLoading = myOrders.meta.state === 'loading';
    const discountsLoading = inviteDiscounts.meta.state === 'loading';
    const discounts = inviteDiscounts.data ? inviteDiscounts.data : [];
    const recentOrdersLoading = orders.meta.state === 'loading';
    const orders_ = myOrders.data ? myOrders.data : [];
    const reviews = reviewsForDashboard.data ? reviewsForDashboard.data : [];
    const recentOrders = orders.data ? orders.data : [];

    return {
      discounts,
      discountsLoading,
      userId: objectId,
      reviewsLoading,
      reviews,
      orders: orders_,
      ordersLoading,
      recentOrders,
      recentOrdersLoading,
    };
  },
  {
    ...actions,
    loadMyOrders,
    loadReviewsForDashboard,
    loadInviteDiscounts,
    clearInviteDiscounts,
    onCopy,
    push,
  },
)(ConnectedDashboard);
