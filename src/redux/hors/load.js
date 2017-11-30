// @flow

import { mapReducer } from './utils';

export default ({ name }: { name: string }) => {
  const LOAD = `${name}_LOAD`;
  const LOAD_SUCCESS = `${name}_LOAD_SUCCESS`;
  const LOAD_FAIL = `${name}_LOAD_FAIL`;

  return {
    reducer: mapReducer(
      {
        [LOAD]: state => ({
          ...state,
          meta: {
            state: 'loading',
          },
        }),
        [LOAD_SUCCESS]: (state, action) => {
          return {
            ...state,
            data: action.payload,
            meta: {
              ...action.meta,
              state: 'success',
            },
          };
        },
        [LOAD_FAIL]: (state, action) => ({
          ...state,
          meta: {
            ...action.meta,
            state: 'error',
            error: action.payload,
            errorMsg: action.payload.message,
            errorStack: action.payload.stack,
          },
        }),
      },
      {
        meta: {
          state: 'initial',
        },
      },
    ),
  };
};
