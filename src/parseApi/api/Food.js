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

const myType: ParseClassName = 'Food';
export type ParseTypeNameFood = 'Food';

export type FieldType_chef_Fetch = ParseChef_Fetch;
export type FieldType_chef_Maybe = ParseChef_Pointer | ParseChef_Fetch;
export type FieldType_chef_Pointer = ParseChef_Pointer;
export type FieldType_chef_Query = ParseChef_Query;
export type FieldType_createdAt = Date;
export type FieldType_food_description = string;
export type FieldType_food_description_vegan = string;
export type FieldType_food_description_vegetarian = string;
export type FieldType_image1_FileIn = ParseFileTypeIn;
export type FieldType_image1_FileOut = ParseFileTypeOut;
export type FieldType_image2_FileIn = ParseFileTypeIn;
export type FieldType_image2_FileOut = ParseFileTypeOut;
export type FieldType_image3_FileIn = ParseFileTypeIn;
export type FieldType_image3_FileOut = ParseFileTypeOut;
export type FieldType_meta_image_FileIn = ParseFileTypeIn;
export type FieldType_meta_image_FileOut = ParseFileTypeOut;
export type FieldType_nutrition = number;
export type FieldType_objectId = string;
export type FieldType_organic = boolean;
export type FieldType_title = string;
export type FieldType_updatedAt = Date;

export type Food_Query = {|
  chef?: FieldType_chef_Pointer,
  createdAt?: FieldType_createdAt,
  food_description?: FieldType_food_description,
  food_description_vegan?: FieldType_food_description_vegan,
  food_description_vegetarian?: FieldType_food_description_vegetarian,
  image1?: FieldType_image1_FileIn,
  image2?: FieldType_image2_FileIn,
  image3?: FieldType_image3_FileIn,
  meta_image?: FieldType_meta_image_FileIn,
  nutrition?: FieldType_nutrition,
  objectId?: FieldType_objectId,
  organic?: FieldType_organic,
  title?: FieldType_title,
  updatedAt?: FieldType_updatedAt
|};

export type Food_Fetch = {|
  chef: FieldType_chef_Maybe,
  createdAt: FieldType_createdAt,
  food_description: FieldType_food_description,
  food_description_vegan: FieldType_food_description_vegan,
  food_description_vegetarian: FieldType_food_description_vegetarian,
  image1: FieldType_image1_FileOut,
  image2: FieldType_image2_FileOut,
  image3: FieldType_image3_FileOut,
  meta_image: FieldType_meta_image_FileOut,
  nutrition: FieldType_nutrition,
  objectId: FieldType_objectId,
  organic: FieldType_organic,
  title: FieldType_title,
  updatedAt: FieldType_updatedAt,
  __type: 'Object'
|};

export type ParseFood_Fetch = Food_Fetch;
export type ParseFoodInstance = Food_Fetch;
export type ParseFood_Query = Food_Query;
export type ParseFood_Pointer = ParsePointer<ParseTypeNameFood>;
export type ParseFoodPointer = ParseFood_Pointer;
type MyInstanceType = Food_Fetch;
type MyPointerType = ParseFood_Pointer;
export type MaybeFood = MyInstanceType | MyPointerType;
type MyMaybeType = MaybeFood;

type MyParseType = Food_Query;
type MyQueryType = ParseQueryType<MyParseType>;

export const EnsureInstance = (obj: ?MyMaybeType): MyInstanceType => {
  if (!obj || obj.__type === 'Pointer') {
    throw Error('Food not fetched');
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
  chef: (value: FieldType_chef_Pointer) => ({ fieldName: 'chef', value }),
  createdAt: (value: FieldType_createdAt) => ({
    fieldName: 'createdAt',
    value
  }),
  food_description: (value: FieldType_food_description) => ({
    fieldName: 'food_description',
    value
  }),
  food_description_vegan: (value: FieldType_food_description_vegan) => ({
    fieldName: 'food_description_vegan',
    value
  }),
  food_description_vegetarian: (
    value: FieldType_food_description_vegetarian
  ) => ({ fieldName: 'food_description_vegetarian', value }),
  image1: (value: FieldType_image1_FileIn) => ({ fieldName: 'image1', value }),
  image2: (value: FieldType_image2_FileIn) => ({ fieldName: 'image2', value }),
  image3: (value: FieldType_image3_FileIn) => ({ fieldName: 'image3', value }),
  meta_image: (value: FieldType_meta_image_FileIn) => ({
    fieldName: 'meta_image',
    value
  }),
  nutrition: (value: FieldType_nutrition) => ({
    fieldName: 'nutrition',
    value
  }),
  objectId: (value: FieldType_objectId) => ({ fieldName: 'objectId', value }),
  organic: (value: FieldType_organic) => ({ fieldName: 'organic', value }),
  title: (value: FieldType_title) => ({ fieldName: 'title', value }),
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
