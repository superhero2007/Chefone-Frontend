// @flow

import { createAction, handleActions } from 'redux-actions';

export const fetchedEventForCreateReview = createAction(
  'FETCH_EVENT_FOR_CREATE_REVIEW',
);
export const commitFirstForm = createAction('COMMIT_FIRST_REVIEW_FORM');
export const commitSecondForm = createAction('COMMIT_SECOND_REVIEW_FORM');
export const clean = createAction('CLEAN');
export const init = createAction('INIT');

const populate = (state, { payload }) => {
  return { ...state, ...payload };
};

const defaultState = {
  reviewText: '',
  reviewCompanyText: '',
};

export default handleActions(
  {
    FETCH_EVENT_FOR_CREATE_REVIEW: (state, { payload }) => {
      return { ...state, ...payload, eventId: payload.objectId };
    },
    COMMIT_FIRST_REVIEW_FORM: populate,
    COMMIT_SECOND_REVIEW_FORM: populate,
    INIT: populate,
    CLEAN: () => defaultState,
  },
  defaultState,
);
