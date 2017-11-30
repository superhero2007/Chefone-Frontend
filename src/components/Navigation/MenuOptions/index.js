// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

export default fixedCSSModules(styles)(({ children }) => (
  <div styleName="menu-options">{children}</div>
));
