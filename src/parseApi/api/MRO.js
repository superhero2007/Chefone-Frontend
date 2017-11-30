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

const myType: ParseClassName = 'MRO';
export type ParseTypeNameMRO = 'MRO';

export type FieldType_createdAt = Date;
export type FieldType_maintenanceMode = boolean;
export type FieldType_minimumBuildVersion = number;
export type FieldType_objectId = string;
export type FieldType_platform = string;
export type FieldType_systemMessage = string;
export type FieldType_updatedAt = Date;

export type MRO_Query = {|
  createdAt?: FieldType_createdAt,
  maintenanceMode?: FieldType_maintenanceMode,
  minimumBuildVersion?: FieldType_minimumBuildVersion,
  objectId?: FieldType_objectId,
  platform?: FieldType_platform,
  systemMessage?: FieldType_systemMessage,
  updatedAt?: FieldType_updatedAt
|};

export type MRO_Fetch = {|
  createdAt: FieldType_createdAt,
  maintenanceMode: FieldType_maintenanceMode,
  minimumBuildVersion: FieldType_minimumBuildVersion,
  objectId: FieldType_objectId,
  platform: FieldType_platform,
  systemMessage: FieldType_systemMessage,
  updatedAt: FieldType_updatedAt,
  __type: 'Object'
|};

export type ParseMRO_Fetch = MRO_Fetch;
export type ParseMROInstance = MRO_Fetch;
export type ParseMRO_Query = MRO_Query;
export type ParseMRO_Pointer = ParsePointer<ParseTypeNameMRO>;
export type ParseMROPointer = ParseMRO_Pointer;
type MyInstanceType = MRO_Fetch;
type MyPointerType = ParseMRO_Pointer;
export type MaybeMRO = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeMRO;

type MyParseType = MRO_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('MRO not fetched');
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
  maintenanceMode: (value: FieldType_maintenanceMode) => ({
    fieldName: 'maintenanceMode',
    value
  }),
  minimumBuildVersion: (value: FieldType_minimumBuildVersion) => ({
    fieldName: 'minimumBuildVersion',
    value
  }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  platform: (value: FieldType_platform) => ({ fieldName: 'platform', value }),
  systemMessage: (value: FieldType_systemMessage) => ({
    fieldName: 'systemMessage',
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
