// @flow

import { createAction, handleActions } from 'redux-actions';

export const startProgress = () => (dispatch: Function) => {
  dispatch(createAction('STOP_CLEAR_PROGRESS')());
  let progress = 10;
  const step = 10;

  const tic = () => {
    dispatch(createAction('SET_PROGRESS')({ progress }));
    const rate = (100 - progress) / 100;
    const add = step * rate * rate;
    progress += add;

    if (progress + 10 >= 100) {
      dispatch(createAction('SET_PROGRESS')({ progress: 100 }));
      dispatch(createAction('STOP_CLEAR_PROGRESS')());
    }
  };

  dispatch(createAction('START_PROGRESS')({ interval: setInterval(tic, 300) }));
};

export const stopProgress = () => createAction('STOP_CLEAR_PROGRESS')();

const defaultState = { progress: 0 };

export default handleActions(
  {
    START_PROGRESS: (state, { payload: { interval } }) => ({
      ...state,
      interval,
    }),
    SET_PROGRESS: (state, { payload: { progress } }) => ({
      ...state,
      progress,
    }),
    STOP_CLEAR_PROGRESS: ({ interval }) => {
      clearTimeout(interval);
      return defaultState;
    },
  },
  defaultState,
);
