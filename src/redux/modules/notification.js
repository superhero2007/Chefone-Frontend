// @flow

import { createAction, handleActions } from 'redux-actions';

export const notifyTop = (message: string) => createAction('NOTIFY')(message);

export default handleActions(
  {
    NOTIFY: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  { message: '' },
);
