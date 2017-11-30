// @flow

import { _User } from '../../parseApi/api';

import createLoadableResource from '../hors/clearAndLoad';
import { createAction } from 'redux-actions';

const name = 'invitingUser';

const { reducer } = createLoadableResource({ name });

export default reducer;

export const clear = createAction(`${name}/CLEAR`);

export const load = ({ objectId }: { objectId: string }) =>
  createAction(name)({
    promise: async () => {
      return await _User.GetById(objectId);
    },
  });
