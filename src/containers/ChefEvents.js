// @flow

import React from 'react';
import { load } from '../redux/modules/chefEvents';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { event } from '../server/api';
const { removeEventProcedure } = event;
import ChefEvents from '../components/ChefEvents';
import * as actions from '../actions';
import type { ReduxState } from '../redux/type';

class ConnectedChefEvents extends React.Component<*, *> {
  componentDidMount() {
    const { userId, load } = this.props;
    load({ limit: 1000, userId });
  }

  render() {
    return (
      <ChefEvents
        {...this.props}
        onNextClick={() => this.props.push('/events/create/select-city')}
        onEditEvent={this.props.editEvent}
        onDeleteEvent={async id => {
          await removeEventProcedure({ eventId: id });
          this.props.load({ limit: 1000, userId: this.props.userId });
        }}
      />
    );
  }
}

export default connect(
  ({ chefEvents, session }: ReduxState) => {
    const userId = session ? session.objectId : null;
    if (!chefEvents.data) {
      return { userId };
    }

    return {
      events: chefEvents.data && chefEvents.data.map ? chefEvents.data : [],
      userId,
    };
  },
  { ...actions, load, push },
)(ConnectedChefEvents);
