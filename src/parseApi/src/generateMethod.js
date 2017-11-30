// @flow

import {
  format,
  generateFlowFieldTypes,
  genFieldsHelpers,
  generateFlowQueryType,
  genQueryTypeName,
  generateFlowFetchType,
} from './share';

const generateDepTypes = (dependsOnTypes: Array<string>) =>
  dependsOnTypes
    .map(
      depTypeName => `
import type {ParseTypeName${depTypeName}, Maybe${depTypeName}, Parse${
        depTypeName
      }_Pointer, Parse${depTypeName}_Fetch, Parse${
        depTypeName
      }_Query} from './${depTypeName}'
`,
    )
    .join('');

export default ({
  className,
  obj,
  dependsOnTypes,
}: {
  className: string,
  obj: *,
  dependsOnTypes: Array<string>,
}) =>
  format(
    `
// @flow
import R from 'ramda'
import {getParseObjects, getParseObjectsMultiple, postProcessGet, createParseObject, updateParseObject, deleteParseObject} from '../src/runtime'
import type {ParseQueryType, ParseFileTypeOut, ParseFileTypeIn, ParseGeoPointType, ParsePointer, ParseInstance} from '../src/runtime'
import type {ParseClassName} from './shared'

${generateDepTypes(dependsOnTypes)}

const myType: ParseClassName = '${className}';
export type ParseTypeName${className} = '${className}';

${generateFlowFieldTypes(obj)}

${generateFlowQueryType({ className, obj })}

${generateFlowFetchType({ className, obj })}

export type Parse${className}_Fetch = ${className}_Fetch;
export type Parse${className}Instance = ${className}_Fetch;
export type Parse${className}_Query = ${className}_Query;
export type Parse${className}_Pointer = ParsePointer<ParseTypeName${className}>;
export type Parse${className}Pointer = Parse${className}_Pointer;
type MyInstanceType = ${className}_Fetch;
type MyPointerType = Parse${className}_Pointer;
export type Maybe${className} = MyInstanceType|MyPointerType
type MyMaybeType = Maybe${className};

type MyParseType = ${genQueryTypeName(className)};
type MyQueryType = ParseQueryType<MyParseType>

export const EnsureInstance = (obj:?MyMaybeType):MyInstanceType=>{
  if(!obj || obj.__type === 'Pointer') {
    throw Error('${className} not fetched')
  }
  return obj
}

export const Create = async (obj:MyParseType):Promise<string> =>{
  return await createParseObject(myType, obj);
}

export const Delete = async (id:string):Promise<*>=>{
  return deleteParseObject(myType, id)
}

export const Set = async (obj:MyParseType):Promise<string> => {
  return await updateParseObject(myType, obj);
};

export const setOrCreate = async (obj:MyParseType)=> {
  const objectId = obj.objectId;
  if (objectId) {
    return await Set(obj);
  }

  return await Create(obj);
}

export const Get = async (queryParams:MyQueryType):Promise<Array<MyInstanceType>>=> {
  const res = await getParseObjects(myType, 'find', queryParams)
  return postProcessGet(res);
};

export const Or = async (arrayOfQueryParams:Array<MyQueryType>, selfQueryParams:MyQueryType):Promise<Array<MyInstanceType>> => {
  const res = await getParseObjectsMultiple(myType,
'find',
arrayOfQueryParams,
selfQueryParams);
  return postProcessGet(res);
};

export const Count = async (queryParams:MyQueryType):Promise<number>=> {
  const [res] = await getParseObjects(myType, 'count', queryParams)
  return res;
};

export const Pointer = (id:string):MyPointerType=>{
  const ObjectToCreate = Parse.Object.extend(myType);
  const res = new ObjectToCreate();
  res.id = id;
  res.className = myType;
  return res
}

${genFieldsHelpers(obj)}

export const GetById = async (id:string):Promise<MyInstanceType> => {
  const res = await getParseObjects(myType, 'find', {equalTo:[{fieldName:'objectId',value:id}]})
  const [result] = postProcessGet(res)
  const finalRes = {...result, id, __type: 'Object'}

  return ((finalRes:any):MyInstanceType);
};
`,
  );
