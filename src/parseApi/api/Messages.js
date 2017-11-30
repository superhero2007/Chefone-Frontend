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
  ParseTypeNameCurrencies,
  MaybeCurrencies,
  ParseCurrencies_Pointer,
  ParseCurrencies_Fetch,
  ParseCurrencies_Query
} from './Currencies';

import type {
  ParseTypeNameOrder,
  MaybeOrder,
  ParseOrder_Pointer,
  ParseOrder_Fetch,
  ParseOrder_Query
} from './Order';

import type {
  ParseTypeName_User,
  Maybe_User,
  Parse_User_Pointer,
  Parse_User_Fetch,
  Parse_User_Query
} from './_User';

const myType: ParseClassName = 'Messages';
export type ParseTypeNameMessages = 'Messages';

export type FieldType_chef_Fetch = ParseChef_Fetch;
export type FieldType_chef_Maybe = ParseChef_Pointer | ParseChef_Fetch;
export type FieldType_chef_Pointer = ParseChef_Pointer;
export type FieldType_chef_Query = ParseChef_Query;
export type FieldType_createdAt = Date;
export type FieldType_currency_Fetch = ParseCurrencies_Fetch;
export type FieldType_currency_Maybe =
  | ParseCurrencies_Pointer
  | ParseCurrencies_Fetch;
export type FieldType_currency_Pointer = ParseCurrencies_Pointer;
export type FieldType_currency_Query = ParseCurrencies_Query;
export type FieldType_isNew = boolean;
export type FieldType_msgSeen = boolean;
export type FieldType_objectId = string;
export type FieldType_order_Fetch = ParseOrder_Fetch;
export type FieldType_order_Maybe = ParseOrder_Pointer | ParseOrder_Fetch;
export type FieldType_order_Pointer = ParseOrder_Pointer;
export type FieldType_order_Query = ParseOrder_Query;
export type FieldType_price = number;
export type FieldType_textMessage = string;
export type FieldType_updatedAt = Date;
export type FieldType_user_Fetch = Parse_User_Fetch;
export type FieldType_user_Maybe = Parse_User_Pointer | Parse_User_Fetch;
export type FieldType_user_Pointer = Parse_User_Pointer;
export type FieldType_user_Query = Parse_User_Query;

export type Messages_Query = {|
  chef?: FieldType_chef_Pointer,
  createdAt?: FieldType_createdAt,
  currency?: FieldType_currency_Pointer,
  isNew?: FieldType_isNew,
  msgSeen?: FieldType_msgSeen,
  objectId?: FieldType_objectId,
  order?: FieldType_order_Pointer,
  price?: FieldType_price,
  textMessage?: FieldType_textMessage,
  updatedAt?: FieldType_updatedAt,
  user?: FieldType_user_Pointer
|};

export type Messages_Fetch = {|
  chef: FieldType_chef_Maybe,
  createdAt: FieldType_createdAt,
  currency: FieldType_currency_Maybe,
  isNew: FieldType_isNew,
  msgSeen: FieldType_msgSeen,
  objectId: FieldType_objectId,
  order: FieldType_order_Maybe,
  price: FieldType_price,
  textMessage: FieldType_textMessage,
  updatedAt: FieldType_updatedAt,
  user: FieldType_user_Maybe,
  __type: 'Object'
|};

export type ParseMessages_Fetch = Messages_Fetch;
export type ParseMessagesInstance = Messages_Fetch;
export type ParseMessages_Query = Messages_Query;
export type ParseMessages_Pointer = ParsePointer<ParseTypeNameMessages>;
export type ParseMessagesPointer = ParseMessages_Pointer;
type MyInstanceType = Messages_Fetch;
type MyPointerType = ParseMessages_Pointer;
export type MaybeMessages = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeMessages;

type MyParseType = Messages_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Messages not fetched');
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
  chef: (value: FieldType_chef_Pointer) => ({ fieldName: 'chef', value }),
  createdAt: (value: FieldType_createdAt) => ({
    fieldName: 'createdAt',
    value
  }),
  currency: (value: FieldType_currency_Pointer) => ({
    fieldName: 'currency',
    value
  }),
  isNew: (value: FieldType_isNew) => ({ fieldName: 'isNew', value }),
  msgSeen: (value: FieldType_msgSeen) => ({ fieldName: 'msgSeen', value }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  order: (value: FieldType_order_Pointer) => ({ fieldName: 'order', value }),
  price: (value: FieldType_price) => ({ fieldName: 'price', value }),
  textMessage: (value: FieldType_textMessage) => ({
    fieldName: 'textMessage',
    value
  }),
  updatedAt: (value: FieldType_updatedAt) => ({
    fieldName: 'updatedAt',
    value
  }),
  user: (value: FieldType_user_Pointer) => ({ fieldName: 'user', value })
};

export const GetById = async (id: string): Promise<MyInstanceType> => {
  const res = await getParseObjects(myType, 'find', {
    equalTo: [{ fieldName: 'objectId', value: id }]
  });
  const [result] = postProcessGet(res);
  const finalRes = { ...result, id, __type: 'Object' };

  return ((finalRes: any): MyInstanceType);
};
