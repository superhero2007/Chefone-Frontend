// @flow

import { fee } from '../../server/api';
const { getFee } = fee;

import createLoadableResource from '../hors/clearAndLoad';
import { createAction } from 'redux-actions';

const name = 'fee';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = () =>
  createAction(name)({
    promise: getFee,
  });
