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
  ParseTypeNameCurrencies,
  MaybeCurrencies,
  ParseCurrencies_Pointer,
  ParseCurrencies_Fetch,
  ParseCurrencies_Query
} from './Currencies';

import type {
  ParseTypeNameOrder,
  MaybeOrder,
  ParseOrder_Pointer,
  ParseOrder_Fetch,
  ParseOrder_Query
} from './Order';

const myType: ParseClassName = 'Payment';
export type ParseTypeNamePayment = 'Payment';

export type FieldType_app_ver = string;
export type FieldType_create_time = string;
export type FieldType_createdAt = Date;
export type FieldType_currencyobjectId_Fetch = ParseCurrencies_Fetch;
export type FieldType_currencyobjectId_Maybe =
  | ParseCurrencies_Pointer
  | ParseCurrencies_Fetch;
export type FieldType_currencyobjectId_Pointer = ParseCurrencies_Pointer;
export type FieldType_currencyobjectId_Query = ParseCurrencies_Query;
export type FieldType_description = string;
export type FieldType_environment = string;
export type FieldType_intent = string;
export type FieldType_objectId = string;
export type FieldType_orderobjectId_Fetch = ParseOrder_Fetch;
export type FieldType_orderobjectId_Maybe =
  | ParseOrder_Pointer
  | ParseOrder_Fetch;
export type FieldType_orderobjectId_Pointer = ParseOrder_Pointer;
export type FieldType_orderobjectId_Query = ParseOrder_Query;
export type FieldType_paypal = string;
export type FieldType_platform = string;
export type FieldType_preAprovalKey = string;
export type FieldType_refunded = boolean;
export type FieldType_state = string;
export type FieldType_totalAmount = number;
export type FieldType_touched = string;
export type FieldType_transaction_id = string;
export type FieldType_type = string;
export type FieldType_updatedAt = Date;

export type Payment_Query = {|
  app_ver?: FieldType_app_ver,
  create_time?: FieldType_create_time,
  createdAt?: FieldType_createdAt,
  currencyobjectId?: FieldType_currencyobjectId_Pointer,
  description?: FieldType_description,
  environment?: FieldType_environment,
  intent?: FieldType_intent,
  objectId?: FieldType_objectId,
  orderobjectId?: FieldType_orderobjectId_Pointer,
  paypal?: FieldType_paypal,
  platform?: FieldType_platform,
  preAprovalKey?: FieldType_preAprovalKey,
  refunded?: FieldType_refunded,
  state?: FieldType_state,
  totalAmount?: FieldType_totalAmount,
  touched?: FieldType_touched,
  transaction_id?: FieldType_transaction_id,
  type?: FieldType_type,
  updatedAt?: FieldType_updatedAt
|};

export type Payment_Fetch = {|
  app_ver: FieldType_app_ver,
  create_time: FieldType_create_time,
  createdAt: FieldType_createdAt,
  currencyobjectId: FieldType_currencyobjectId_Maybe,
  description: FieldType_description,
  environment: FieldType_environment,
  intent: FieldType_intent,
  objectId: FieldType_objectId,
  orderobjectId: FieldType_orderobjectId_Maybe,
  paypal: FieldType_paypal,
  platform: FieldType_platform,
  preAprovalKey: FieldType_preAprovalKey,
  refunded: FieldType_refunded,
  state: FieldType_state,
  totalAmount: FieldType_totalAmount,
  touched: FieldType_touched,
  transaction_id: FieldType_transaction_id,
  type: FieldType_type,
  updatedAt: FieldType_updatedAt,
  __type: 'Object'
|};

export type ParsePayment_Fetch = Payment_Fetch;
export type ParsePaymentInstance = Payment_Fetch;
export type ParsePayment_Query = Payment_Query;
export type ParsePayment_Pointer = ParsePointer<ParseTypeNamePayment>;
export type ParsePaymentPointer = ParsePayment_Pointer;
type MyInstanceType = Payment_Fetch;
type MyPointerType = ParsePayment_Pointer;
export type MaybePayment = MyInstanceType | MyPointerType;
type MyMaybeType = MaybePayment;

type MyParseType = Payment_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Payment not fetched');
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
  app_ver: (value: FieldType_app_ver) => ({ fieldName: 'app_ver', value }),
  create_time: (value: FieldType_create_time) => ({
    fieldName: 'create_time',
    value
  }),
  createdAt: (value: FieldType_createdAt) => ({
    fieldName: 'createdAt',
    value
  }),
  currencyobjectId: (value: FieldType_currencyobjectId_Pointer) => ({
    fieldName: 'currencyobjectId',
    value
  }),
  description: (value: FieldType_description) => ({
    fieldName: 'description',
    value
  }),
  environment: (value: FieldType_environment) => ({
    fieldName: 'environment',
    value
  }),
  intent: (value: FieldType_intent) => ({ fieldName: 'intent', value }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  orderobjectId: (value: FieldType_orderobjectId_Pointer) => ({
    fieldName: 'orderobjectId',
    value
  }),
  paypal: (value: FieldType_paypal) => ({ fieldName: 'paypal', value }),
  platform: (value: FieldType_platform) => ({ fieldName: 'platform', value }),
  preAprovalKey: (value: FieldType_preAprovalKey) => ({
    fieldName: 'preAprovalKey',
    value
  }),
  refunded: (value: FieldType_refunded) => ({ fieldName: 'refunded', value }),
  state: (value: FieldType_state) => ({ fieldName: 'state', value }),
  totalAmount: (value: FieldType_totalAmount) => ({
    fieldName: 'totalAmount',
    value
  }),
  touched: (value: FieldType_touched) => ({ fieldName: 'touched', value }),
  transaction_id: (value: FieldType_transaction_id) => ({
    fieldName: 'transaction_id',
    value
  }),
  type: (value: FieldType_type) => ({ fieldName: 'type', value }),
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
