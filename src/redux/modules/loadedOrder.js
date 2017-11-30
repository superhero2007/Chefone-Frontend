// @flow
import { order } from '../../server/api';
const { getOrderById } = order;

import createLoadableResource from '../hors/clearAndLoad';
import { createAction } from 'redux-actions';

const name = 'loadedOrder';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = (orderId: string, read?: boolean) =>
  createAction(name)({
    promise: () => getOrderById(orderId, read),
  });
