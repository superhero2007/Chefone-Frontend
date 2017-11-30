// @flow
import R from 'ramda';
import {
  getParseObjects,
  getParseObjectsMultiple,
  postProcessGet,
  createParseObject,
  updateParseObject,
  deleteParseObject
} from '../src/runtime';
import type {
  ParseQueryType,
  ParseFileTypeOut,
  ParseFileTypeIn,
  ParseGeoPointType,
  ParsePointer,
  ParseInstance
} from '../src/runtime';
import type { ParseClassName } from './shared';

import type {
  ParseTypeNameCities,
  MaybeCities,
  ParseCities_Pointer,
  ParseCities_Fetch,
  ParseCities_Query
} from './Cities';


const myType: ParseClassName = '_User';
export type ParseTypeName_User = '_User';

export type FieldType_activationToken = string;
export type FieldType_active = boolean;
export type FieldType_adminRole = boolean;
export type FieldType_authData = Object;
export type FieldType_avatar_FileIn = ParseFileTypeIn;
export type FieldType_avatar_FileOut = ParseFileTypeOut;
export type FieldType_bio = string;
export type FieldType_birthday = Date;
export type FieldType_city_Fetch = ParseCities_Fetch;
export type FieldType_city_Maybe = ParseCities_Pointer | ParseCities_Fetch;
export type FieldType_city_Pointer = ParseCities_Pointer;
export type FieldType_city_Query = ParseCities_Query;
export type FieldType_createdAt = Date;
export type FieldType_duplicate = string;
export type FieldType_email = string;
export type FieldType_emailConfirmed = boolean;
export type FieldType_emailVerified = boolean;
export type FieldType_fb_email = string;
export type FieldType_firstName = string;
export type FieldType_geoPoint = ParseGeoPointType;
export type FieldType_invitingUserId_Fetch = Parse_User_Fetch;
export type FieldType_invitingUserId_Maybe =
  | Parse_User_Pointer
  | Parse_User_Fetch;
export type FieldType_invitingUserId_Pointer = Parse_User_Pointer;
export type FieldType_invitingUserId_Query = Parse_User_Query;
export type FieldType_isChef = boolean;
export type FieldType_lastName = string;
export type FieldType_location = string;
export type FieldType_nutrition = number;
export type FieldType_objectId = string;
export type FieldType_orderedAnything = boolean;
export type FieldType_password = string;
export type FieldType_phone = number;
export type FieldType_syncedWithMailchimp = boolean;
export type FieldType_touched = string;
export type FieldType_updatedAt = Date;
export type FieldType_username = string;

export type _User_Query = {|
  activationToken?: FieldType_activationToken,
  active?: FieldType_active,
  adminRole?: FieldType_adminRole,
  authData?: FieldType_authData,
  avatar?: FieldType_avatar_FileIn,
  bio?: FieldType_bio,
  birthday?: FieldType_birthday,
  city?: FieldType_city_Pointer,
  createdAt?: FieldType_createdAt,
  duplicate?: FieldType_duplicate,
  email?: FieldType_email,
  emailConfirmed?: FieldType_emailConfirmed,
  emailVerified?: FieldType_emailVerified,
  fb_email?: FieldType_fb_email,
  firstName?: FieldType_firstName,
  geoPoint?: FieldType_geoPoint,
  invitingUserId?: FieldType_invitingUserId_Pointer,
  isChef?: FieldType_isChef,
  lastName?: FieldType_lastName,
  location?: FieldType_location,
  nutrition?: FieldType_nutrition,
  objectId?: FieldType_objectId,
  orderedAnything?: FieldType_orderedAnything,
  password?: FieldType_password,
  phone?: FieldType_phone,
  syncedWithMailchimp?: FieldType_syncedWithMailchimp,
  touched?: FieldType_touched,
  updatedAt?: FieldType_updatedAt,
  username?: FieldType_username
|};

export type _User_Fetch = {|
  activationToken: FieldType_activationToken,
  active: FieldType_active,
  adminRole: FieldType_adminRole,
  authData: FieldType_authData,
  avatar: FieldType_avatar_FileOut,
  bio: FieldType_bio,
  birthday: FieldType_birthday,
  city: FieldType_city_Maybe,
  createdAt: FieldType_createdAt,
  duplicate: FieldType_duplicate,
  email: FieldType_email,
  emailConfirmed: FieldType_emailConfirmed,
  emailVerified: FieldType_emailVerified,
  fb_email: FieldType_fb_email,
  firstName: FieldType_firstName,
  geoPoint: FieldType_geoPoint,
  invitingUserId: FieldType_invitingUserId_Maybe,
  isChef: FieldType_isChef,
  lastName: FieldType_lastName,
  location: FieldType_location,
  nutrition: FieldType_nutrition,
  objectId: FieldType_objectId,
  orderedAnything: FieldType_orderedAnything,
  password: FieldType_password,
  phone: FieldType_phone,
  syncedWithMailchimp: FieldType_syncedWithMailchimp,
  touched: FieldType_touched,
  updatedAt: FieldType_updatedAt,
  username: FieldType_username,
  __type: 'Object'
|};

