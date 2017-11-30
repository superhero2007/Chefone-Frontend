// @flow

import { admin } from '../../server/api';
const { getEventDetails } = admin;

import pagination from '../pagination';
import createLoadableResource from '../hors/clearAndLoad';
const name = 'adminEventsDetails';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = pagination(name, getEventDetails);
