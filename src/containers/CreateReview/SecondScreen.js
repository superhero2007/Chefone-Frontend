// @flow

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CreateReview from '../../components/CreateReview/SecondScreen';
import { commitSecondForm } from '../../redux/modules/createReview';
import type { ReduxState } from '../../redux/type';

export default connect((state: ReduxState) => state.createReview, {
  commitSecondForm,
  push,
})(props => {
  return (
    <CreateReview
      {...props}
      onBackClick={data => {
        props.commitSecondForm(data);
        props.push('/reviews/create/form-1');
      }}
      pendingActionFunc={() => Promise.resolve()}
      onNextClick={data => {
        props.commitSecondForm(data);
        props.push('/reviews/create/form-3');
      }}
    />
  );
});
