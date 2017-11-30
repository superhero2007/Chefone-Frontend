// @flow

import { mapReducer } from './utils';

export default ({
  name,
  defaultState,
}: {
  name: string,
  defaultState: Object,
}) => {
  const finalDefaultState = {
    ...defaultState,
    data: null,
    meta: { state: 'initial' },
  };
  const CLEAR = `${name}/CLEAR`;

  return {
    reducer: mapReducer(
      {
        [CLEAR]: () => finalDefaultState,
      },
      finalDefaultState,
    ),
    type: name,
  };
};
