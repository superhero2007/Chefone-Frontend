// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

export default fixedCSSModules(styles)(({ value }: { value?: any }) => (
  <h1 styleName="component">{value}</h1>
));
