// @flow

import { event } from '../../server/api';
const { getEventById } = event;

import createLoadableResource from '../hors/clearAndLoad';
import { createAction } from 'redux-actions';

const name = 'event';
const { reducer } = createLoadableResource({ name });

export default reducer;

//$FlowIssue
export const load = ({ eventId, userId }: *) =>
  createAction(name)({
    promise: () => getEventById({ eventId, userId }),
  });
