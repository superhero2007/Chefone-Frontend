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

const myType: ParseClassName = 'Address';
export type ParseTypeNameAddress = 'Address';

export type FieldType_city = string;
export type FieldType_createdAt = Date;
export type FieldType_objectId = string;
export type FieldType_objectIdUser_Fetch = Parse_User_Fetch;
export type FieldType_objectIdUser_Maybe =
  | Parse_User_Pointer
  | Parse_User_Fetch;
export type FieldType_objectIdUser_Pointer = Parse_User_Pointer;
export type FieldType_objectIdUser_Query = Parse_User_Query;
export type FieldType_street = string;
export type FieldType_updatedAt = Date;
export type FieldType_zipcode = number;

export type Address_Query = {|
  city?: FieldType_city,
  createdAt?: FieldType_createdAt,
  objectId?: FieldType_objectId,
  objectIdUser?: FieldType_objectIdUser_Pointer,
  street?: FieldType_street,
  updatedAt?: FieldType_updatedAt,
  zipcode?: FieldType_zipcode
|};

export type Address_Fetch = {|
  city: FieldType_city,
  createdAt: FieldType_createdAt,
  objectId: FieldType_objectId,
  objectIdUser: FieldType_objectIdUser_Maybe,
  street: FieldType_street,
  updatedAt: FieldType_updatedAt,
  zipcode: FieldType_zipcode,
  __type: 'Object'
|};

export type ParseAddress_Fetch = Address_Fetch;
export type ParseAddressInstance = Address_Fetch;
export type ParseAddress_Query = Address_Query;
export type ParseAddress_Pointer = ParsePointer<ParseTypeNameAddress>;
export type ParseAddressPointer = ParseAddress_Pointer;
type MyInstanceType = Address_Fetch;
type MyPointerType = ParseAddress_Pointer;
export type MaybeAddress = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeAddress;

type MyParseType = Address_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Address not fetched');
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
  city: (value: FieldType_city) => ({ fieldName: 'city', value }),
  createdAt: (value: FieldType_createdAt) => ({
    fieldName: 'createdAt',
    value
  }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  objectIdUser: (value: FieldType_objectIdUser_Pointer) => ({
    fieldName: 'objectIdUser',
    value
  }),
  street: (value: FieldType_street) => ({ fieldName: 'street', value }),
  updatedAt: (value: FieldType_updatedAt) => ({
    fieldName: 'updatedAt',
    value
  }),
  zipcode: (value: FieldType_zipcode) => ({ fieldName: 'zipcode', value })
};

export const GetById = async (id: string): Promise<MyInstanceType> => {
  const res = await getParseObjects(myType, 'find', {
    equalTo: [{ fieldName: 'objectId', value: id }]
  });
  const [result] = postProcessGet(res);
  const finalRes = { ...result, id, __type: 'Object' };

  return ((finalRes: any): MyInstanceType);
};
