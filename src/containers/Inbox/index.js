// @flow

import React from 'react';
import R from 'ramda';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import DashboardNavbar from '../../components/DashboardNavbar';
import Message from '../../components/Message';
import * as actions from '../../actions';
import { inboxSelector } from '../../selectors';
// import type {ReduxState} from '../redux/type';

import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

export default R.compose(
  connect(inboxSelector, { ...actions, push }),
  applyStyles,
)(
  class extends React.Component<*, *> {
    componentDidMount() {
      const userId = this.props.session && this.props.session.objectId;
      this.props.resetOrders();
      this.props.fetchOrders({
        userId,
        finalized: true,
        chefUserId: userId,
      });
    }

    render() {
      return (
        <div>
          <DashboardNavbar />
          <div styleName="messages-container">
            <div className="container">
              <div className="col-xs-12 col-sm-10 col-sm-offset-1">
                <div styleName="header">Posteingang</div>

                {this.props.orders.map(order => {
                  if (order.lastMessage && !order.lastMessage.msgSeen) {
                    order.isNew = true;
                  }
                  return (
                    <Message
                      msgData={{
                        date: order.date,
                        name: order.chefName,
                        // price: `${order.foodPriceTotal}${order.currency}`,
                        title: order.foodTitle,
                        text: order.foodDescription,
                        avatar: order.chefAvatar,
                        isNew: order.isNew,
                      }}
                      onClick={() =>
                        this.props.push(`/booking-details/${order.objectId}`)
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  },
);
