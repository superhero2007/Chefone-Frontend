// @flow

import React from 'react';
import { connect } from 'react-redux';
import CreateEventResult from '../components/CreateEventResult';

export default connect(() => ({}))(props => (
  <CreateEventResult type={props.routeParams.type} />
));
