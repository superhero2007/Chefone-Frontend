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

const myType: ParseClassName = 'Backend';
export type ParseTypeNameBackend = 'Backend';

export type FieldType_active = boolean;
export type FieldType_createdAt = Date;
export type FieldType_lastTimeSent = Date;
export type FieldType_objectId = string;
export type FieldType_service = string;
export type FieldType_updatedAt = Date;

export type Backend_Query = {|
  active?: FieldType_active,
  createdAt?: FieldType_createdAt,
  lastTimeSent?: FieldType_lastTimeSent,
  objectId?: FieldType_objectId,
  service?: FieldType_service,
  updatedAt?: FieldType_updatedAt
|};

export type Backend_Fetch = {|
  active: FieldType_active,
  createdAt: FieldType_createdAt,
  lastTimeSent: FieldType_lastTimeSent,
  objectId: FieldType_objectId,
  service: FieldType_service,
  updatedAt: FieldType_updatedAt,
  __type: 'Object'
|};

export type ParseBackend_Fetch = Backend_Fetch;
export type ParseBackendInstance = Backend_Fetch;
export type ParseBackend_Query = Backend_Query;
export type ParseBackend_Pointer = ParsePointer<ParseTypeNameBackend>;
export type ParseBackendPointer = ParseBackend_Pointer;
type MyInstanceType = Backend_Fetch;
type MyPointerType = ParseBackend_Pointer;
export type MaybeBackend = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeBackend;

type MyParseType = Backend_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Backend not fetched');
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
  active: (value: FieldType_active) => ({ fieldName: 'active', value }),
  createdAt: (value: FieldType_createdAt) => ({
    fieldName: 'createdAt',
    value
  }),
  lastTimeSent: (value: FieldType_lastTimeSent) => ({
    fieldName: 'lastTimeSent',
    value
  }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  service: (value: FieldType_service) => ({ fieldName: 'service', value }),
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
