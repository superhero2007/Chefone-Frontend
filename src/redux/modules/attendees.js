// @flow

import { attendees } from '../../server/api';
const { getAttendees } = attendees;

import createLoadableResource from '../hors/clearAndLoad';
import pagination from '../pagination';

const name = 'attendees';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = pagination(name, getAttendees);
