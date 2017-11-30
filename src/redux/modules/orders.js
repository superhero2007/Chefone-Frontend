// @flow

import { order } from '../../server/api';
const { getOrders } = order;

import createLoadableResource from '../hors/clearAndLoad';
import { createAction } from 'redux-actions';

const name = 'orders';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = (options: *) =>
  createAction(name)({
    promise: () => getOrders(options),
  });
