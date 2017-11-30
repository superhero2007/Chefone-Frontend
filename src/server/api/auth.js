// @flow

import { parsePromise, sendJsonPost } from './helpers';
import { _User } from '../../parseApi/api';

export const facebookLogin = async ({
  invitingUserId,
}: {
  invitingUserId?: string,
}) => {
  console.log(invitingUserId);
  console.time('fbLogin');
  console.time('Parse.FacebookUtils.logIn');
  let user = await parsePromise(
    Parse.FacebookUtils,
    Parse.FacebookUtils.logIn,
    ['email,user_birthday'],
  );
  if (!user.existed()) {
    console.log('new user');
    const { fb, g } = require('../../utils/analytics');
    g('Lead');
    fb('Lead');
  }

  const { authData: { facebook: { access_token, id } } } = user.toJSON();
  console.timeEnd('Parse.FacebookUtils.logIn');
  console.time('cloud, setupFBUser');
  const resUser = await sendJsonPost({
    url: '/cloud/setupFBUser',
    data: {
      objectId: user.id,
      facebook: { id, access_token },
      invitingUserId,
    },
  });
  console.log(resUser);
  const { result } = resUser;
  console.timeEnd('cloud, setupFBUser');

  console.timeEnd('fbLogin');
  return result;
};

export const userSignUp = ({
  invitingUserId,
  email,
  cityId,
  password,
  firstName,
  lastName,
}: {
  invitingUserId?: string,
  email: string,
  cityId: string,
  password: string,
  firstName: string,
  lastName: string,
}) => {
  if (firstName.length === 0 || lastName.length === 0) {
    throw Error('Can not register: please provide your first and last name');
  }

  const user = new Parse.User();
  user.set('email', email.toLowerCase());
  user.set('username', email.toLowerCase());
  user.set('password', password);
  user.set('firstName', firstName);
  user.set('lastName', lastName);
  const ObjectToCreate = Parse.Object.extend('Cities');
  const res = new ObjectToCreate();
  res.id = cityId;
  user.set('city', res);

  if (invitingUserId) {
    const ObjectToCreate = Parse.Object.extend('_User');
    const res = new ObjectToCreate();
    res.id = invitingUserId;
    user.set('invitingUserId', res);
  }

  return parsePromise(user, user.signUp, [null]);
};

export const userSignIn = async ({
  email,
  password,
}: {
  email: string,
  password: string,
}) => {
  const { id } = await parsePromise(Parse.User, Parse.User.logIn, [
    email.toLowerCase(),
    password,
  ]);

  return await _User.GetById(id);
};

export const requestPasswordReset = (email: string) => () =>
  parsePromise(Parse.User, Parse.User.requestPasswordReset, [email]);
