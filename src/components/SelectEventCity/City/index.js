// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

export default fixedCSSModules(styles, {
  allowMultiple: true,
})(
  ({
    image,
    isSelected,
    cityName,
    countryName,
    onClick,
  }: {
    image: Object,
    isSelected: boolean,
    cityName: string,
    countryName: string,
    onClick: Function,
  }) => (
    <div styleName="city-card-container">
      <div
        styleName="city-card"
        style={{ backgroundImage: `url(${image ? image.url : ''})` }}
        onClick={onClick}
      >
        <div styleName={isSelected ? '' : 'overlay'} />
        <div styleName={isSelected ? 'active-image' : ''} />
        <h5 styleName="city-name">{cityName}</h5>
        <h6 styleName="country-name">{countryName}</h6>
      </div>
    </div>
  ),
);
