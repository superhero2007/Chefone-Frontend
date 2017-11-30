// @flow

import { createAction } from 'redux-actions';
import { jobs } from '../../server/api';
import createLoadableResource from '../hors/clearAndLoad';

const { getJobs } = jobs;
const name = 'jobs';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = () =>
  createAction(name)({
    promise: () => getJobs(),
  });
