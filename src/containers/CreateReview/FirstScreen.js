// @flow

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CreateReview from '../../components/CreateReview/FirstScreen';
import { commitFirstForm, clean } from '../../redux/modules/createReview';
import { fetchReviewData } from '../../actions';
import type { ReduxState } from '../../redux/type';

class Container extends React.Component<*, *> {
  componentDidMount() {
    const { routeParams: { orderId }, clean } = this.props;
    clean();

    if (orderId) {
      this.props.fetchReviewData({ orderId });
    }
  }

  render() {
    return (
      <CreateReview
        {...this.props}
        onBackClick={() => {
          // this.props.commitFirstForm(data);
          this.props.push('/');
        }}
        pendingActionFunc={() => Promise.resolve()}
        onNextClick={data => {
          this.props.commitFirstForm(data);
          this.props.push('/reviews/create/form-2');
        }}
      />
    );
  }
}

export default connect((state: ReduxState) => state.createReview, {
  commitFirstForm,
  push,
  clean,
  fetchReviewData,
})(Container);
