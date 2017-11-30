// @flow

import { paymentServer } from '../../server/api';
const { createOrder } = paymentServer;

import { createAction } from 'redux-actions';

import createLoadableResource from '../hors/clearAndLoad';

const name = 'order';
const { reducer } = createLoadableResource({ name });

export default reducer;

import CONFIG from '../../universalConfig';
const { api: { API_SERVER } } = CONFIG;

export const load = (data: *) =>
  createAction(name)({
    promise: () => createOrder({ ...data, API_SERVER }),
  });
