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

const myType: ParseClassName = 'Fee';
export type ParseTypeNameFee = 'Fee';

export type FieldType_chef = number;
export type FieldType_createdAt = Date;
export type FieldType_customer = number;
export type FieldType_objectId = string;
export type FieldType_updatedAt = Date;

export type Fee_Query = {|
  chef?: FieldType_chef,
  createdAt?: FieldType_createdAt,
  customer?: FieldType_customer,
  objectId?: FieldType_objectId,
  updatedAt?: FieldType_updatedAt
|};

export type Fee_Fetch = {|
  chef: FieldType_chef,
  createdAt: FieldType_createdAt,
  customer: FieldType_customer,
  objectId: FieldType_objectId,
  updatedAt: FieldType_updatedAt,
  __type: 'Object'
|};

export type ParseFee_Fetch = Fee_Fetch;
export type ParseFeeInstance = Fee_Fetch;
export type ParseFee_Query = Fee_Query;
export type ParseFee_Pointer = ParsePointer<ParseTypeNameFee>;
export type ParseFeePointer = ParseFee_Pointer;
type MyInstanceType = Fee_Fetch;
type MyPointerType = ParseFee_Pointer;
export type MaybeFee = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeFee;

type MyParseType = Fee_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Fee not fetched');
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
  chef: (value: FieldType_chef) => ({ fieldName: 'chef', value }),
  createdAt: (value: FieldType_createdAt) => ({
    fieldName: 'createdAt',
    value
  }),
  customer: (value: FieldType_customer) => ({ fieldName: 'customer', value }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
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
