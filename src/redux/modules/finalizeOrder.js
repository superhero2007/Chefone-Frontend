// @flow

import { paymentServer } from '../../server/api';
const { finalizeOrder } = paymentServer;

import createLoadableResource from '../hors/clearAndLoad';
import { createAction } from 'redux-actions';

const name = 'finalizeOrder';

const { reducer } = createLoadableResource({ name });

export default reducer;

import CONFIG from '../../universalConfig';
const { api: { API_SERVER } } = CONFIG;

export const load = (props: *) =>
  createAction(name)({
    promise: () => finalizeOrder({ ...props, API_SERVER }),
  });
