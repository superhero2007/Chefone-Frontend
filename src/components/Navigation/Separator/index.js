// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, {
  allowMultiple: true,
});

export default applyStyles(
  (props: { vertical?: boolean, className?: string } | null) => {
    const { vertical, className } = props || {};
    if (!vertical) {
      return <hr className={className} styleName={`component horizontal`} />;
    }
    return <span className={className} styleName={`component vertical`} />;
  },
);
