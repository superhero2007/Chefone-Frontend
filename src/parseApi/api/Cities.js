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

const myType: ParseClassName = 'Cities';
export type ParseTypeNameCities = 'Cities';

export type FieldType_active = boolean;
export type FieldType_city = string;
export type FieldType_city_image_FileIn = ParseFileTypeIn;
export type FieldType_city_image_FileOut = ParseFileTypeOut;
export type FieldType_city_image_web_FileIn = ParseFileTypeIn;
export type FieldType_city_image_web_FileOut = ParseFileTypeOut;
export type FieldType_country = string;
export type FieldType_createdAt = Date;
export type FieldType_location = ParseGeoPointType;
export type FieldType_objectId = string;
export type FieldType_updatedAt = Date;

export type Cities_Query = {|
  active?: FieldType_active,
  city?: FieldType_city,
  city_image?: FieldType_city_image_FileIn,
  city_image_web?: FieldType_city_image_web_FileIn,
  country?: FieldType_country,
  createdAt?: FieldType_createdAt,
  location?: FieldType_location,
  objectId?: FieldType_objectId,
  updatedAt?: FieldType_updatedAt
|};

export type Cities_Fetch = {|
  active: FieldType_active,
  city: FieldType_city,
  city_image: FieldType_city_image_FileOut,
  city_image_web: FieldType_city_image_web_FileOut,
  country: FieldType_country,
  createdAt: FieldType_createdAt,
  location: FieldType_location,
  objectId: FieldType_objectId,
  updatedAt: FieldType_updatedAt,
  __type: 'Object'
|};

export type ParseCities_Fetch = Cities_Fetch;
export type ParseCitiesInstance = Cities_Fetch;
export type ParseCities_Query = Cities_Query;
export type ParseCities_Pointer = ParsePointer<ParseTypeNameCities>;
export type ParseCitiesPointer = ParseCities_Pointer;
type MyInstanceType = Cities_Fetch;
type MyPointerType = ParseCities_Pointer;
export type MaybeCities = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeCities;

type MyParseType = Cities_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Cities not fetched');
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
  city: (value: FieldType_city) => ({ fieldName: 'city', value }),
  city_image: (value: FieldType_city_image_FileIn) => ({
    fieldName: 'city_image',
    value
  }),
  city_image_web: (value: FieldType_city_image_web_FileIn) => ({
    fieldName: 'city_image_web',
    value
  }),
  country: (value: FieldType_country) => ({ fieldName: 'country', value }),
  createdAt: (value: FieldType_createdAt) => ({
    fieldName: 'createdAt',
    value
  }),
  location: (value: FieldType_location) => ({ fieldName: 'location', value }),
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
