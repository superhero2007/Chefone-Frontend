// @flow

import { event } from '../../server/api';
const { getChefEvents } = event;

import pagination from '../pagination';
import createLoadableResource from '../hors/clearAndLoad';
const name = 'chefEvents';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = pagination(name, getChefEvents);
