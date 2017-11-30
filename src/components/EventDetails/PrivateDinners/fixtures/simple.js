//@flow

import type { PropsT } from '../';

const delay = sec => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), sec);
  });
};
const sendRequestForPrivateDinner = async args => {
  console.log(args);
  return await delay(2000);
};

const res: PropsT = {
  price: 11,
  currency: '$',
  onSubmit: sendRequestForPrivateDinner,
};

export default res;
