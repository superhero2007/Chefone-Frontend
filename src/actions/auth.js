// @flow
import { getLocation } from '../selectors';
import { push, replace } from 'react-router-redux';
import { auth } from '../server/api';
const { facebookLogin, userSignUp, userSignIn, requestPasswordReset } = auth;
import { promiseDispatch } from '../utils';
import { _User } from '../parseApi/api';
import { close as closeModal } from '../redux/modules/modals';

import { clear as clearInvitingUser } from '../redux/modules/invitingUser';
import { notifySuccess } from './';

export const ACTION_SIGNOUT = 'SIGNOUT';
export const ACTION_SIGNIN_FACEBOOK = 'SIGNIN_FACEBOOK';
export const ACTION_SIGNIN = 'SIGNIN';
export const ACTION_SIGNUP = 'SIGNUP';
// const PENDING = 'LOAD'
const FULFILLED = 'LOAD_SUCCESS';
// const REJECTED = 'LOAD_FAIL'
export const ACTION_RESET_PASSWORD = 'RESET_PASSWORD';
import type { GetState } from '../redux/type';
import { fb, g } from '../utils/analytics';

export const signout = () => (dispatch: Function) => {
  Parse.User.logOut();
  dispatch(push('/'));
  dispatch({ type: ACTION_SIGNOUT });
};

const signinRedirect = () => (dispatch: Function, getState: GetState) => {
  const { state } = getLocation(getState());

  if (state && state.proceedTo) {
    dispatch(replace(state.proceedTo));
  } else {
    dispatch(replace('/'));
  }
};

const signUpRedirect = () => (dispatch: Function, getState: GetState) => {
  const { state } = getLocation(getState());

  dispatch(clearInvitingUser());

  if (state && state.proceedTo) {
    dispatch(replace(state.proceedTo));
  } else {
    dispatch(
      push({
        pathname: '/confirm',
      }),
    );
  }
};

export const signupMailchimp = (res: *) =>
  promiseDispatch('SIGNUP_MAILCHIMP', async (dispatch: Function) => {
    const response = await fetch('/signUpMailchip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(res),
    });
    const jsonRes = await response.json();

    if (jsonRes.status !== 'pending') {
      throw Error(jsonRes.title);
    }

    dispatch(closeModal());
    dispatch(
      notifySuccess(
        `Hoooray! Deine Teilnahme am Gewinnspiel ist fast vollendet! Du kriegst gleich noch eine E-Mail von uns, in der du deine Teilnahme ein letztes Mal bestätigen musst. Danke! ${
          res.email
        }`,
      ),
    );
    return jsonRes;
  });
export const signinFacebook = (signUpParams: *) =>
  promiseDispatch('SIGNIN_FACEBOOK_AUTH', async (dispatch: Function) => {
    console.log(signUpParams);
    await dispatch(
      promiseDispatch(
        ACTION_SIGNIN_FACEBOOK,
        async () => await facebookLogin(signUpParams),
      ),
    );
    await dispatch(updateSession());
    dispatch(signinRedirect());
  });
export const updateSession = () =>
  promiseDispatch(
    'UPDATE_SESSION_AUTH',
    async (dispatch: Function, getState: GetState) => {
      const { session: user } = getState();
      if (!user || !user.id) {
        return;
      }
      const { value: updatedUserInfo } = await dispatch(
        promiseDispatch('UPDATE_USER_INFO', async () => {
          return await _User.GetById(user.id);
        }),
      );
      if (!updatedUserInfo) {
        throw Error('Can not found user!');
      }
      dispatch({
        type: `${ACTION_SIGNIN}_${FULFILLED}`,
        payload: updatedUserInfo,
      });
    },
  );
export const signin = (signInParams: *) =>
  promiseDispatch('SIGNIN_AUTH', async (dispatch: Function) => {
    await dispatch(
      promiseDispatch(ACTION_SIGNIN, () => userSignIn(signInParams)),
    );
    await dispatch(updateSession());
    dispatch(signinRedirect());
  });

const delay = sec => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), sec);
  });
};

export const resetPassword = (email: *) =>
  promiseDispatch('RESET_PASSWORD_AUTH', async (dispatch: Function) => {
    await dispatch(
      promiseDispatch(ACTION_RESET_PASSWORD, requestPasswordReset(email)),
    );

    dispatch(push('/auth/success'));

    await delay(3000);

    dispatch(push('/signin'));
  });
export const signup = (signUpParams: *) =>
  promiseDispatch('SIGNUP_WRAPPER_AUTH', async (dispatch: Function) => {
    console.log(signUpParams);
    await dispatch(
      promiseDispatch(ACTION_SIGNUP, () => userSignUp(signUpParams)),
    );
    g('Lead');
    fb('Lead');
    await dispatch(updateSession());
    dispatch(signUpRedirect());
  });
