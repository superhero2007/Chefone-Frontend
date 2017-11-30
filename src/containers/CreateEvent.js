// @flow

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CreateEvent from '../components/CreateEvent';
import { commitFirstForm } from '../redux/modules/createEvent';
import type { ReduxState } from '../redux/type';

export default connect(({ createEvent }: ReduxState) => createEvent, {
  commitFirstForm,
  push,
})(props => {
  return (
    <CreateEvent
      {...props}
      onBackClick={data => {
        props.commitFirstForm(data);
        props.push('/events/create/select-city');
      }}
      pendingActionFunc={() => Promise.resolve()}
      onNextClick={data => {
        props.commitFirstForm(data);
        props.push('/events/create/form-details');
      }}
    />
  );
});
