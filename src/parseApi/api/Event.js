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
  ParseTypeNameCities,
  MaybeCities,
  ParseCities_Pointer,
  ParseCities_Fetch,
  ParseCities_Query
} from './Cities';

import type {
  ParseTypeNameCurrencies,
  MaybeCurrencies,
  ParseCurrencies_Pointer,
  ParseCurrencies_Fetch,
  ParseCurrencies_Query
} from './Currencies';

import type {
  ParseTypeNameFood,
  MaybeFood,
  ParseFood_Pointer,
  ParseFood_Fetch,
  ParseFood_Query
} from './Food';

const myType: ParseClassName = 'Event';
export type ParseTypeNameEvent = 'Event';

export type FieldType_active = boolean;
export type FieldType_chef_Fetch = ParseChef_Fetch;
export type FieldType_chef_Maybe = ParseChef_Pointer | ParseChef_Fetch;
export type FieldType_chef_Pointer = ParseChef_Pointer;
export type FieldType_chef_Query = ParseChef_Query;
export type FieldType_chefAvatar = string;
export type FieldType_city_Fetch = ParseCities_Fetch;
export type FieldType_city_Maybe = ParseCities_Pointer | ParseCities_Fetch;
export type FieldType_city_Pointer = ParseCities_Pointer;
export type FieldType_city_Query = ParseCities_Query;
export type FieldType_createdAt = Date;
export type FieldType_currency_Fetch = ParseCurrencies_Fetch;
export type FieldType_currency_Maybe =
  | ParseCurrencies_Pointer
  | ParseCurrencies_Fetch;
export type FieldType_currency_Pointer = ParseCurrencies_Pointer;
export type FieldType_currency_Query = ParseCurrencies_Query;
export type FieldType_eventDeadline = Date;
export type FieldType_eventStart = Date;
export type FieldType_hasOrders = boolean;
export type FieldType_location = ParseGeoPointType;
export type FieldType_locationAddress = string;
export type FieldType_locationDetails = string;
export type FieldType_objectId = string;
export type FieldType_objectIdFood_Fetch = ParseFood_Fetch;
export type FieldType_objectIdFood_Maybe = ParseFood_Pointer | ParseFood_Fetch;
export type FieldType_objectIdFood_Pointer = ParseFood_Pointer;
export type FieldType_objectIdFood_Query = ParseFood_Query;
export type FieldType_price = number;
export type FieldType_reviewMailSent = boolean;
export type FieldType_reviews = number;
export type FieldType_servings = number;
export type FieldType_servingsSold = number;
export type FieldType_slug = string;
export type FieldType_soldOut = boolean;
export type FieldType_sticky = boolean;
export type FieldType_type = number;
export type FieldType_updatedAt = Date;
export type FieldType_userActive = boolean;
export type FieldType_zip = number;

export type Event_Query = {|
  active?: FieldType_active,
  chef?: FieldType_chef_Pointer,
  chefAvatar?: FieldType_chefAvatar,
  city?: FieldType_city_Pointer,
  createdAt?: FieldType_createdAt,
  currency?: FieldType_currency_Pointer,
  eventDeadline?: FieldType_eventDeadline,
  eventStart?: FieldType_eventStart,
  hasOrders?: FieldType_hasOrders,
  location?: FieldType_location,
  locationAddress?: FieldType_locationAddress,
  locationDetails?: FieldType_locationDetails,
  objectId?: FieldType_objectId,
  objectIdFood?: FieldType_objectIdFood_Pointer,
  price?: FieldType_price,
  reviewMailSent?: FieldType_reviewMailSent,
  reviews?: FieldType_reviews,
  servings?: FieldType_servings,
  servingsSold?: FieldType_servingsSold,
  slug?: FieldType_slug,
  soldOut?: FieldType_soldOut,
  sticky?: FieldType_sticky,
  type?: FieldType_type,
  updatedAt?: FieldType_updatedAt,
  userActive?: FieldType_userActive,
  zip?: FieldType_zip
|};

