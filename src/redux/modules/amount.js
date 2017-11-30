// @flow

import { createAction, handleActions } from 'redux-actions';

export const setAmount = createAction('SET_AMOUNT');

export default handleActions(
  {
    SET_AMOUNT: (state, { payload: { amount } }) => amount,
  },
  //$FlowIssue TODO fix
  1,
);
