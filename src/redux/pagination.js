// @flow

import R from 'ramda';
import { createAction } from 'redux-actions';

const createMetaAction = (type: string, meta: *) =>
  createAction(type, id => id, () => meta);

export default (name: string, ac: Function) => (options: Object) => async (
  dispatch: Function,
  getState: Function,
) => {
  if (!options.nextPage) {
    const meta = {
      page: options.page || 0,
      maxElems: options.maxElems,
    };

    const action = createMetaAction(name, meta);

    return await dispatch(
      action({
        promise: async () => await ac({ ...options, ...meta }),
      }),
    );
  }

  const state = getState();
  const stateSlice = state[name];
  const data = stateSlice.data;
  const nextPage = stateSlice.meta.page + 1;

  const meta = {
    page: nextPage,
    maxElems: options.maxElems,
  };

  const action = createMetaAction(name, meta);

  return await dispatch(
    action({
      promise: async () => {
        const newData = await ac({ ...options, ...meta });

        return R.uniqBy(({ objectId }) => objectId)([...data, ...newData]);
      },
    }),
  );
};
