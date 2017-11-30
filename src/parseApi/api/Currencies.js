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

const myType: ParseClassName = 'Currencies';
export type ParseTypeNameCurrencies = 'Currencies';

export type FieldType_createdAt = Date;
export type FieldType_currency_number = number;
export type FieldType_name = string;
export type FieldType_objectId = string;
export type FieldType_symbol = string;
export type FieldType_updatedAt = Date;

export type Currencies_Query = {|
  createdAt?: FieldType_createdAt,
  currency_number?: FieldType_currency_number,
  name?: FieldType_name,
  objectId?: FieldType_objectId,
  symbol?: FieldType_symbol,
  updatedAt?: FieldType_updatedAt
|};

export type Currencies_Fetch = {|
  createdAt: FieldType_createdAt,
  currency_number: FieldType_currency_number,
  name: FieldType_name,
  objectId: FieldType_objectId,
  symbol: FieldType_symbol,
  updatedAt: FieldType_updatedAt,
  __type: 'Object'
|};

export type ParseCurrencies_Fetch = Currencies_Fetch;
export type ParseCurrenciesInstance = Currencies_Fetch;
export type ParseCurrencies_Query = Currencies_Query;
export type ParseCurrencies_Pointer = ParsePointer<ParseTypeNameCurrencies>;
export type ParseCurrenciesPointer = ParseCurrencies_Pointer;
type MyInstanceType = Currencies_Fetch;
type MyPointerType = ParseCurrencies_Pointer;
export type MaybeCurrencies = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeCurrencies;

type MyParseType = Currencies_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Currencies not fetched');
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
  currency_number: (value: FieldType_currency_number) => ({
    fieldName: 'currency_number',
    value
  }),
  name: (value: FieldType_name) => ({ fieldName: 'name', value }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  symbol: (value: FieldType_symbol) => ({ fieldName: 'symbol', value }),
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
