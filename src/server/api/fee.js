// @flow

import { Fee } from '../../parseApi/api';

export const getFee = async (): Promise<number> => {
  const [res] = await Fee.Get({ limit: 1 });
  const fee = res.customer;
  if (fee === undefined) {
    throw Error('fee is undefined');
  }
  return fee;
};
