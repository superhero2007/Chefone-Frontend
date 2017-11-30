// @flow

import React from 'react';
import styles from './index.module.less';
import { fixedCSSModules } from '../../../../utils';
import DashboardItem from '../../DashboardItem';
import { loc } from '../../../../localization';

export default fixedCSSModules(styles)(
  ({
    eventsNumber,
    guestsNumber,
    revenue,
    serviceFeeTotal,
    currencySymbol,
  }: {
    eventsNumber: number,
    guestsNumber: number,
    revenue: number,
    serviceFeeTotal: number,
    currencySymbol: string,
  }) => {
    return (
      <div styleName="dashboard">
        <DashboardItem
          icon={require('../../../../../static/icons/icon_book_white.svg')}
          title="Events"
          value={eventsNumber.toString()}
        />
        <DashboardItem
          icon={require('../../../../../static/icons/people_white.svg')}
          title={loc.admin.GUESTS}
          value={guestsNumber.toString()}
        />
        <DashboardItem
          icon={require('../../../../../static/icons/money_white.svg')}
          title={loc.admin.REVENUE}
          value={parseInt(revenue) + currencySymbol}
        />
        <DashboardItem
          icon={require('../../../../../static/icons/money_white.svg')}
          title="Service Fee"
          value={parseInt(serviceFeeTotal) + currencySymbol}
        />
      </div>
    );
  },
);
