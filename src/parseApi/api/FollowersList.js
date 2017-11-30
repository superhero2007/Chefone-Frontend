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
  ParseTypeNameChef,
  MaybeChef,
  ParseChef_Pointer,
  ParseChef_Fetch,
  ParseChef_Query
} from './Chef';

import type {
  ParseTypeName_User,
  Maybe_User,
  Parse_User_Pointer,
  Parse_User_Fetch,
  Parse_User_Query
} from './_User';

const myType: ParseClassName = 'FollowersList';
export type ParseTypeNameFollowersList = 'FollowersList';

export type FieldType_createdAt = Date;
export type FieldType_objectId = string;
export type FieldType_objectIdChef_Fetch = ParseChef_Fetch;
export type FieldType_objectIdChef_Maybe = ParseChef_Pointer | ParseChef_Fetch;
export type FieldType_objectIdChef_Pointer = ParseChef_Pointer;
export type FieldType_objectIdChef_Query = ParseChef_Query;
export type FieldType_objectIdUser_Fetch = Parse_User_Fetch;
export type FieldType_objectIdUser_Maybe =
  | Parse_User_Pointer
  | Parse_User_Fetch;
export type FieldType_objectIdUser_Pointer = Parse_User_Pointer;
export type FieldType_objectIdUser_Query = Parse_User_Query;
export type FieldType_updatedAt = Date;

export type FollowersList_Query = {|
  createdAt?: FieldType_createdAt,
  objectId?: FieldType_objectId,
  objectIdChef?: FieldType_objectIdChef_Pointer,
  objectIdUser?: FieldType_objectIdUser_Pointer,
  updatedAt?: FieldType_updatedAt
|};

export type FollowersList_Fetch = {|
  createdAt: FieldType_createdAt,
  objectId: FieldType_objectId,
  objectIdChef: FieldType_objectIdChef_Maybe,
  objectIdUser: FieldType_objectIdUser_Maybe,
  updatedAt: FieldType_updatedAt,
  __type: 'Object'
|};

export type ParseFollowersList_Fetch = FollowersList_Fetch;
export type ParseFollowersListInstance = FollowersList_Fetch;
export type ParseFollowersList_Query = FollowersList_Query;
export type ParseFollowersList_Pointer = ParsePointer<ParseTypeNameFollowersList>;
export type ParseFollowersListPointer = ParseFollowersList_Pointer;
type MyInstanceType = FollowersList_Fetch;
type MyPointerType = ParseFollowersList_Pointer;
export type MaybeFollowersList = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeFollowersList;

type MyParseType = FollowersList_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('FollowersList not fetched');
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
  createdAt: (value: FieldType_createdAt) => ({
    fieldName: 'createdAt',
    value
  }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  objectIdChef: (value: FieldType_objectIdChef_Pointer) => ({
    fieldName: 'objectIdChef',
    value
  }),
  objectIdUser: (value: FieldType_objectIdUser_Pointer) => ({
    fieldName: 'objectIdUser',
    value
  }),
  updatedAt: (value: FieldType_updatedAt) => ({ fieldName: 'updatedAt', value })
};

export const GetById = async (id: string): Promise<MyInstanceType> => {
  const res = await getParseObjects(myType, 'find', {
    equalTo: [{ fieldName: 'objectId', value: id }]
  });
  const [result] = postProcessGet(res);
  const finalRes = { ...result, id, __type: 'Object' };

  return ((finalRes: any): MyInstanceType);
};
