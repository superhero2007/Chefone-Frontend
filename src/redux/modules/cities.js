// @flow

import { createAction } from 'redux-actions';
import { cities } from '../../server/api';
import createLoadableResource from '../hors/clearAndLoad';

const { getCities } = cities;
const name = 'cities';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = () =>
  createAction(name)({
    promise: () => getCities(),
  });
