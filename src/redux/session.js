// @flow

import {
  ACTION_SIGNOUT,
  ACTION_SIGNUP,
  ACTION_SIGNIN,
  ACTION_SIGNIN_FACEBOOK,
  ACTION_RESET_PASSWORD,
} from '../actions/auth';

const PENDING = 'LOAD';
const FULFILLED = 'LOAD_SUCCESS';
const REJECTED = 'LOAD_FAIL';

import { userSelector } from '../selectors';

export const updateRavenUserContext = (user: {
  email?: string,
  firstName?: string,
  lastName?: string,
  objectId: string,
}) => {
  if (!__CLIENT__) {
    return;
  }

  const Raven = require('raven-js');

  Raven.setUserContext({
    email: user.email,
    username: (user.firstName || 'none') + ' ' + (user.lastName || 'none'),
    id: user.objectId,
  });
};

export default (state: Object, action: Object) => {
  state = state || {};
  const { type, error, payload } = action;

  let user;
  switch (type) {
    case `${ACTION_RESET_PASSWORD}_${REJECTED}`:
      return { reset_password_success: error };
    case `${ACTION_RESET_PASSWORD}_${FULFILLED}`:
      return { reset_password_success: true };
    case ACTION_SIGNOUT:
      return {};
    case `${ACTION_SIGNIN_FACEBOOK}_${PENDING}`:
      return {
        facebook: true,
        loading: true,
        signin_date: Date.now(),
      };
    case `${ACTION_SIGNIN_FACEBOOK}_${FULFILLED}`:
      user = userSelector(payload);
      updateRavenUserContext(user);
      return {
        ...user,
        signin_date: Date.now(),
        facebook: true,
      };
    case `${ACTION_SIGNIN_FACEBOOK}_${REJECTED}`:
      return {
        error: payload,
        signin_date: Date.now(),
        facebook: true,
      };
    case `${ACTION_SIGNIN}_${PENDING}`:
      return {
        loading: true,
        signin_date: Date.now(),
      };
    case `${ACTION_SIGNIN}_${FULFILLED}`:
      user = userSelector(payload);
      updateRavenUserContext(user);
      return {
        ...user,
        signin_date: Date.now(),
      };
    case `${ACTION_SIGNIN}_${REJECTED}`:
      console.log(action);
      return {
        error: payload,
        signin_date: Date.now(),
      };
    case `${ACTION_SIGNUP}_${FULFILLED}`:
      user = userSelector(payload);
      updateRavenUserContext(user);
      return {
        ...user,
        signup_date: Date.now(),
        signupLoading: false,
      };
    case `${ACTION_SIGNUP}_${REJECTED}`:
      return {
        error,
        signup_date: Date.now(),
        signupLoading: false,
      };
    case `${ACTION_SIGNUP}_${PENDING}`:
      return {
        signupLoading: true,
        signup_date: Date.now(),
      };
  }

  return state;
};
