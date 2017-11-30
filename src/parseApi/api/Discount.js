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
  ParseTypeNameCurrencies,
  MaybeCurrencies,
  ParseCurrencies_Pointer,
  ParseCurrencies_Fetch,
  ParseCurrencies_Query
} from './Currencies';

import type {
  ParseTypeName_User,
  Maybe_User,
  Parse_User_Pointer,
  Parse_User_Fetch,
  Parse_User_Query
} from './_User';

const myType: ParseClassName = 'Discount';
export type ParseTypeNameDiscount = 'Discount';

export type FieldType_cash = number;
export type FieldType_code = string;
export type FieldType_createdAt = Date;
export type FieldType_currency_Fetch = ParseCurrencies_Fetch;
export type FieldType_currency_Maybe =
  | ParseCurrencies_Pointer
  | ParseCurrencies_Fetch;
export type FieldType_currency_Pointer = ParseCurrencies_Pointer;
export type FieldType_currency_Query = ParseCurrencies_Query;
export type FieldType_invitedUser_Fetch = Parse_User_Fetch;
export type FieldType_invitedUser_Maybe = Parse_User_Pointer | Parse_User_Fetch;
export type FieldType_invitedUser_Pointer = Parse_User_Pointer;
export type FieldType_invitedUser_Query = Parse_User_Query;
export type FieldType_inviteType = string;
export type FieldType_invitingUser_Fetch = Parse_User_Fetch;
export type FieldType_invitingUser_Maybe =
  | Parse_User_Pointer
  | Parse_User_Fetch;
export type FieldType_invitingUser_Pointer = Parse_User_Pointer;
export type FieldType_invitingUser_Query = Parse_User_Query;
export type FieldType_objectId = string;
export type FieldType_percentage = number;
export type FieldType_updatedAt = Date;
export type FieldType_usageCount = number;
export type FieldType_usageExpire = Date;
export type FieldType_usageMax = number;

export type Discount_Query = {|
  cash?: FieldType_cash,
  code?: FieldType_code,
  createdAt?: FieldType_createdAt,
  currency?: FieldType_currency_Pointer,
  invitedUser?: FieldType_invitedUser_Pointer,
  inviteType?: FieldType_inviteType,
  invitingUser?: FieldType_invitingUser_Pointer,
  objectId?: FieldType_objectId,
  percentage?: FieldType_percentage,
  updatedAt?: FieldType_updatedAt,
  usageCount?: FieldType_usageCount,
  usageExpire?: FieldType_usageExpire,
  usageMax?: FieldType_usageMax
|};

export type Discount_Fetch = {|
  cash: FieldType_cash,
  code: FieldType_code,
  createdAt: FieldType_createdAt,
  currency: FieldType_currency_Maybe,
  invitedUser: FieldType_invitedUser_Maybe,
  inviteType: FieldType_inviteType,
  invitingUser: FieldType_invitingUser_Maybe,
  objectId: FieldType_objectId,
  percentage: FieldType_percentage,
  updatedAt: FieldType_updatedAt,
  usageCount: FieldType_usageCount,
  usageExpire: FieldType_usageExpire,
  usageMax: FieldType_usageMax,
  __type: 'Object'
|};

export type ParseDiscount_Fetch = Discount_Fetch;
export type ParseDiscountInstance = Discount_Fetch;
export type ParseDiscount_Query = Discount_Query;
export type ParseDiscount_Pointer = ParsePointer<ParseTypeNameDiscount>;
export type ParseDiscountPointer = ParseDiscount_Pointer;
type MyInstanceType = Discount_Fetch;
type MyPointerType = ParseDiscount_Pointer;
export type MaybeDiscount = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeDiscount;

type MyParseType = Discount_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Discount not fetched');
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
  cash: (value: FieldType_cash) => ({ fieldName: 'cash', value }),
  code: (value: FieldType_code) => ({ fieldName: 'code', value }),
  createdAt: (value: FieldType_createdAt) => ({
    fieldName: 'createdAt',
    value
  }),
  currency: (value: FieldType_currency_Pointer) => ({
    fieldName: 'currency',
    value
  }),
  invitedUser: (value: FieldType_invitedUser_Pointer) => ({
    fieldName: 'invitedUser',
    value
  }),
  inviteType: (value: FieldType_inviteType) => ({
    fieldName: 'inviteType',
    value
  }),
  invitingUser: (value: FieldType_invitingUser_Pointer) => ({
    fieldName: 'invitingUser',
    value
  }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  percentage: (value: FieldType_percentage) => ({
    fieldName: 'percentage',
    value
  }),
  updatedAt: (value: FieldType_updatedAt) => ({
    fieldName: 'updatedAt',
    value
  }),
  usageCount: (value: FieldType_usageCount) => ({
    fieldName: 'usageCount',
    value
  }),
  usageExpire: (value: FieldType_usageExpire) => ({
    fieldName: 'usageExpire',
    value
  }),
  usageMax: (value: FieldType_usageMax) => ({ fieldName: 'usageMax', value })
};

export const GetById = async (id: string): Promise<MyInstanceType> => {
  const res = await getParseObjects(myType, 'find', {
    equalTo: [{ fieldName: 'objectId', value: id }]
  });
  const [result] = postProcessGet(res);
  const finalRes = { ...result, id, __type: 'Object' };

  return ((finalRes: any): MyInstanceType);
};
