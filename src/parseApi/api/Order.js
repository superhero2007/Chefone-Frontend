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
  ParseTypeNameDiscount,
  MaybeDiscount,
  ParseDiscount_Pointer,
  ParseDiscount_Fetch,
  ParseDiscount_Query
} from './Discount';

import type {
  ParseTypeNameEvent,
  MaybeEvent,
  ParseEvent_Pointer,
  ParseEvent_Fetch,
  ParseEvent_Query
} from './Event';

import type {
  ParseTypeName_User,
  Maybe_User,
  Parse_User_Pointer,
  Parse_User_Fetch,
  Parse_User_Query
} from './_User';

import type {
  ParseTypeNameReviews,
  MaybeReviews,
  ParseReviews_Pointer,
  ParseReviews_Fetch,
  ParseReviews_Query
} from './Reviews';

const myType: ParseClassName = 'Order';
export type ParseTypeNameOrder = 'Order';

export type FieldType_amount = number;
export type FieldType_approval = boolean;
export type FieldType_createdAt = Date;
export type FieldType_discountPrice = number;
export type FieldType_emailed = boolean;
export type FieldType_finalized = boolean;
export type FieldType_foodPrice = number;
export type FieldType_foodPriceTotal = number;
export type FieldType_msgSeen = boolean;
export type FieldType_nonce = string;
export type FieldType_objectId = string;
export type FieldType_objectIdDiscount_Fetch = ParseDiscount_Fetch;
export type FieldType_objectIdDiscount_Maybe =
  | ParseDiscount_Pointer
  | ParseDiscount_Fetch;
export type FieldType_objectIdDiscount_Pointer = ParseDiscount_Pointer;
export type FieldType_objectIdDiscount_Query = ParseDiscount_Query;
export type FieldType_objectIdEvent_Fetch = ParseEvent_Fetch;
export type FieldType_objectIdEvent_Maybe =
  | ParseEvent_Pointer
  | ParseEvent_Fetch;
export type FieldType_objectIdEvent_Pointer = ParseEvent_Pointer;
export type FieldType_objectIdEvent_Query = ParseEvent_Query;
export type FieldType_objectIdUser_Fetch = Parse_User_Fetch;
export type FieldType_objectIdUser_Maybe =
  | Parse_User_Pointer
  | Parse_User_Fetch;
export type FieldType_objectIdUser_Pointer = Parse_User_Pointer;
export type FieldType_objectIdUser_Query = Parse_User_Query;
export type FieldType_phone = number;
export type FieldType_phoneStr = string;
export type FieldType_refunded = boolean;
export type FieldType_remindEmailSent = boolean;
export type FieldType_review_Fetch = ParseReviews_Fetch;
export type FieldType_review_Maybe = ParseReviews_Pointer | ParseReviews_Fetch;
export type FieldType_review_Pointer = ParseReviews_Pointer;
export type FieldType_review_Query = ParseReviews_Query;
export type FieldType_reviewedByUser = boolean;
export type FieldType_reviewMailSent = boolean;
export type FieldType_serviceFee = number;
export type FieldType_serviceFeePercentage = number;
export type FieldType_status = number;
export type FieldType_systemMsg = string;
export type FieldType_timestamp = number;
export type FieldType_touched = string;
export type FieldType_updatedAt = Date;
export type FieldType_userMsg = string;

export type Order_Query = {|
  amount?: FieldType_amount,
  approval?: FieldType_approval,
  createdAt?: FieldType_createdAt,
  discountPrice?: FieldType_discountPrice,
  emailed?: FieldType_emailed,
  finalized?: FieldType_finalized,
  foodPrice?: FieldType_foodPrice,
  foodPriceTotal?: FieldType_foodPriceTotal,
  msgSeen?: FieldType_msgSeen,
  nonce?: FieldType_nonce,
  objectId?: FieldType_objectId,
  objectIdDiscount?: FieldType_objectIdDiscount_Pointer,
  objectIdEvent?: FieldType_objectIdEvent_Pointer,
  objectIdUser?: FieldType_objectIdUser_Pointer,
  phone?: FieldType_phone,
  phoneStr?: FieldType_phoneStr,
  refunded?: FieldType_refunded,
  remindEmailSent?: FieldType_remindEmailSent,
  review?: FieldType_review_Pointer,
  reviewedByUser?: FieldType_reviewedByUser,
  reviewMailSent?: FieldType_reviewMailSent,
  serviceFee?: FieldType_serviceFee,
  serviceFeePercentage?: FieldType_serviceFeePercentage,
  status?: FieldType_status,
  systemMsg?: FieldType_systemMsg,
  timestamp?: FieldType_timestamp,
  touched?: FieldType_touched,
  updatedAt?: FieldType_updatedAt,
  userMsg?: FieldType_userMsg
|};

