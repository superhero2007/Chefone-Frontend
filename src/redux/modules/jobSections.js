// @flow

import { createAction } from 'redux-actions';
import { jobSections } from '../../server/api';
import createLoadableResource from '../hors/clearAndLoad';

const { getJobSections } = jobSections;
const name = 'jobSections';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = () =>
  createAction(name)({
    promise: () => getJobSections(),
  });
