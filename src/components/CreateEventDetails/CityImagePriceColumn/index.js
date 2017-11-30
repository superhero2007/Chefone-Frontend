// @flow

export * as fixtures from './fixtures';

import React from 'react';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });
import PriceBlock from '../PriceBlock';
import { getRawEventServiceFeeFunc } from '../../../selectors';
import CityImageBlock from '../CityImageBlock';

import type { Changeble } from '../../../utils/withSimpleState';

export type PropsT = {
  feePercent: number,
  city: {
    city_image: {
      url: string,
    },
    city: string,
  },
  countryName: string,
  price: number,
  currency: Object,
  category: string,
  price: Changeble<string>,
  category: Changeble<string>,
};

export default applyStyles(props => {
  const {
    feePercent,
    countryName,
    currency,
    city: { city_image: { url: cityImage }, city: cityName },
    price,
    category,
  }: PropsT = props;
  return (
    <div>
      <CityImageBlock
        cityImage={cityImage}
        cityName={cityName}
        countryName={countryName}
      />
      <PriceBlock
        currency={currency}
        price={price}
        category={category}
        calcFee={(price: number) =>
          getRawEventServiceFeeFunc(price, feePercent)
        }
        calcGuestPrice={(price: number) =>
          price + getRawEventServiceFeeFunc(price, feePercent)
        }
      />
    </div>
  );
});
