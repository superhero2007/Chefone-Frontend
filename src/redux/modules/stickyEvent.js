// @flow

import { event } from '../../server/api';
const { getEvents } = event;

import { createAction } from 'redux-actions';
import createLoadableResource from '../hors/clearAndLoad';
const name = 'stickyEvent';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = () =>
  createAction(name)({
    promise: async () => (await getEvents({ sticky: true }))[0],
  });
