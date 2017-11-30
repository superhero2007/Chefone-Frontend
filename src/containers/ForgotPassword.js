// @flow

import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import * as auth from '../actions/auth';
import ForgotPassword from '../components/ForgotPassword';
import type { ReduxState } from '../redux/type';
import { openAuthPage } from '../redux/modules/modals';

export default R.compose(
  connect(({ session }: ReduxState) => ({ session }), {
    ...auth,
    openAuthPage,
  }),
)(
  class ConnectedForgotPassword extends React.Component<*, *> {
    render() {
      const { resetPassword, session, openAuthPage } = this.props;

      return (
        <ForgotPassword
          onSubmit={({ email }) => {
            resetPassword(email);
          }}
          reset_password_error={session.reset_password_error}
          goToLogin={() => openAuthPage('LOGIN')}
        />
      );
    }
  },
);