export type Parse_User_Fetch = _User_Fetch;
export type Parse_UserInstance = _User_Fetch;
export type Parse_User_Query = _User_Query;
export type Parse_User_Pointer = ParsePointer<ParseTypeName_User>;
export type Parse_UserPointer = Parse_User_Pointer;
type MyInstanceType = _User_Fetch;
type MyPointerType = Parse_User_Pointer;
export type Maybe_User = MyInstanceType | MyPointerType;
type MyMaybeType = Maybe_User;

type MyParseType = _User_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('_User not fetched');
  }
  return obj;
};

export const Create = async (obj: MyParseType): Promise<string> => {
  return await createParseObject(myType, obj);
};

export const Delete = async (id: string): Promise<*> => {
  return deleteParseObject(myType, id);
};

export const Set = async (obj: MyParseType): Promise<string> => {
  return await updateParseObject(myType, obj);
};

export const setOrCreate = async (obj: MyParseType) => {
  const objectId = obj.objectId;
  if (objectId) {
    return await Set(obj);
  }

  return await Create(obj);
};

export const Get = async (
  queryParams: MyQueryType
): Promise<Array<MyInstanceType>> => {
  const res = await getParseObjects(myType, 'find', queryParams);
  return postProcessGet(res);
};

export const Or = async (
  arrayOfQueryParams: Array<MyQueryType>,
  selfQueryParams: MyQueryType
): Promise<Array<MyInstanceType>> => {
  const res = await getParseObjectsMultiple(
    myType,
    'find',
    arrayOfQueryParams,
    selfQueryParams
  );
  return postProcessGet(res);
};

export const Count = async (queryParams: MyQueryType): Promise<number> => {
  const [res] = await getParseObjects(myType, 'count', queryParams);
  return res;
};

export const Pointer = (id: string): MyPointerType => {
  const ObjectToCreate = Parse.Object.extend(myType);
  const res = new ObjectToCreate();
  res.id = id;
  res.className = myType;
  return res;
};

export const Field = {
  activationToken: (value: FieldType_activationToken) => ({
    fieldName: 'activationToken',
    value
  }),
  active: (value: FieldType_active) => ({ fieldName: 'active', value }),
  adminRole: (value: FieldType_adminRole) => ({
    fieldName: 'adminRole',
    value
  }),
  authData: (value: FieldType_authData) => ({ fieldName: 'authData', value }),
  avatar: (value: FieldType_avatar_FileIn) => ({ fieldName: 'avatar', value }),
  bio: (value: FieldType_bio) => ({ fieldName: 'bio', value }),
  birthday: (value: FieldType_birthday) => ({ fieldName: 'birthday', value }),
  city: (value: FieldType_city_Pointer) => ({ fieldName: 'city', value }),
  createdAt: (value: FieldType_createdAt) => ({
    fieldName: 'createdAt',
    value
  }),
  duplicate: (value: FieldType_duplicate) => ({
    fieldName: 'duplicate',
    value
  }),
  email: (value: FieldType_email) => ({ fieldName: 'email', value }),
  emailConfirmed: (value: FieldType_emailConfirmed) => ({
    fieldName: 'emailConfirmed',
    value
  }),
  emailVerified: (value: FieldType_emailVerified) => ({
    fieldName: 'emailVerified',
    value
  }),
  fb_email: (value: FieldType_fb_email) => ({ fieldName: 'fb_email', value }),
  firstName: (value: FieldType_firstName) => ({
    fieldName: 'firstName',
    value
  }),
  geoPoint: (value: FieldType_geoPoint) => ({ fieldName: 'geoPoint', value }),
  invitingUserId: (value: FieldType_invitingUserId_Pointer) => ({
    fieldName: 'invitingUserId',
    value
  }),
  isChef: (value: FieldType_isChef) => ({ fieldName: 'isChef', value }),
  lastName: (value: FieldType_lastName) => ({ fieldName: 'lastName', value }),
  location: (value: FieldType_location) => ({ fieldName: 'location', value }),
  nutrition: (value: FieldType_nutrition) => ({
    fieldName: 'nutrition',
    value
  }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  orderedAnything: (value: FieldType_orderedAnything) => ({
    fieldName: 'orderedAnything',
    value
  }),
  password: (value: FieldType_password) => ({ fieldName: 'password', value }),
  phone: (value: FieldType_phone) => ({ fieldName: 'phone', value }),
  syncedWithMailchimp: (value: FieldType_syncedWithMailchimp) => ({
    fieldName: 'syncedWithMailchimp',
    value
  }),
  touched: (value: FieldType_touched) => ({ fieldName: 'touched', value }),
  updatedAt: (value: FieldType_updatedAt) => ({
    fieldName: 'updatedAt',
    value
  }),
  username: (value: FieldType_username) => ({ fieldName: 'username', value })
};

export const GetById = async (id: string): Promise<MyInstanceType> => {
  const res = await getParseObjects(myType, 'find', {
    equalTo: [{ fieldName: 'objectId', value: id }]
  });
  const [result] = postProcessGet(res);
  const finalRes = { ...result, id, __type: 'Object' };

  return ((finalRes: any): MyInstanceType);
};
