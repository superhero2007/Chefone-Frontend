// @flow

import React from 'react';
import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, {
  allowMultiple: true,
});

export default applyStyles(() => <div styleName="logo" />);
