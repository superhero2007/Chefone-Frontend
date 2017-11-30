//@flow

import type { PropsT } from '../';
import braintreeCreditCardData from '../../BraintreeCreditCard/fixtures/simple';

const res: PropsT = {
  activeMethod: { value: 'creditCard', onChange: () => {} },
  braintreeCreditCardData,
};

export default res;
