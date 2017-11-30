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
  ParseTypeNameChef,
  MaybeChef,
  ParseChef_Pointer,
  ParseChef_Fetch,
  ParseChef_Query
} from './Chef';

import type {
  ParseTypeNameEvent,
  MaybeEvent,
  ParseEvent_Pointer,
  ParseEvent_Fetch,
  ParseEvent_Query
} from './Event';

import type {
  ParseTypeNameFood,
  MaybeFood,
  ParseFood_Pointer,
  ParseFood_Fetch,
  ParseFood_Query
} from './Food';

import type {
  ParseTypeName_User,
  Maybe_User,
  Parse_User_Pointer,
  Parse_User_Fetch,
  Parse_User_Query
} from './_User';

import type {
  ParseTypeNameOrder,
  MaybeOrder,
  ParseOrder_Pointer,
  ParseOrder_Fetch,
  ParseOrder_Query
} from './Order';

const myType: ParseClassName = 'Reviews';
export type ParseTypeNameReviews = 'Reviews';

export type FieldType_active = boolean;
export type FieldType_chef_Fetch = ParseChef_Fetch;
export type FieldType_chef_Maybe = ParseChef_Pointer | ParseChef_Fetch;
export type FieldType_chef_Pointer = ParseChef_Pointer;
export type FieldType_chef_Query = ParseChef_Query;
export type FieldType_company_review = string;
export type FieldType_createdAt = Date;
export type FieldType_objectId = string;
export type FieldType_objectIdEvent_Fetch = ParseEvent_Fetch;
export type FieldType_objectIdEvent_Maybe =
  | ParseEvent_Pointer
  | ParseEvent_Fetch;
export type FieldType_objectIdEvent_Pointer = ParseEvent_Pointer;
export type FieldType_objectIdEvent_Query = ParseEvent_Query;
export type FieldType_objectIdFood_Fetch = ParseFood_Fetch;
export type FieldType_objectIdFood_Maybe = ParseFood_Pointer | ParseFood_Fetch;
export type FieldType_objectIdFood_Pointer = ParseFood_Pointer;
export type FieldType_objectIdFood_Query = ParseFood_Query;
export type FieldType_objectIdUser_Fetch = Parse_User_Fetch;
export type FieldType_objectIdUser_Maybe =
  | Parse_User_Pointer
  | Parse_User_Fetch;
export type FieldType_objectIdUser_Pointer = Parse_User_Pointer;
export type FieldType_objectIdUser_Query = Parse_User_Query;
export type FieldType_order_Fetch = ParseOrder_Fetch;
export type FieldType_order_Maybe = ParseOrder_Pointer | ParseOrder_Fetch;
export type FieldType_order_Pointer = ParseOrder_Pointer;
export type FieldType_order_Query = ParseOrder_Query;
export type FieldType_rating = number;
export type FieldType_updatedAt = Date;
export type FieldType_user_review = string;

export type Reviews_Query = {|
  active?: FieldType_active,
  chef?: FieldType_chef_Pointer,
  company_review?: FieldType_company_review,
  createdAt?: FieldType_createdAt,
  objectId?: FieldType_objectId,
  objectIdEvent?: FieldType_objectIdEvent_Pointer,
  objectIdFood?: FieldType_objectIdFood_Pointer,
  objectIdUser?: FieldType_objectIdUser_Pointer,
  order?: FieldType_order_Pointer,
  rating?: FieldType_rating,
  updatedAt?: FieldType_updatedAt,
  user_review?: FieldType_user_review
|};

export type Reviews_Fetch = {|
  active: FieldType_active,
  chef: FieldType_chef_Maybe,
  company_review: FieldType_company_review,
  createdAt: FieldType_createdAt,
  objectId: FieldType_objectId,
  objectIdEvent: FieldType_objectIdEvent_Maybe,
  objectIdFood: FieldType_objectIdFood_Maybe,
  objectIdUser: FieldType_objectIdUser_Maybe,
  order: FieldType_order_Maybe,
  rating: FieldType_rating,
  updatedAt: FieldType_updatedAt,
  user_review: FieldType_user_review,
  __type: 'Object'
|};

export type ParseReviews_Fetch = Reviews_Fetch;
export type ParseReviewsInstance = Reviews_Fetch;
export type ParseReviews_Query = Reviews_Query;
export type ParseReviews_Pointer = ParsePointer<ParseTypeNameReviews>;
export type ParseReviewsPointer = ParseReviews_Pointer;
type MyInstanceType = Reviews_Fetch;
type MyPointerType = ParseReviews_Pointer;
export type MaybeReviews = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeReviews;

type MyParseType = Reviews_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Reviews not fetched');
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
  chef: (value: FieldType_chef_Pointer) => ({ fieldName: 'chef', value }),
  company_review: (value: FieldType_company_review) => ({
    fieldName: 'company_review',
    value
  }),
  createdAt: (value: FieldType_createdAt) => ({
    fieldName: 'createdAt',
    value
  }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  objectIdEvent: (value: FieldType_objectIdEvent_Pointer) => ({
    fieldName: 'objectIdEvent',
    value
  }),
  objectIdFood: (value: FieldType_objectIdFood_Pointer) => ({
    fieldName: 'objectIdFood',
    value
  }),
  objectIdUser: (value: FieldType_objectIdUser_Pointer) => ({
    fieldName: 'objectIdUser',
    value
  }),
  order: (value: FieldType_order_Pointer) => ({ fieldName: 'order', value }),
  rating: (value: FieldType_rating) => ({ fieldName: 'rating', value }),
  updatedAt: (value: FieldType_updatedAt) => ({
    fieldName: 'updatedAt',
    value
  }),
  user_review: (value: FieldType_user_review) => ({
    fieldName: 'user_review',
    value
  })
};

export const GetById = async (id: string): Promise<MyInstanceType> => {
  const res = await getParseObjects(myType, 'find', {
    equalTo: [{ fieldName: 'objectId', value: id }]
  });
  const [result] = postProcessGet(res);
  const finalRes = { ...result, id, __type: 'Object' };

  return ((finalRes: any): MyInstanceType);
};
