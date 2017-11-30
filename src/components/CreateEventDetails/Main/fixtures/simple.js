//@flow

import type { PropsT } from '../';

const res: PropsT = {
  feePercent: 10,
  foodImages: [
    'https://pfilestest.s3.amazonaws.com/6f90ad9f7d91654c82835bff5bf30b62_neu-munich.jpg',
    'https://pfilestest.s3.amazonaws.com/6f90ad9f7d91654c82835bff5bf30b62_neu-munich.jpg',
    null,
  ],
  city: {
    city_image: {
      url:
        'https://pfilestest.s3.amazonaws.com/6f90ad9f7d91654c82835bff5bf30b62_neu-munich.jpg',
    },
    city: 'München',
  },
  countryName: 'Germany',
  price: 12,
  currency: { symbol: '$' },
  category: '1',
  onNextClick: () => {},
  onBackClick: () => {},
  onSubmitForm: () => {},
};
export default res;
