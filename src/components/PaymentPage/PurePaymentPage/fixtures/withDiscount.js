//@flow

import type { Props } from '../';

const res: Props = {
  paymentReady: true,
  customerInfoReady: true,
  orderInfoReady: true,
  paymentProceedure: {
    activeMethod: { value: 'paypal', onChange: () => {} },
    braintreeCreditCardData: {
      cardHolder: { value: 'Sergey', onChange: () => {} },
      cardNumber: { value: '21212', onChange: () => {} },
      cardType: 'master',
      expirationYear: { value: '2121', onChange: () => {} },
      expirationMonth: { value: '22', onChange: () => {} },
      CVV: { value: 'paypal', onChange: () => {} },
    },
  },
  errors: [],
  isMobile: true,
  touched: false,
  disabled: false,
  discount100: false,
  discountCode: { value: '', onChange: () => {} },
  chefMessageChangeble: { value: '', onChange: () => {} },
  phoneChangeble: { value: '', onChange: () => {} },
  isAgreedTerms: { value: false, onChange: () => {} },
  isUseDiscount: { value: false, onChange: () => {} },
  onContinueClick: () => {},
  orderInfoCard: {
    onOrderDiscountVerify: () => {},
    currency: '€',
    discountValue: 10,
    price: 52,
    finalPrice: 42,
    guestsMax: 2,
    guestsNumber: {
      value: 1,
      onChange: () => {},
    },
    isUseDiscount: {
      value: true,
      onChange: () => {},
    },
    foodImage:
      'https://pfilestest.s3.amazonaws.com/b6e745c84a7fee447805ecfdd0094ce6_image1.jpg',
    eventTitle: 'test 3',
    eventDate: 'December 20, 2016',
    eventTime: '3:03 PM',
    chefAvatar:
      'https://pfilestest.s3.amazonaws.com/ae3443b0e5797da07a613ec6bb0a6f3b_avatar.jpg',
  },
};
export default res;
