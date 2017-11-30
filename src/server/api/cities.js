// @flow

import R from 'ramda';
import { Cities } from '../../parseApi/api';

export const getCities = async () => {
  const res = await Cities.Get({ equalTo: [Cities.Field.active(true)] });

  return R.sortBy(({ city }) => city)(res);
};
