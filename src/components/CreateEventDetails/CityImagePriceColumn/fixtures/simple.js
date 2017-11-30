//@flow

import type { PropsT } from '../';

import { default as cityImageBlockFixture } from '../../CityImageBlock/fixtures/simple';

import { default as priceBlockFixture } from '../../PriceBlock/fixtures/simple';

const res: PropsT = {
  feePercent: 10,
  city: {
    city_image: {
      url:
        'https://pfilestest.s3.amazonaws.com/6f90ad9f7d91654c82835bff5bf30b62_neu-munich.jpg',
    },
    city: 'München',
  },
  ...cityImageBlockFixture,
  ...priceBlockFixture,
};
export default res;
