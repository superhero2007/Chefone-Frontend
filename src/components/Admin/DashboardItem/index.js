// @flow

import React from 'react';
export * as fixtures from './fixtures';
import styles from './index.module.less';
import { fixedCSSModules } from '../../../utils';

import SvgIcon from '../../SvgIcon';

export default fixedCSSModules(styles)(
  ({
    value,
    icon,
    title,
    theme,
  }: {
    value: string,
    icon: string,
    title: string,
    theme?: { number: string },
  }) => {
    return (
      <div styleName="dashboard-item">
        <div styleName="left-col">
          <SvgIcon styleName="icon" finalIcon={icon} />
        </div>
        <div styleName="right-col">
          <div styleName="big-number" className={theme && theme.number}>
            {value}
          </div>
          <div styleName="title">{title}</div>
        </div>
      </div>
    );
  },
);
