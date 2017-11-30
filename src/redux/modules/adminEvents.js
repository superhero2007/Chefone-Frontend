// @flow

import { admin } from '../../server/api';
const { getAdminEvents } = admin;

import pagination from '../pagination';
import createLoadableResource from '../hors/clearAndLoad';
const name = 'adminEvents';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = pagination(name, getAdminEvents);
