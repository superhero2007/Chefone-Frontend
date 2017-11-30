// @flow

import createLoadableResource from '../hors/clearAndLoad';
import { reviews } from '../../server/api';
const { getUserReviews } = reviews;

import pagination from '../pagination';

const name = 'reviews';
const { reducer } = createLoadableResource({ name });

export default reducer;

export const load = pagination(name, getUserReviews);
