// @flow

import React from 'react';
import styles from './index.module.less';
import SvgSelector from '../../../SvgSelector';

export default ({ onChange, value }: { onChange: Function, value: string }) => (
  <SvgSelector
    options={[
      {
        name: 'home',
        checkedIcon: require('../../../../../static/icons/home_orange.svg'),
        uncheckedIcon: require('../../../../../static/icons/home_gray.svg'),
      },
      {
        name: 'pickup',
        checkedIcon: require('../../../../../static/icons/pickup_orange.svg'),
        uncheckedIcon: require('../../../../../static/icons/pickup_gray.svg'),
      },
    ]}
    optionDefault={value}
    itemClassName={styles.category}
    className={styles.categories}
    onChange={onChange}
  />
);
