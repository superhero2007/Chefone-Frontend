// @flow

import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { unfollowChef } from '../server/api/followers';
import withSimpleState from '../utils/withSimpleState';
import Unfollow from '../components/Unfollow';

export default R.compose(
  connect(({ session }) => {
    const userId = session ? session.objectId : null;
    return { userId };
  }),
  withSimpleState('type', () => 'pending'),
)(
  class Container extends React.Component<*, *> {
    componentDidMount() {
      (async () => {
        const { type, routeParams: { chefId }, userId } = this.props;
        try {
          await unfollowChef({ userId, chefId });
          type.onChange('success');
        } catch (e) {
          console.log(e);
          type.onChange('fail');
        }
      })();
    }

    render() {
      return <Unfollow {...this.props} type={this.props.type.value} />;
    }
  },
);
