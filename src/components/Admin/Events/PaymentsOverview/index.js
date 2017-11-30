// @flow

import React from 'react';
export * as fixtures from './fixtures';

import styles from './index.module.less';
import { fixedCSSModules } from '../../../../utils';

const Stat = fixedCSSModules(styles)(({ icon, value, detail }) => {
  return (
    <div styleName="stat">
      <div styleName="icon">{icon}</div>
      <div styleName="info">
        <div styleName="value">{value}</div>
        <div styleName="detail">{detail}</div>
      </div>
    </div>
  );
});

const ColoredPercentChange = fixedCSSModules(styles)(({ value }) => {
  const positive = value > 0;
  return (
    <span styleName={positive ? 'green' : 'red'}>
      {positive ? '+' : '-'}
      {Math.abs(value)}%
    </span>
  );
});

export type PropsT = {
  thisMonthEarnings: string,
  lastMonthEarnings: string,
  percent: number,
};

export default fixedCSSModules(styles)(
  ({ thisMonthEarnings, lastMonthEarnings, percent }: PropsT) => {
    return (
      <div styleName="component">
        <div styleName="header">Payments Overview</div>
        <div styleName="stats">
          <Stat
            icon={<div styleName="icon-1" />}
            value={thisMonthEarnings + '€'}
            detail="Earnings this Month"
          />
          <Stat
            icon={<div styleName="icon-2" />}
            value={lastMonthEarnings + '€'}
            detail="Earnings last Month"
          />
          <Stat
            icon={<div styleName="icon-3" />}
            value={<ColoredPercentChange value={percent} />}
            detail="Percentage Increase"
          />
        </div>
      </div>
    );
  },
);
