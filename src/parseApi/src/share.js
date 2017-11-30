// @flow

import R from 'ramda';
import prettier from 'lapanoid-prettier';

export const format = (source: string) =>
  prettier.format(source, {
    printWidth: 80,
    tabWidth: 2,
    singleQuote: true,
    trailingComma: false,
    bracketSpacing: true,
    parser: 'flow',
  });

const generateDeclareType = ({
  typeName,
  body,
}: {
  typeName: string,
  body: string,
}) => `export type ${typeName} = ${body}`;

const generateObj = (body: string, exact?: boolean) => `{${exact ? '|' : ''}
  ${body}
${exact ? '|' : ''}}`;

const generateObjTypeRaw = ({ name, body }: { name: string, body: string }) =>
  `export const ${name} = {
  ${body}
}`;

const generateObjTypeObjectFields = (obj: Object) =>
  `${R.compose(
    arr => arr.join(''),
    R.map(
      ([key, value]) => `
  ${key}${value},`,
    ),
    R.toPairs,
  )(obj)}`;

export const generateFlowUnion = ({
  typeName,
  value,
}: {
  typeName: string,
  value: Array<string>,
}) =>
  generateDeclareType({
    typeName,
    body: R.compose(arr => arr.join('|'), R.map(value => `'${value}'`))(value),
  });

const genFieldTypeName = (fieldName: string) => `FieldType_${fieldName}`;
export const genQueryTypeName = (className: string) => `${className}_Query`;

export const genFieldsHelpers = (obj: Object) => {
  console.log(obj);
  const toBody = R.compose(
    R.fromPairs,
    R.map(key => {
      const typeName = genFieldTypeName(key);
      const newKey = key.replace('_Pointer', '').replace('_FileIn', '');

      return [newKey, `:(value:${typeName})=>({fieldName:'${newKey}',value})`];
    }),
    R.uniq,
    R.map(([key]) =>
      key
        .replace('_Query', '')
        .replace('_Fetch', '')
        .replace('_Maybe', ''),
    ),
    R.filter(([key]) => !R.contains('_FileOut')(key)),
    R.toPairs,
  )(obj);
  console.log(toBody);
  return generateObjTypeRaw({
    name: 'Field',
    body: generateObjTypeObjectFields(toBody),
  });
};

export const generateFlowFieldTypes = (obj: Object) => {
  return R.compose(
    arr => arr.join('\n'),
    R.map(([key, { type }]) => {
      const res = generateDeclareType({
        typeName: genFieldTypeName(key),
        body: type,
      });
      return res;
    }),
    R.toPairs,
  )(obj);
};

export const generateFlowQueryType = ({
  className,
  obj,
}: {
  className: string,
  obj: Object,
}) => {
  return generateDeclareType({
    typeName: genQueryTypeName(className),
    body: generateObj(
      generateObjTypeObjectFields(
        R.compose(
          R.fromPairs,
          R.map(([key]) => {
            const typeName = genFieldTypeName(key);
            const newKey = key.replace('_Pointer', '').replace('_FileIn', '');
            const value = `?:${typeName}`;
            return [newKey, value];
          }),
          R.filter(
            ([key]) =>
              !R.contains('_Query')(key) &&
              !R.contains('_Fetch')(key) &&
              !R.contains('_Maybe')(key),
          ),
          R.filter(([key]) => !R.contains('_FileOut')(key)),
          R.toPairs,
        )(obj),
      ),
      true,
    ),
  });
};

export const generateFlowFetchType = ({
  className,
  obj,
}: {
  className: string,
  obj: Object,
}) => {
  return generateDeclareType({
    typeName: `${className}_Fetch`,
    body: generateObj(
      generateObjTypeObjectFields(
        R.compose(
          obj => ({ ...obj, __type: ":'Object'" }),
          R.fromPairs,
          R.map(([key]) => {
            const newKey = key.replace('_Maybe', '').replace('_FileOut', '');
            const value = `:${genFieldTypeName(key)}`;
            return [newKey, value];
          }),
          R.filter(
            ([key]) =>
              !R.contains('_Query')(key) &&
              !R.contains('_Fetch')(key) &&
              !R.contains('_Pointer')(key),
          ),
          R.filter(([key]) => !R.contains('_FileIn')(key)),
          R.toPairs,
        )(obj),
      ),
      true,
    ),
  });
};
