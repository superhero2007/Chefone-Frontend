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
  ParseTypeNameEvent,
  MaybeEvent,
  ParseEvent_Pointer,
  ParseEvent_Fetch,
  ParseEvent_Query
} from './Event';

const myType: ParseClassName = 'Invoice';
export type ParseTypeNameInvoice = 'Invoice';

export type FieldType_createdAt = Date;
export type FieldType_InvoiceDate = Date;
export type FieldType_invoiceNumber = string;
export type FieldType_invoicePDF = string;
export type FieldType_objectId = string;
export type FieldType_objectIdEvent_Fetch = ParseEvent_Fetch;
export type FieldType_objectIdEvent_Maybe =
  | ParseEvent_Pointer
  | ParseEvent_Fetch;
export type FieldType_objectIdEvent_Pointer = ParseEvent_Pointer;
export type FieldType_objectIdEvent_Query = ParseEvent_Query;
export type FieldType_paymentSubmitted = boolean;
export type FieldType_payout = number;
export type FieldType_serviceFee = number;
export type FieldType_servingsSold = number;
export type FieldType_totalAmount = number;
export type FieldType_updatedAt = Date;

export type Invoice_Query = {|
  createdAt?: FieldType_createdAt,
  InvoiceDate?: FieldType_InvoiceDate,
  invoiceNumber?: FieldType_invoiceNumber,
  invoicePDF?: FieldType_invoicePDF,
  objectId?: FieldType_objectId,
  objectIdEvent?: FieldType_objectIdEvent_Pointer,
  paymentSubmitted?: FieldType_paymentSubmitted,
  payout?: FieldType_payout,
  serviceFee?: FieldType_serviceFee,
  servingsSold?: FieldType_servingsSold,
  totalAmount?: FieldType_totalAmount,
  updatedAt?: FieldType_updatedAt
|};

export type Invoice_Fetch = {|
  createdAt: FieldType_createdAt,
  InvoiceDate: FieldType_InvoiceDate,
  invoiceNumber: FieldType_invoiceNumber,
  invoicePDF: FieldType_invoicePDF,
  objectId: FieldType_objectId,
  objectIdEvent: FieldType_objectIdEvent_Maybe,
  paymentSubmitted: FieldType_paymentSubmitted,
  payout: FieldType_payout,
  serviceFee: FieldType_serviceFee,
  servingsSold: FieldType_servingsSold,
  totalAmount: FieldType_totalAmount,
  updatedAt: FieldType_updatedAt,
  __type: 'Object'
|};

export type ParseInvoice_Fetch = Invoice_Fetch;
export type ParseInvoiceInstance = Invoice_Fetch;
export type ParseInvoice_Query = Invoice_Query;
export type ParseInvoice_Pointer = ParsePointer<ParseTypeNameInvoice>;
export type ParseInvoicePointer = ParseInvoice_Pointer;
type MyInstanceType = Invoice_Fetch;
type MyPointerType = ParseInvoice_Pointer;
export type MaybeInvoice = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeInvoice;

type MyParseType = Invoice_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Invoice not fetched');
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
  InvoiceDate: (value: FieldType_InvoiceDate) => ({
    fieldName: 'InvoiceDate',
    value
  }),
  invoiceNumber: (value: FieldType_invoiceNumber) => ({
    fieldName: 'invoiceNumber',
    value
  }),
  invoicePDF: (value: FieldType_invoicePDF) => ({
    fieldName: 'invoicePDF',
    value
  }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  objectIdEvent: (value: FieldType_objectIdEvent_Pointer) => ({
    fieldName: 'objectIdEvent',
    value
  }),
  paymentSubmitted: (value: FieldType_paymentSubmitted) => ({
    fieldName: 'paymentSubmitted',
    value
  }),
  payout: (value: FieldType_payout) => ({ fieldName: 'payout', value }),
  serviceFee: (value: FieldType_serviceFee) => ({
    fieldName: 'serviceFee',
    value
  }),
  servingsSold: (value: FieldType_servingsSold) => ({
    fieldName: 'servingsSold',
    value
  }),
  totalAmount: (value: FieldType_totalAmount) => ({
    fieldName: 'totalAmount',
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
