// @flow

import React, { Component } from 'react';
import SignUpSuccess from '../components/SignUpSuccess';

export default class ConnectedSignUpSuccess extends Component<*, *> {
  render() {
    return <SignUpSuccess showLogin={this.props.showLogin} />;
  }
}
