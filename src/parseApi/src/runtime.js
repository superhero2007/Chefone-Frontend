// @flow

import R from 'ramda';

export type ParseFileTypeIn = {
  __type: 'File',
  name: string,
  url: string | { base64: string },
};

export type ParseFileTypeOut = {
  __type: 'File',
  name: string,
  url: string,
};

export type ParseGeoPointType = {|
  __type: 'GeoPoint',
  latitude: number,
  longitude: number,
|};

export type ParsePointer<T> = {|
  __type: 'Pointer',
  objectId: string,
  className: T,
|};

export type ParseInstance<T> = T & { __type: 'Object', objectId: string };

class ParseError extends Error {
  errorObject: Object;

  constructor(parseObj, { code, message }) {
    super();
    this.name = code;
    this.message = message;
    this.errorObject = parseObj;
  }
}

const parsePromise = (obj: *, parseFunc: Function, params: *): Promise<*> =>
  new Promise((resolve: Function, reject: Function) => {
    params = params || [];
    const finalParams = [
      ...params,
      {
        success: (...args) => {
          resolve(...args);
        },
        error: (...args) => {
          if (args[0].code && args[0].message) {
            reject(args[0]);
            return;
          }
          reject(new ParseError(args[0], args[1]));
        },
      },
    ];
    parseFunc.apply(obj, finalParams);
  });

const toParseTransform = (key: string, val: any, addItemToSave: Function) => {
  if (!val) {
    return val;
  }

  if (typeof val === 'object' && val.__type) {
    if (val.__type === 'File') {
      const file = new Parse.File(val.name, val.url);
      addItemToSave(file);
      return file;
    }
    if (val.__type === 'GeoPoint') {
      return new Parse.GeoPoint(val.latitude, val.longitude);
    }

    return Parse.Object.fromJSON(val);
  }

  return val;
};

const setToObject = <T: Object>(
  obj: Object,
  fieldsMap: T,
  addItemToSave: Function,
) =>
  R.compose(
    R.forEach(([key, val]) =>
      obj.set(key, toParseTransform(key, val, addItemToSave)),
    ),
    R.filter(([key, val]) => !!key && val !== undefined),
    R.toPairs,
  )(fieldsMap);

async function modifyParseObject<T: Object>(obj: Object, fieldsMap: T) {
  if (!obj) {
    throw Error('object should be defined!');
  }
  let itemsToSave = [];
  setToObject(obj, fieldsMap, itemToSave => itemsToSave.push(itemToSave));
  const promisesToSave = itemsToSave.map(itemToSave => itemToSave.save());

  console.log(fieldsMap);
  console.log(obj);
  console.log('saving nested...');
  await Promise.all(promisesToSave);
  console.log('saved nested');
  console.log(obj.toJSON());
  console.log('saving...');
  const res: T = await obj.save();
  console.log('saved');
  return res.id;
}

export async function createParseObject<T: Object, S: string>(
  objectType: S,
  fieldsMap: T,
) {
  const Obj = Parse.Object.extend(objectType);
  const obj = new Obj();

  return await modifyParseObject(obj, fieldsMap);
}

async function fetchObject<T: Object, S: string>(
  objectType: S,
  id: string,
): Promise<T> {
  const res = await getParseObjects(objectType, 'find', {
    equalTo: [
      {
        fieldName: 'objectId',
        value: id,
      },
    ],
  });

  return res[0];
}

export async function updateParseObject<T: Object, S: string>(
  objectType: S,
  fieldsMap: T,
) {
  const Obj = Parse.Object.extend(objectType);
  const obj = new Obj();
  obj.id = fieldsMap.objectId;
  delete fieldsMap.objectId;
  return await modifyParseObject(obj, fieldsMap);
}

export async function deleteParseObject<S: string>(objectType: S, id: string) {
  const obj = await fetchObject(objectType, id);

  obj.destroy();

  return Promise.resolve();
}

