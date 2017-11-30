// @flow

import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import type { ReduxState } from '../../redux/type';

export type ProfileSectionType = {
  params: Object,
  route: Object,
  push: Function,
  location: Object,
};

class ProfilePage extends React.Component<*, *> {
  props: ProfileSectionType;

  render() {
    return <div className="profile-view-container" />;
  }
}

export default connect(
  (state: ReduxState, ownProps) => {
    // console.log('state in jobs container', state, ownProps)
    const route = ownProps.route || '';

    return {
      route,
    };
  },
  { push },
)(ProfilePage);
