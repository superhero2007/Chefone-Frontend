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
  ParseTypeNameJobSection,
  MaybeJobSection,
  ParseJobSection_Pointer,
  ParseJobSection_Fetch,
  ParseJobSection_Query
} from './JobSection';

const myType: ParseClassName = 'Jobs';
export type ParseTypeNameJobs = 'Jobs';

export type FieldType_active = boolean;
export type FieldType_createdAt = Date;
export type FieldType_jobDescription = string;
export type FieldType_jobTitle = string;
export type FieldType_objectId = string;
export type FieldType_objectIdJobSection_Fetch = ParseJobSection_Fetch;
export type FieldType_objectIdJobSection_Maybe =
  | ParseJobSection_Pointer
  | ParseJobSection_Fetch;
export type FieldType_objectIdJobSection_Pointer = ParseJobSection_Pointer;
export type FieldType_objectIdJobSection_Query = ParseJobSection_Query;
export type FieldType_updatedAt = Date;

export type Jobs_Query = {|
  active?: FieldType_active,
  createdAt?: FieldType_createdAt,
  jobDescription?: FieldType_jobDescription,
  jobTitle?: FieldType_jobTitle,
  objectId?: FieldType_objectId,
  objectIdJobSection?: FieldType_objectIdJobSection_Pointer,
  updatedAt?: FieldType_updatedAt
|};

export type Jobs_Fetch = {|
  active: FieldType_active,
  createdAt: FieldType_createdAt,
  jobDescription: FieldType_jobDescription,
  jobTitle: FieldType_jobTitle,
  objectId: FieldType_objectId,
  objectIdJobSection: FieldType_objectIdJobSection_Maybe,
  updatedAt: FieldType_updatedAt,
  __type: 'Object'
|};

export type ParseJobs_Fetch = Jobs_Fetch;
export type ParseJobsInstance = Jobs_Fetch;
export type ParseJobs_Query = Jobs_Query;
export type ParseJobs_Pointer = ParsePointer<ParseTypeNameJobs>;
export type ParseJobsPointer = ParseJobs_Pointer;
type MyInstanceType = Jobs_Fetch;
type MyPointerType = ParseJobs_Pointer;
export type MaybeJobs = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeJobs;

type MyParseType = Jobs_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Jobs not fetched');
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
  jobDescription: (value: FieldType_jobDescription) => ({
    fieldName: 'jobDescription',
    value
  }),
  jobTitle: (value: FieldType_jobTitle) => ({ fieldName: 'jobTitle', value }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  objectIdJobSection: (value: FieldType_objectIdJobSection_Pointer) => ({
    fieldName: 'objectIdJobSection',
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
