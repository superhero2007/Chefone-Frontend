// @flow

import React from 'react';
import R from 'ramda';
import styles from './index.module.less';
import { fixedCSSModules } from '../../../../utils';
import DashboardItem from '../../DashboardItem';
import { loc } from '../../../../localization';
import type { AdminEventDetails_Dashboard } from '../../../../server/api/admin';

export default R.compose(fixedCSSModules(styles))(
  ({ guests, serviceFeeTotal, bruttoTotal }: AdminEventDetails_Dashboard) => {
    console.log();
    return (
      <div styleName="container">
        <DashboardItem
          theme={{
            number: styles.guest,
          }}
          icon={require('../../../../../static/icons/people_white.svg')}
          title={loc.admin.GUESTS}
          value={guests.toString()}
        />
        <DashboardItem
          icon={require('../../../../../static/icons/money_white.svg')}
          title={loc.admin.REVENUE}
          value={bruttoTotal}
        />
        <DashboardItem
          icon={require('../../../../../static/icons/money_white.svg')}
          title="Service Fee"
          value={serviceFeeTotal}
        />
      </div>
    );
  },
);
