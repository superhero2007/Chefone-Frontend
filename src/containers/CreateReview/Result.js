// @flow

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CreateReviewResult from '../../components/CreateReview/Result';
// import type {ReduxState} from '../../redux/type';

@connect(() => ({}), { push })
export default class Container extends React.Component<*, *> {
  render() {
    return (
      <CreateReviewResult type={this.props.routeParams.type} {...this.props} />
    );
  }
}
