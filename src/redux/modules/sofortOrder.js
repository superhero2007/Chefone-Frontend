// @flow

import { order } from '../../server/api';
const { setOrder } = order;

import { createAction } from 'redux-actions';

import createLoadableResource from '../hors/clearAndLoad';

const name = 'orderSofort';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = (data: Object) =>
  createAction(name)({
    promise: async () => {
      let result;
      try {
        result = await setOrder(data);
        console.log(result);
      } catch (e) {
        console.log(e);
      }
      result = { timestamp: new Date().getTime() };
      return result;
    },
  });
