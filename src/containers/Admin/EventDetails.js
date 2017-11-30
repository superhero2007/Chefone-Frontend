// @flow

import React from 'react';
import { load } from '../../redux/modules/adminEventDetails';
import { connect } from 'react-redux';
import EventDetails from '../../components/Admin/EventDetails';
import * as actions from '../../actions';
import type { ReduxState } from '../../redux/type';

class Container extends React.Component<*, *> {
  componentDidMount() {
    const { eventId } = this.props.routeParams;
    this.props.load({ objectId: eventId });
  }

  render() {
    return <EventDetails {...this.props} />;
  }
}

export default connect(
  ({ adminEventDetails: { data } }: ReduxState) => (data ? data : {}),
  { ...actions, load },
)(Container);
