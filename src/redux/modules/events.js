// @flow

import { createAction } from 'redux-actions';
import { event } from '../../server/api';

const { getEvents } = event;

import pagination from '../pagination';
import createLoadableResource from '../hors/clearAndLoad';
const name = 'events';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const clear = createAction(`${name}/CLEAR`);

export const load = pagination(name, getEvents);