export type Event_Fetch = {|
  active: FieldType_active,
  chef: FieldType_chef_Maybe,
  chefAvatar: FieldType_chefAvatar,
  city: FieldType_city_Maybe,
  createdAt: FieldType_createdAt,
  currency: FieldType_currency_Maybe,
  eventDeadline: FieldType_eventDeadline,
  eventStart: FieldType_eventStart,
  hasOrders: FieldType_hasOrders,
  location: FieldType_location,
  locationAddress: FieldType_locationAddress,
  locationDetails: FieldType_locationDetails,
  objectId: FieldType_objectId,
  objectIdFood: FieldType_objectIdFood_Maybe,
  price: FieldType_price,
  reviewMailSent: FieldType_reviewMailSent,
  reviews: FieldType_reviews,
  servings: FieldType_servings,
  servingsSold: FieldType_servingsSold,
  slug: FieldType_slug,
  soldOut: FieldType_soldOut,
  sticky: FieldType_sticky,
  type: FieldType_type,
  updatedAt: FieldType_updatedAt,
  userActive: FieldType_userActive,
  zip: FieldType_zip,
  __type: 'Object'
|};

export type ParseEvent_Fetch = Event_Fetch;
export type ParseEventInstance = Event_Fetch;
export type ParseEvent_Query = Event_Query;
export type ParseEvent_Pointer = ParsePointer<ParseTypeNameEvent>;
export type ParseEventPointer = ParseEvent_Pointer;
type MyInstanceType = Event_Fetch;
type MyPointerType = ParseEvent_Pointer;
export type MaybeEvent = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeEvent;

type MyParseType = Event_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Event not fetched');
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



export const Get = async (
  queryParams: MyQueryType
): Promise<Array<MyInstanceType>> => {
  const res = await getParseObjects(myType, 'find', queryParams);
  return postProcessGet(res);
};
export const setOrCreate = async (obj: MyParseType) => {
  const objectId = obj.objectId;
  if (objectId) {
    return await Set(obj);
  }

  return await Create(obj);
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
  chefAvatar: (value: FieldType_chefAvatar) => ({
    fieldName: 'chefAvatar',
    value
  }),
  city: (value: FieldType_city_Pointer) => ({ fieldName: 'city', value }),
  createdAt: (value: FieldType_createdAt) => ({
    fieldName: 'createdAt',
    value
  }),
  currency: (value: FieldType_currency_Pointer) => ({
    fieldName: 'currency',
    value
  }),
  eventDeadline: (value: FieldType_eventDeadline) => ({
    fieldName: 'eventDeadline',
    value
  }),
  eventStart: (value: FieldType_eventStart) => ({
    fieldName: 'eventStart',
    value
  }),
  hasOrders: (value: FieldType_hasOrders) => ({
    fieldName: 'hasOrders',
    value
  }),
  location: (value: FieldType_location) => ({ fieldName: 'location', value }),
  locationAddress: (value: FieldType_locationAddress) => ({
    fieldName: 'locationAddress',
    value
  }),
  locationDetails: (value: FieldType_locationDetails) => ({
    fieldName: 'locationDetails',
    value
  }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  objectIdFood: (value: FieldType_objectIdFood_Pointer) => ({
    fieldName: 'objectIdFood',
    value
  }),
  price: (value: FieldType_price) => ({ fieldName: 'price', value }),
  reviewMailSent: (value: FieldType_reviewMailSent) => ({
    fieldName: 'reviewMailSent',
    value
  }),
  reviews: (value: FieldType_reviews) => ({ fieldName: 'reviews', value }),
  servings: (value: FieldType_servings) => ({ fieldName: 'servings', value }),
  servingsSold: (value: FieldType_servingsSold) => ({
    fieldName: 'servingsSold',
    value
  }),
  slug: (value: FieldType_slug) => ({ fieldName: 'slug', value }),
  soldOut: (value: FieldType_soldOut) => ({ fieldName: 'soldOut', value }),
  sticky: (value: FieldType_sticky) => ({ fieldName: 'sticky', value }),
  type: (value: FieldType_type) => ({ fieldName: 'type', value }),
  updatedAt: (value: FieldType_updatedAt) => ({
    fieldName: 'updatedAt',
    value
  }),
  userActive: (value: FieldType_userActive) => ({
    fieldName: 'userActive',
    value
  }),
  zip: (value: FieldType_zip) => ({ fieldName: 'zip', value })
};

export const GetById = async (id: string): Promise<MyInstanceType> => {
  const res = await getParseObjects(myType, 'find', {
    equalTo: [{ fieldName: 'objectId', value: id }]
  });
  const [result] = postProcessGet(res);
  const finalRes = { ...result, id, __type: 'Object' };

  return ((finalRes: any): MyInstanceType);
};
