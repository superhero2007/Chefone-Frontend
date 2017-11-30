// @flow

import { _User } from '../../parseApi/api';
import { ParseFile } from '../../parseApi/src/runtime';
import type { Type as NutritionT } from '../../constants/Nutrition';
import { toDbNutrition } from '../../constants/Nutrition';

export const getAvatar = async (userId: string) => {
  const users = await _User.Get({
    equalTo: [_User.Field.objectId(userId)],
    limit: 1,
    select: ['avatar'],
  });

  if (!users.length) {
    return null;
  }

  const [{ avatar }] = users;

  return avatar && avatar.url;
};

export const confirmUser = async ({ token }: { token: string }) => {
  const response = await fetch(`/api-mail/email/confirm/${token}`);

  const result = await response.text();

  console.log(result);

  if ('Thank you for activation your account. You can now log in.' !== result) {
    throw Error(result);
  }

  return result;
};

export type SecondaryDataT = {
  nutrition?: NutritionT,
  avatar?: string,
  bio?: string,
  location?: string,
  birthday?: Date,
};

export const setSecondaryUserData = async ({
  nutrition,
  avatar,
  bio,
  location,
  birthday,
}: SecondaryDataT) => {
  const objectId = Parse.User.current().id;

  const avatarNew =
    avatar && avatar.base64 ? ParseFile('avatar.jpg', avatar) : undefined;
  return await _User.Set({
    objectId,
    nutrition: nutrition !== undefined ? toDbNutrition(nutrition) : undefined,
    bio,
    location,
    birthday,
    avatar: avatarNew,
  });
};

// EXAMPLE {"userId":"userId","phone":"phoneNumber"}
export const updateUserPhone = async ({
  userId,
  phone,
}: {
  userId: string,
  phone: number,
}): Promise<string> => {
  return await _User.Set({
    objectId: userId,
    phone,
  });
};
