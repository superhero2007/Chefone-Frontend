// @flow

import { event } from '../../server/api';
import { createAction } from 'redux-actions';
const { getEvents } = event;

import pagination from '../pagination';
import createLoadableResource from '../hors/clearAndLoad';
const name = 'passedEvents';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const clear = createAction(`${name}/CLEAR`);

export const load = pagination(name, options =>
  getEvents({
    passedOnly: true,
    ...options,
  }),
);
