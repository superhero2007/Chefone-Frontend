// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

export default fixedCSSModules(styles)(
  (props: null | { children?: any, className?: string, style?: Object }) => {
    const children = props ? props.children : null;
    const className = props ? props.className : null;
    const style = props ? props.style : null;

    return (
      <div styleName="component" className={className} style={style}>
        {children}
      </div>
    );
  },
);