export type Order_Fetch = {|
  amount: FieldType_amount,
  approval: FieldType_approval,
  createdAt: FieldType_createdAt,
  discountPrice: FieldType_discountPrice,
  emailed: FieldType_emailed,
  finalized: FieldType_finalized,
  foodPrice: FieldType_foodPrice,
  foodPriceTotal: FieldType_foodPriceTotal,
  msgSeen: FieldType_msgSeen,
  nonce: FieldType_nonce,
  objectId: FieldType_objectId,
  objectIdDiscount: FieldType_objectIdDiscount_Maybe,
  objectIdEvent: FieldType_objectIdEvent_Maybe,
  objectIdUser: FieldType_objectIdUser_Maybe,
  phone: FieldType_phone,
  phoneStr: FieldType_phoneStr,
  refunded: FieldType_refunded,
  remindEmailSent: FieldType_remindEmailSent,
  review: FieldType_review_Maybe,
  reviewedByUser: FieldType_reviewedByUser,
  reviewMailSent: FieldType_reviewMailSent,
  serviceFee: FieldType_serviceFee,
  serviceFeePercentage: FieldType_serviceFeePercentage,
  status: FieldType_status,
  systemMsg: FieldType_systemMsg,
  timestamp: FieldType_timestamp,
  touched: FieldType_touched,
  updatedAt: FieldType_updatedAt,
  userMsg: FieldType_userMsg,
  __type: 'Object'
|};

export type ParseOrder_Fetch = Order_Fetch;
export type ParseOrderInstance = Order_Fetch;
export type ParseOrder_Query = Order_Query;
export type ParseOrder_Pointer = ParsePointer<ParseTypeNameOrder>;
export type ParseOrderPointer = ParseOrder_Pointer;
type MyInstanceType = Order_Fetch;
type MyPointerType = ParseOrder_Pointer;
export type MaybeOrder = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeOrder;

type MyParseType = Order_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Order not fetched');
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
  amount: (value: FieldType_amount) => ({ fieldName: 'amount', value }),
  approval: (value: FieldType_approval) => ({ fieldName: 'approval', value }),
  createdAt: (value: FieldType_createdAt) => ({
    fieldName: 'createdAt',
    value
  }),
  discountPrice: (value: FieldType_discountPrice) => ({
    fieldName: 'discountPrice',
    value
  }),
  emailed: (value: FieldType_emailed) => ({ fieldName: 'emailed', value }),
  finalized: (value: FieldType_finalized) => ({
    fieldName: 'finalized',
    value
  }),
  foodPrice: (value: FieldType_foodPrice) => ({
    fieldName: 'foodPrice',
    value
  }),
  foodPriceTotal: (value: FieldType_foodPriceTotal) => ({
    fieldName: 'foodPriceTotal',
    value
  }),
  msgSeen: (value: FieldType_msgSeen) => ({ fieldName: 'msgSeen', value }),
  nonce: (value: FieldType_nonce) => ({ fieldName: 'nonce', value }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  objectIdDiscount: (value: FieldType_objectIdDiscount_Pointer) => ({
    fieldName: 'objectIdDiscount',
    value
  }),
  objectIdEvent: (value: FieldType_objectIdEvent_Pointer) => ({
    fieldName: 'objectIdEvent',
    value
  }),
  objectIdUser: (value: FieldType_objectIdUser_Pointer) => ({
    fieldName: 'objectIdUser',
    value
  }),
  phone: (value: FieldType_phone) => ({ fieldName: 'phone', value }),
  phoneStr: (value: FieldType_phoneStr) => ({ fieldName: 'phoneStr', value }),
  refunded: (value: FieldType_refunded) => ({ fieldName: 'refunded', value }),
  remindEmailSent: (value: FieldType_remindEmailSent) => ({
    fieldName: 'remindEmailSent',
    value
  }),
  review: (value: FieldType_review_Pointer) => ({ fieldName: 'review', value }),
  reviewedByUser: (value: FieldType_reviewedByUser) => ({
    fieldName: 'reviewedByUser',
    value
  }),
  reviewMailSent: (value: FieldType_reviewMailSent) => ({
    fieldName: 'reviewMailSent',
    value
  }),
  serviceFee: (value: FieldType_serviceFee) => ({
    fieldName: 'serviceFee',
    value
  }),
  serviceFeePercentage: (value: FieldType_serviceFeePercentage) => ({
    fieldName: 'serviceFeePercentage',
    value
  }),
  status: (value: FieldType_status) => ({ fieldName: 'status', value }),
  systemMsg: (value: FieldType_systemMsg) => ({
    fieldName: 'systemMsg',
    value
  }),
  timestamp: (value: FieldType_timestamp) => ({
    fieldName: 'timestamp',
    value
  }),
  touched: (value: FieldType_touched) => ({ fieldName: 'touched', value }),
  updatedAt: (value: FieldType_updatedAt) => ({
    fieldName: 'updatedAt',
    value
  }),
  userMsg: (value: FieldType_userMsg) => ({ fieldName: 'userMsg', value })
};

export const GetById = async (id: string): Promise<MyInstanceType> => {
  const res = await getParseObjects(myType, 'find', {
    equalTo: [{ fieldName: 'objectId', value: id }]
  });
  const [result] = postProcessGet(res);
  const finalRes = { ...result, id, __type: 'Object' };

  return ((finalRes: any): MyInstanceType);
};
