// @flow

import React from 'react';

import { fixedCSSModules } from '../../../../utils';
import styles from './index.module.less';

export default fixedCSSModules(styles)(
  ({
    children,
    className,
    onClose,
  }: {
    children: any,
    className: string,
    onClose: Function,
  }) => (
    <div styleName="component" className={className}>
      <div styleName="wrapper">
        <div styleName="logo" />
        <div styleName="cross" onClick={onClose} />
      </div>
      {children}
    </div>
  ),
);
