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

const myType: ParseClassName = 'Chef';
export type ParseTypeNameChef = 'Chef';

export type FieldType_createdAt = Date;
export type FieldType_kitchen1_FileIn = ParseFileTypeIn;
export type FieldType_kitchen1_FileOut = ParseFileTypeOut;
export type FieldType_name = string;
export type FieldType_numberOfReviews = number;
export type FieldType_objectId = string;
export type FieldType_objectIdUser_Fetch = Parse_User_Fetch;
export type FieldType_objectIdUser_Maybe =
  | Parse_User_Pointer
  | Parse_User_Fetch;
export type FieldType_objectIdUser_Pointer = Parse_User_Pointer;
export type FieldType_objectIdUser_Query = Parse_User_Query;
export type FieldType_rating = number;
export type FieldType_rating_average = number;
export type FieldType_rating_last_comment = string;
export type FieldType_rating_last_User = string;
export type FieldType_rating_total = number;
export type FieldType_reviewsAvg = number;
export type FieldType_updatedAt = Date;

export type Chef_Query = {|
  createdAt?: FieldType_createdAt,
  kitchen1?: FieldType_kitchen1_FileIn,
  name?: FieldType_name,
  numberOfReviews?: FieldType_numberOfReviews,
  objectId?: FieldType_objectId,
  objectIdUser?: FieldType_objectIdUser_Pointer,
  rating?: FieldType_rating,
  rating_average?: FieldType_rating_average,
  rating_last_comment?: FieldType_rating_last_comment,
  rating_last_User?: FieldType_rating_last_User,
  rating_total?: FieldType_rating_total,
  reviewsAvg?: FieldType_reviewsAvg,
  updatedAt?: FieldType_updatedAt
|};

export type Chef_Fetch = {|
  createdAt: FieldType_createdAt,
  kitchen1: FieldType_kitchen1_FileOut,
  name: FieldType_name,
  numberOfReviews: FieldType_numberOfReviews,
  objectId: FieldType_objectId,
  objectIdUser: FieldType_objectIdUser_Maybe,
  rating: FieldType_rating,
  rating_average: FieldType_rating_average,
  rating_last_comment: FieldType_rating_last_comment,
  rating_last_User: FieldType_rating_last_User,
  rating_total: FieldType_rating_total,
  reviewsAvg: FieldType_reviewsAvg,
  updatedAt: FieldType_updatedAt,
  __type: 'Object'
|};

export type ParseChef_Fetch = Chef_Fetch;
export type ParseChefInstance = Chef_Fetch;
export type ParseChef_Query = Chef_Query;
export type ParseChef_Pointer = ParsePointer<ParseTypeNameChef>;
export type ParseChefPointer = ParseChef_Pointer;
type MyInstanceType = Chef_Fetch;
type MyPointerType = ParseChef_Pointer;
export type MaybeChef = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeChef;

type MyParseType = Chef_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Chef not fetched');
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
  kitchen1: (value: FieldType_kitchen1_FileIn) => ({
    fieldName: 'kitchen1',
    value
  }),
  name: (value: FieldType_name) => ({ fieldName: 'name', value }),
  numberOfReviews: (value: FieldType_numberOfReviews) => ({
    fieldName: 'numberOfReviews',
    value
  }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  objectIdUser: (value: FieldType_objectIdUser_Pointer) => ({
    fieldName: 'objectIdUser',
    value
  }),
  rating: (value: FieldType_rating) => ({ fieldName: 'rating', value }),
  rating_average: (value: FieldType_rating_average) => ({
    fieldName: 'rating_average',
    value
  }),
  rating_last_comment: (value: FieldType_rating_last_comment) => ({
    fieldName: 'rating_last_comment',
    value
  }),
  rating_last_User: (value: FieldType_rating_last_User) => ({
    fieldName: 'rating_last_User',
    value
  }),
  rating_total: (value: FieldType_rating_total) => ({
    fieldName: 'rating_total',
    value
  }),
  reviewsAvg: (value: FieldType_reviewsAvg) => ({
    fieldName: 'reviewsAvg',
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
