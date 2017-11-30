// @flow

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CreateEventDetails from '../components/CreateEventDetails';
import { commitSecondForm } from '../redux/modules/createEvent';
import { onSubmitCreateEvent } from '../actions';
import type { ReduxState } from '../redux/type';

export default connect(
  ({
    createEvent,
    fee,
    session: { phone },
    session: { objectId: userId },
  }: ReduxState) => ({
    createEvent,
    phoneNumber: phone,
    feePercent: fee.data,
    userId,
  }),
  {
    commitSecondForm,
    onSubmitCreateEvent,
    push,
  },
)(props => {
  return (
    <CreateEventDetails
      {...props.createEvent}
      phoneNumber={props.phoneNumber}
      feePercent={props.feePercent}
      onBackClick={data => {
        props.commitSecondForm(data);
        props.push('/events/create/form');
      }}
      pendingActionFunc={() => Promise.resolve()}
      onNextClick={data => {
        props.commitSecondForm(data);
        props.onSubmitCreateEvent();
      }}
    />
  );
});
