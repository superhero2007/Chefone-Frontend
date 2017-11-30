//@flow

import type { PropsT } from '../';

const res: PropsT = {
  onOrderDiscountVerify: () => {},
  currency: '€',
  price: 52,
  finalPrice: 52,
  guestsMax: 2,
  foodImage:
    'https://pfilestest.s3.amazonaws.com/b6e745c84a7fee447805ecfdd0094ce6_image1.jpg',
  eventTitle: 'test 3',
  eventDate: 'December 20, 2016',
  eventTime: '3:03 PM',
  chefAvatar:
    'https://pfilestest.s3.amazonaws.com/ae3443b0e5797da07a613ec6bb0a6f3b_avatar.jpg',
  discountCode: {
    value: '',
    onChange: () => {},
  },
  guestsNumber: {
    value: 2,
    onChange: () => {},
  },
  isUseDiscount: {
    value: false,
    onChange: () => {},
  },
};
export default res;
