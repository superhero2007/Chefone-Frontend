// @flow

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CreateReview from '../../components/CreateReview/ThirdScreen';
import { notifySuccess, notifyError } from '../../actions';
import { reviews } from '../../server/api';
import type { UpdateReviewData } from '../../server/api/reviews';
import { loc } from '../../localization';
import type { ReduxState } from '../../redux/type';

export default connect(
  ({ createReview, session: { objectId: userId } }: ReduxState) => ({
    ...createReview,
    userId,
  }),
  { push, notifySuccess, notifyError },
)(
  (
    props: UpdateReviewData & {
      push: Function,
      notifySuccess: Function,
      notifyError: Function,
    },
  ) => {
    return (
      <CreateReview
        {...props}
        onBackClick={() => props.push('/reviews/create/form-2')}
        pendingActionFunc={async () => {
          try {
            await reviews.updateReview(props);
            props.notifySuccess(loc.errors.REVIEW_SUCCESS_MESSAGE);
          } catch (e) {
            props.notifyError({ message: loc.errors.REVIEW_ERROR_MESSAGE });

            throw e;
          }
        }}
        onNextClick={() => props.push('/')}
      />
    );
  },
);