// TODO generate queries by field
type ParseEqualQueryType<T> = {|
  fieldName: $Enum<T>,
  value: string | number | boolean | Object,
|};

type ContainedParams<T> = {|
  fieldName: $Enum<T>,
  values: Array<string>,
|};

type MatchesKeyInQueryType<T> = {|
  first: $Enum<T>,
  second: $Enum<T>,
  query: ParseQueryType<T>,
|};

type ParseMethod =
  | 'find'
  | 'count'
  | 'save'
  | 'get'
  | 'fetch'
  | 'destroy'
  | 'first';

// type ComparableType = number | Date

export type ParseQueryType<T> = {|
  equalTo?: Array<?ParseEqualQueryType<T>>,
  notEqualTo?: Array<?ParseEqualQueryType<T>>,
  skip?: number,
  limit?: number,
  include?: Array<string>,
  descending?: Array<$Enum<T>>,
  ascending?: Array<$Enum<T>>,
  exists?: $Enum<T>,
  doesNotExist?: $Enum<T>,
  lessThan?: ParseEqualQueryType<T>,
  lessThanOrEqualTo?: ParseEqualQueryType<T>,
  greaterThan?: ParseEqualQueryType<T>,
  greaterThanOrEqualTo?: ParseEqualQueryType<T>,
  containedIn?: ContainedParams<T>,
  containsAll?: ContainedParams<T>,
  notContainedIn?: ContainedParams<T>,
  matchQueries?: Array<{|
    fieldName: $Enum<T>,
    queryType: string,
    query: ParseQueryType<*>,
  |}>,
  matchesKeyInQuery?: MatchesKeyInQueryType<T>,
  doesNotMatchKeyInQuery?: MatchesKeyInQueryType<T>,
  select?: Array<$Enum<T>>,
  startsWith?: ParseEqualQueryType<T>,
|};

const buildQuery = <T: Object, S: string>(
  type: S,
  queryParams: ParseQueryType<T>,
  query: *,
) => {
  const {
    equalTo,
    notEqualTo,
    matchQueries,
    limit,
    skip,
    descending,
    exists,
    doesNotExist,
    include,
    ascending,
    lessThan,
    lessThanOrEqualTo,
    greaterThan,
    greaterThanOrEqualTo,
    containedIn,
    containsAll,
    notContainedIn,
    matchesKeyInQuery,
    doesNotMatchKeyInQuery,
    select,
    startsWith,
  } = queryParams;

  if (equalTo) {
    equalTo.filter(R.identity).forEach(({ fieldName, value }) => {
      query.equalTo(fieldName, value);
    });
  }

  if (notEqualTo) {
    notEqualTo.filter(R.identity).forEach(({ fieldName, value }) => {
      query.notEqualTo(fieldName, value);
    });
  }

  if (matchQueries) {
    matchQueries.forEach(matchesQuery => {
      const { query: matchQ, fieldName, queryType } = matchesQuery;
      query.matchesQuery(
        fieldName,
        buildQuery(queryType, matchQ, new Parse.Query(queryType)),
      );
    });
  }

  if (include) {
    include.forEach(item => {
      query.include(item);
    });
  }

  if (limit) {
    query.limit(limit);
  }

  if (skip) {
    query.skip(skip);
  }

  if (descending) {
    query.descending(descending.join(','));
  }

  if (ascending) {
    query.ascending(ascending.join(','));
  }

  if (exists) {
    query.exists(exists);
  }

  if (doesNotExist) {
    query.doesNotExist(doesNotExist);
  }

  if (lessThan) {
    const { fieldName, value } = lessThan;
    query.lessThan(fieldName, value);
  }

  if (lessThanOrEqualTo) {
    const { fieldName, value } = lessThanOrEqualTo;
    query.lessThanOrEqualTo(fieldName, value);
  }

  if (greaterThan) {
    const { fieldName, value } = greaterThan;
    query.greaterThan(fieldName, value);
  }

  if (greaterThanOrEqualTo) {
    const { fieldName, value } = greaterThanOrEqualTo;
    query.greaterThanOrEqualTo(fieldName, value);
  }

  if (containedIn) {
    query.containedIn(containedIn.fieldName, containedIn.values);
  }

  if (containsAll) {
    query.containsAll(containsAll);
  }

  if (notContainedIn) {
    query.notContainedIn(notContainedIn);
  }

  if (select) {
    query.select(select);
  }

  if (startsWith) {
    query.startsWith(startsWith);
  }

  if (matchesKeyInQuery) {
    throw Error('not implemented yet');
  }

  if (doesNotMatchKeyInQuery) {
    throw Error('not implemented yet');
  }
  return query;
};

