// @flow

import _reduceReducers from 'reduce-reducers';

export const mapReducer = (map: Object, defaultState: Object) => (
  state: Object,
  action: Object,
) => {
  state = state || defaultState;
  return map[action.type] ? map[action.type](state, action) : state;
};

export const reduceReducers = (reduxArray: any) =>
  _reduceReducers.apply(null, reduxArray);

export const reduceHors = (...hors: any) => (params: any) => {
  const { type, redux } = hors.map(func => func(params)).reduce(
    (prev, next) => ({
      type: next.type,
      redux: [...prev.redux, next.reducer],
    }),
    { type: [], redux: [] }
  );

  const res = {
    type,
    reducer: reduceReducers(redux),
  };

  return res;
};
