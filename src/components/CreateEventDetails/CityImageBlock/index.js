// @flow

export * as fixtures from './fixtures';
import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

export type PropsT = {
  className?: string,
  cityName: string,
  countryName: string,
  cityImage: string,
};

export default applyStyles(
  ({ className, cityName, countryName, cityImage }: PropsT) => (
    <div className={className}>
      <div
        styleName="block image-block"
        style={{ backgroundImage: `url(${cityImage})` }}
      >
        <h5 styleName="city-name">{cityName}</h5>
        <h6 styleName="country-name">{countryName}</h6>
      </div>
    </div>
  ),
);
