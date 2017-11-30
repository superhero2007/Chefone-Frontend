// @flow

import { order } from '../../server/api';
const { getMyOrders } = order;

import pagination from '../pagination';
import createLoadableResource from '../hors/clearAndLoad';
const name = 'myEvents';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = pagination(name, getMyOrders);
