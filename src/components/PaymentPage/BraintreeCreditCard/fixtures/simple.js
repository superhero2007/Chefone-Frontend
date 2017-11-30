//@flow

import type { PropsT } from '../';

const res: PropsT = {
  cardHolder: { value: '', onChange: () => {} },
  cardNumber: { value: '', onChange: () => {} },
  cardType: 'master',
  expirationYear: { value: '', onChange: () => {} },
  expirationMonth: { value: '', onChange: () => {} },
  CVV: { value: '', onChange: () => {} },
};
export default res;
