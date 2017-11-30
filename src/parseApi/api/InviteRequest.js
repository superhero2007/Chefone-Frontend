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
  ParseTypeName_User,
  Maybe_User,
  Parse_User_Pointer,
  Parse_User_Fetch,
  Parse_User_Query
} from './_User';

const myType: ParseClassName = 'InviteRequest';
export type ParseTypeNameInviteRequest = 'InviteRequest';

export type FieldType_createdAt = Date;
export type FieldType_objectId = string;
export type FieldType_objectIdUser_Fetch = Parse_User_Fetch;
export type FieldType_objectIdUser_Maybe =
  | Parse_User_Pointer
  | Parse_User_Fetch;
export type FieldType_objectIdUser_Pointer = Parse_User_Pointer;
export type FieldType_objectIdUser_Query = Parse_User_Query;
export type FieldType_updatedAt = Date;
export type FieldType_userMsg = string;

export type InviteRequest_Query = {|
  createdAt?: FieldType_createdAt,
  objectId?: FieldType_objectId,
  objectIdUser?: FieldType_objectIdUser_Pointer,
  updatedAt?: FieldType_updatedAt,
  userMsg?: FieldType_userMsg
|};

export type InviteRequest_Fetch = {|
  createdAt: FieldType_createdAt,
  objectId: FieldType_objectId,
  objectIdUser: FieldType_objectIdUser_Maybe,
  updatedAt: FieldType_updatedAt,
  userMsg: FieldType_userMsg,
  __type: 'Object'
|};

export type ParseInviteRequest_Fetch = InviteRequest_Fetch;
export type ParseInviteRequestInstance = InviteRequest_Fetch;
export type ParseInviteRequest_Query = InviteRequest_Query;
export type ParseInviteRequest_Pointer = ParsePointer<ParseTypeNameInviteRequest>;
export type ParseInviteRequestPointer = ParseInviteRequest_Pointer;
type MyInstanceType = InviteRequest_Fetch;
type MyPointerType = ParseInviteRequest_Pointer;
export type MaybeInviteRequest = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeInviteRequest;

type MyParseType = InviteRequest_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('InviteRequest not fetched');
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
  objectIdUser: (value: FieldType_objectIdUser_Pointer) => ({
    fieldName: 'objectIdUser',
    value
  }),
  updatedAt: (value: FieldType_updatedAt) => ({
    fieldName: 'updatedAt',
    value
  }),
  userMsg: (value: FieldType_userMsg) => ({ fieldName: 'userMsg', value })
};

export const GetById = async (id: string): Promise<MyInstanceType> => {
  const res = await getParseObjects(myType, 'find', {
    equalTo: [{ fieldName: 'objectId', value: id }]
  });
  const [result] = postProcessGet(res);
  const finalRes = { ...result, id, __type: 'Object' };

  return ((finalRes: any): MyInstanceType);
};
