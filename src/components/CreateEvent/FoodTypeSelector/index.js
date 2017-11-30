// @flow

import React from 'react';
import SvgSelector from '../../SvgSelector';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

export default fixedCSSModules(styles)(
  ({ onChange, value }: { onChange: Function, value: string }) => (
    <SvgSelector
      options={[
        {
          name: 'omnivore',
          label: 'Allesesser',
          checkedIcon: require('../../../../static/icons/omnivore_orange.svg'),
          uncheckedIcon: require('../../../../static/icons/omnivore_gray.svg'),
        },
        {
          name: 'vegetarian',
          label: 'Vegetarian',
          checkedIcon: require('../../../../static/icons/vegetarian_orange.svg'),
          uncheckedIcon: require('../../../../static/icons/vegetarian_gray.svg'),
        },
        {
          name: 'vegan',
          label: 'Vegan',
          checkedIcon: require('../../../../static/icons/vegan_orange.svg'),
          uncheckedIcon: require('../../../../static/icons/vegan_gray.svg'),
        },
      ]}
      optionDefault={value}
      styleName="foodtypes"
      onChange={onChange}
    />
  ),
);
