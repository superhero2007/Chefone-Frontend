// @flow
import R from 'ramda';

class ParseError extends Error {
  errorObject: Object;

  constructor(parseObj, { code, message }) {
    super();
    this.name = code;
    this.message = message;
    this.errorObject = parseObj;
  }
}

export const asyncPostProcess = async (procMap: Object, array: Array<*>) => {
  const promises = R.compose(
    R.map(async ([key, val]) => {
      const res = await Promise.all(R.map(val)(array));
      return [key, res];
    }),
    R.toPairs,
  )(procMap);

  const pairs = await Promise.all(promises);
  //$FlowIssue
  return R.fromPairs(pairs);
};

export const asyncPostMix = async (procMap: Object, array: Array<*>) => {
  const resMap = await asyncPostProcess(procMap, array);

  return array.map((item, i) => {
    R.compose(
      R.forEach(([key, value]) => {
        item[key] = value[i];
      }),
      R.toPairs,
    )(resMap);

    return item;
  });
};

export const parsePromise = (
  obj: Object,
  parseFunc: Function,
  params: any,
): Promise<Object> =>
  new Promise((resolve: Function, reject: Function) => {
    params = params || [];
    const finalParams = [
      ...params,
      {
        success: (...args) => {
          resolve(...args);
        },
        error: (...args) => {
          console.log(args);
          reject(new ParseError(args[0], args[1]));
        },
      },
    ];
    parseFunc.apply(obj, finalParams);
  });

function removeEmptyValues(obj) {
  for (var propName in obj) {
    if (obj[propName] === null) {
      delete obj[propName];
    } else if (typeof obj === 'object') {
      removeEmptyValues(obj[propName]);
    }
  }
  return obj;
}
type JsonPostSimpleType = any;
export const sendJsonPostSimple = async (params: JsonPostSimpleType) => {
  let { url, data, noRemoveEmpty, headers } = params;
  data = noRemoveEmpty ? data : removeEmptyValues(data);

  return await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  }).then(response => {
    if (response.status >= 400) {
      throw Error(
        'Looks like there was a problem. Status Code: ' + response.status,
      );
    }
    return response;
  });
};

export const sendJsonPost = async (params: JsonPostSimpleType) => {
  let response = await sendJsonPostSimple(params);

  return await response.json();
};
