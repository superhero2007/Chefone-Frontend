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

const myType: ParseClassName = 'JobSection';
export type ParseTypeNameJobSection = 'JobSection';

export type FieldType_active = boolean;
export type FieldType_createdAt = Date;
export type FieldType_department = string;
export type FieldType_jobIcon_FileIn = ParseFileTypeIn;
export type FieldType_jobIcon_FileOut = ParseFileTypeOut;
export type FieldType_objectId = string;
export type FieldType_updatedAt = Date;

export type JobSection_Query = {|
  active?: FieldType_active,
  createdAt?: FieldType_createdAt,
  department?: FieldType_department,
  jobIcon?: FieldType_jobIcon_FileIn,
  objectId?: FieldType_objectId,
  updatedAt?: FieldType_updatedAt
|};

export type JobSection_Fetch = {|
  active: FieldType_active,
  createdAt: FieldType_createdAt,
  department: FieldType_department,
  jobIcon: FieldType_jobIcon_FileOut,
  objectId: FieldType_objectId,
  updatedAt: FieldType_updatedAt,
  __type: 'Object'
|};

export type ParseJobSection_Fetch = JobSection_Fetch;
export type ParseJobSectionInstance = JobSection_Fetch;
export type ParseJobSection_Query = JobSection_Query;
export type ParseJobSection_Pointer = ParsePointer<ParseTypeNameJobSection>;
export type ParseJobSectionPointer = ParseJobSection_Pointer;
type MyInstanceType = JobSection_Fetch;
type MyPointerType = ParseJobSection_Pointer;
export type MaybeJobSection = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeJobSection;

type MyParseType = JobSection_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('JobSection not fetched');
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
  department: (value: FieldType_department) => ({
    fieldName: 'department',
    value
  }),
  jobIcon: (value: FieldType_jobIcon_FileIn) => ({
    fieldName: 'jobIcon',
    value
  }),
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
