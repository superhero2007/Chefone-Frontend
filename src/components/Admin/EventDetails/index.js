// @flow

import React from 'react';
import R from 'ramda';
export * as fixtures from './fixtures';
import ChefPanel from './ChefPanel';
import OrdersPanel from './OrdersPanel';
import Dashboard from './Dashboard';
import EventPanel from './EventPanel';
import { LoaderDecorator } from '../../../decorators';
import styles from './index.module.less';
import { fixedCSSModules } from '../../../utils';
import type { AdminEventDetails } from '../../../server/api/admin';

export default R.compose(
  LoaderDecorator({
    condition: data => data && data.eventPanel,
    isOnlyLoader: true,
  }),
  fixedCSSModules(styles),
)((data: AdminEventDetails) => {
  const { eventPanel, chefPanel, ordersPanel, dashboard } = data;

  return (
    <div styleName="my-container">
      <div className="container">
        <div styleName="row">
          <div styleName="event-panel">
            {/*$FlowIssue*/}
            <EventPanel {...eventPanel} />
          </div>
          <div styleName="chef-panel">
            <ChefPanel {...chefPanel} />
          </div>
        </div>
        <div styleName="order-title">Orders</div>
        <div styleName="order-panel">
          {/*$FlowIssue*/}
          <OrdersPanel array={ordersPanel} />
        </div>
        <div styleName="dashboard">
          <Dashboard {...dashboard} />
        </div>
      </div>
    </div>
  );
});