const postProcessParse = (res: *) => {
  if (typeof res === 'number') {
    return res;
  }
  return R.map(item => {
    if (typeof item === 'object') {
      item.__type = 'Object';
    }
    return item;
  })(res);
};

export async function getParseObjects<T: Object, S: string>(
  type: S,
  method: ParseMethod,
  queryParams: ParseQueryType<T>,
): Promise<Array<*>> {
  const query = buildQuery(type, queryParams, new Parse.Query(type));

  let res = await parsePromise(query, query[method]);
  if (method === 'count') {
    res = [res];
  }

  return postProcessParse(res);
}

export async function getParseObjectsMultiple<T: Object, S: string>(
  type: S,
  method: ParseMethod,
  arrayOfQueryParams: Array<ParseQueryType<T>>,
  selfQueryParams: ParseQueryType<T>,
): Promise<Array<T>> {
  const arrayOfQueries = R.map(queryParams =>
    buildQuery(type, queryParams, new Parse.Query(type)),
  )(arrayOfQueryParams);

  const query = buildQuery(
    type,
    selfQueryParams,
    Parse.Query.or.apply(null, arrayOfQueries),
  );

  const res = await parsePromise(query, query[method]);
  //$FlowIssue
  return postProcessParse(res);
}

function traverse(o, func) {
  for (const i in o) {
    //$FlowIssue
    const { action, val } = func(i, o[i]);
    if (action === 'replace') {
      o[i] = val;
    }
    if (o[i] !== null && typeof o[i] == 'object') {
      //going on step down in the object tree!!
      traverse(o[i], func);
    }
  }
}

const toObj = (parseObj: *) => {
  const actionKeep = { action: 'keep' };
  const obj = parseObj.toJSON();

  traverse(
    obj,
    R.compose((key, item) => {
      if (
        item &&
        item.url &&
        typeof item.url === 'string' &&
        item.__type &&
        item.__type === 'File'
      ) {
        return {
          action: 'replace',
          val: {
            ...item,
            url: item.url ? item.url.replace('http://', 'https://') : item.url,
          },
        };
      }
      if (item && item.__type === 'Date') {
        return {
          action: 'replace',
          val: new Date(item.iso),
        };
      }
      if (key === 'createdAt' || key === 'updatedAt') {
        return {
          action: 'replace',
          //$FlowIssue
          val: new Date(item),
        };
      }
      return actionKeep;
    }),
  );
  return obj;
};

export const postProcessGet = <T>(parseObj: Array<T>) => {
  //$FlowIssue
  const res = parseObj.map(obj => (!!obj ? toObj(obj) : obj));
  return (res: any);
};

export const ParseFile = (
  name: string,
  url: string | { base64: string },
): ParseFileTypeIn => ({
  __type: 'File',
  name,
  url:
    url && typeof url === 'string' ? url.replace('http://', 'https://') : url,
});

export const ParseGeoPoint = (
  latitude: number,
  longitude: number,
): ParseGeoPointType => ({
  __type: 'GeoPoint',
  latitude,
  longitude,
});
