// @flow

import React from 'react';

import { connect } from 'react-redux';
import LandingLogin from '../components/Landings/Login';
import * as actions from '../actions';
import * as auth from '../actions/auth';
import { push } from 'react-router-redux';

export default connect(() => ({}), {
  ...actions,
  ...auth,
  push,
})(({ push, signinFacebook, signin }) => (
  <LandingLogin
    signinFacebook={signinFacebook}
    onSubmit={signin}
    forgotPassword={() => push('/forgot-password')}
    goToSignUp={() => {
      push('/l/register');
    }}
  />
));
