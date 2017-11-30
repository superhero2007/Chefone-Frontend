// @flow

import { Currencies } from '../../parseApi/api';

export const getCurrencyByName = async ({ name }: { name: string }) => {
  const res = await Currencies.Get({
    equalTo: [Currencies.Field.name(name)],
    limit: 1,
  });
  return res[0];
};

export const getDefaultCurrency = () => getCurrencyByName({ name: 'EUR' });
