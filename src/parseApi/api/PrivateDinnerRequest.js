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
  ParseTypeNameEvent,
  MaybeEvent,
  ParseEvent_Pointer,
  ParseEvent_Fetch,
  ParseEvent_Query
} from './Event';

import type {
  ParseTypeName_User,
  Maybe_User,
  Parse_User_Pointer,
  Parse_User_Fetch,
  Parse_User_Query
} from './_User';

const myType: ParseClassName = 'PrivateDinnerRequest';
export type ParseTypeNamePrivateDinnerRequest = 'PrivateDinnerRequest';

export type FieldType_createdAt = Date;
export type FieldType_finalPrice = number;
export type FieldType_guests = number;
export type FieldType_objectId = string;
export type FieldType_objectIdEvent_Fetch = ParseEvent_Fetch;
export type FieldType_objectIdEvent_Maybe =
  | ParseEvent_Pointer
  | ParseEvent_Fetch;
export type FieldType_objectIdEvent_Pointer = ParseEvent_Pointer;
export type FieldType_objectIdEvent_Query = ParseEvent_Query;
export type FieldType_objectIdUser_Fetch = Parse_User_Fetch;
export type FieldType_objectIdUser_Maybe =
  | Parse_User_Pointer
  | Parse_User_Fetch;
export type FieldType_objectIdUser_Pointer = Parse_User_Pointer;
export type FieldType_objectIdUser_Query = Parse_User_Query;
export type FieldType_price = number;
export type FieldType_privateDinnerDate = Date;
export type FieldType_updatedAt = Date;
export type FieldType_userMessage = string;

export type PrivateDinnerRequest_Query = {|
  createdAt?: FieldType_createdAt,
  finalPrice?: FieldType_finalPrice,
  guests?: FieldType_guests,
  objectId?: FieldType_objectId,
  objectIdEvent?: FieldType_objectIdEvent_Pointer,
  objectIdUser?: FieldType_objectIdUser_Pointer,
  price?: FieldType_price,
  privateDinnerDate?: FieldType_privateDinnerDate,
  updatedAt?: FieldType_updatedAt,
  userMessage?: FieldType_userMessage
|};

export type PrivateDinnerRequest_Fetch = {|
  createdAt: FieldType_createdAt,
  finalPrice: FieldType_finalPrice,
  guests: FieldType_guests,
  objectId: FieldType_objectId,
  objectIdEvent: FieldType_objectIdEvent_Maybe,
  objectIdUser: FieldType_objectIdUser_Maybe,
  price: FieldType_price,
  privateDinnerDate: FieldType_privateDinnerDate,
  updatedAt: FieldType_updatedAt,
  userMessage: FieldType_userMessage,
  __type: 'Object'
|};

export type ParsePrivateDinnerRequest_Fetch = PrivateDinnerRequest_Fetch;
export type ParsePrivateDinnerRequestInstance = PrivateDinnerRequest_Fetch;
export type ParsePrivateDinnerRequest_Query = PrivateDinnerRequest_Query;
export type ParsePrivateDinnerRequest_Pointer = ParsePointer<ParseTypeNamePrivateDinnerRequest>;
export type ParsePrivateDinnerRequestPointer = ParsePrivateDinnerRequest_Pointer;
type MyInstanceType = PrivateDinnerRequest_Fetch;
type MyPointerType = ParsePrivateDinnerRequest_Pointer;
export type MaybePrivateDinnerRequest = MyInstanceType | MyPointerType;
type MyMaybeType = MaybePrivateDinnerRequest;

type MyParseType = PrivateDinnerRequest_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('PrivateDinnerRequest not fetched');
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
  finalPrice: (value: FieldType_finalPrice) => ({
    fieldName: 'finalPrice',
    value
  }),
  guests: (value: FieldType_guests) => ({ fieldName: 'guests', value }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  objectIdEvent: (value: FieldType_objectIdEvent_Pointer) => ({
    fieldName: 'objectIdEvent',
    value
  }),
  objectIdUser: (value: FieldType_objectIdUser_Pointer) => ({
    fieldName: 'objectIdUser',
    value
  }),
  price: (value: FieldType_price) => ({ fieldName: 'price', value }),
  privateDinnerDate: (value: FieldType_privateDinnerDate) => ({
    fieldName: 'privateDinnerDate',
    value
  }),
  updatedAt: (value: FieldType_updatedAt) => ({
    fieldName: 'updatedAt',
    value
  }),
  userMessage: (value: FieldType_userMessage) => ({
    fieldName: 'userMessage',
    value
  })
};

export const GetById = async (id: string): Promise<MyInstanceType> => {
  const res = await getParseObjects(myType, 'find', {
    equalTo: [{ fieldName: 'objectId', value: id }]
  });
  const [result] = postProcessGet(res);
  const finalRes = { ...result, id, __type: 'Object' };

  return ((finalRes: any): MyInstanceType);
};
