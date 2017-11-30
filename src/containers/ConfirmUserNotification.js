// @flow

import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { confirmUser } from '../server/api/user';
import withSimpleState from '../utils/withSimpleState';
import ConfirmUserNotification from '../components/ConfirmUserNotification/Result';
import { fb } from '../utils/analytics';

import CONFIG from '../universalConfig';
const { api: { API_EMAIL_SERVER } } = CONFIG;

export default R.compose(
  connect(() => ({}), { push }),
  withSimpleState('type', () => 'pending'),
)(
  class Container extends React.Component<*, *> {
    componentDidMount() {
      (async () => {
        const { type, routeParams: { token } } = this.props;
        try {
          await confirmUser({ token, API_EMAIL_SERVER });
          type.onChange('success');

          fb('CompleteRegistration');
        } catch (e) {
          console.log(e);
          type.onChange('fail');
        }
      })();
    }

    render() {
      return (
        <ConfirmUserNotification {...this.props} type={this.props.type.value} />
      );
    }
  },
);
