// @flow

import { createAction } from 'redux-actions';
import { admin } from '../../server/api';
import createLoadableResource from '../hors/clearAndLoad';

const { getPaymentOverview } = admin;
const name = 'adminPaymentOverview';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = () =>
  createAction(name)({
    promise: () => getPaymentOverview(),
  });
