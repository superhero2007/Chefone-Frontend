//@flow

import type { PropsT } from '../';

const res: PropsT = {
  price: { value: '1', onChange: () => {} },
  category: { value: '1', onChange: () => {} },
  calcFee: () => {},
  calcGuestPrice: () => {},
  currency: {
    symbol: '$',
  },
};
export default res;
