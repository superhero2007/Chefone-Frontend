// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

export default fixedCSSModules(styles)(({ value }: { value: string }) => {
  return <h2 styleName="component">{value}</h2>;
});
