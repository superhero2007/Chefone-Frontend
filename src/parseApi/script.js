import R from 'ramda';
import rimraf from 'rimraf';
import generateMethod from './src/generateMethod.js';
import { generateFlowUnion } from './src/share';

import fs from 'fs';

const schemas = JSON.parse(fs.readFileSync('schemas.json', 'utf-8'));

const sort = (a, b) => {
  const nameA = a.toLowerCase(),
    nameB = b.toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};

const transformFieldObj = ([key, { type, ...rest }]) => {
  const parseToFlowTypes = {
    Boolean: 'bool',
    String: 'string',
    Number: 'number',
    GeoPoint: 'ParseGeoPointType',
  };

  if (type === 'Pointer') {
    // const pointerType = `ParsePointer<ParseTypeName${rest.targetClass}>`
    // const classType =`Parse${rest.targetClass}Instance`
    return [
      // [`${key}Pointer`, {type:pointerType,...rest}],
      // [`${key}`, {type:classType, ...rest}],
      [`${key}_Fetch`, { type: `Parse${rest.targetClass}_Fetch`, ...rest }],
      [`${key}_Pointer`, { type: `Parse${rest.targetClass}_Pointer`, ...rest }],
      [`${key}_Query`, { type: `Parse${rest.targetClass}_Query`, ...rest }],
      [
        `${key}_Maybe`,
        {
          type: `Parse${rest.targetClass}_Pointer|Parse${
            rest.targetClass
          }_Fetch`,
          ...rest,
        },
      ],
    ];
  }

  if (type === 'File') {
    return [
      [`${key}_FileIn`, { type: 'ParseFileTypeIn' }],
      [`${key}_FileOut`, { type: 'ParseFileTypeOut' }],
    ];
  }

  return [[key, { type: parseToFlowTypes[type] || type, ...rest }]];
};

const resSchemas = R.compose(
  array => ({
    classes: array,
    classNames: R.pluck('className')(array),
  }),
  R.filter(
    ({ className }) =>
      !R.contains(className, [
        '_Role',
        '_Installation',
        '_Session',
        '_Product',
        'DataErrorReport',
        'Crono',
      ]),
  ),
  R.map(({ fields, ...rest }) => {
    const newFields = R.compose(
      R.fromPairs,
      R.unnest,
      R.map(transformFieldObj),
      R.sort(([a], [b]) => {
        return sort(a, b);
      }),
      R.filter(([key]) => !R.contains(key, ['ACL'])),
      R.toPairs,
    )(fields);

    const dependsOnTypes = R.compose(
      R.uniq,
      R.filter(R.identity),
      // eslint-disable-next-line
      R.map(([key, { targetClass }]) => targetClass),
      R.toPairs,
    )(fields);

    return {
      fields: newFields,
      dependsOnTypes,
      ...rest,
    };
  }),
  R.prop('results'),
)(schemas);

console.log(JSON.stringify(resSchemas, null, 2));

const generateSharedTypes = genFolder =>
  R.compose(
    str => fs.writeFileSync(`${genFolder}/shared.js`, str),
    classNames =>
      generateFlowUnion({
        typeName: 'ParseClassName',
        value: classNames,
      }),
    R.sort(sort),
    R.prop('classNames'),
  );

const generateClasses = genFolder =>
  R.compose(
    R.forEach(([className, str]) =>
      fs.writeFileSync(`${genFolder}/${className}.js`, str),
    ),
    R.map(({ className, fields, dependsOnTypes }) => {
      const obj = R.compose(
        R.fromPairs,
        R.map(([key, { type }]) => [key, { type }]),
        R.sort(([a], [b]) => {
          return sort(a, b);
        }),
        R.toPairs,
      )(fields);

      return [className, generateMethod({ className, obj, dependsOnTypes })];
    }),
    R.sort((a, b) => sort(a.className, b.className)),
    R.prop('classes'),
  );

const generateIndexFile = genFolder =>
  R.compose(
    str => fs.writeFileSync(`${genFolder}/index.js`, str),
    classNames => `
  ${R.compose(
    arr => ['// @flow', ...arr].join('\n'),
    R.map(className => `export * as ${className} from './${className}'`),
  )(classNames)}
`,
    R.prop('classNames'),
  );

const genFolder = 'api';
rimraf.sync(genFolder);
fs.mkdirSync(genFolder);
generateSharedTypes(genFolder)(resSchemas);
generateClasses(genFolder)(resSchemas);
generateIndexFile(genFolder)(resSchemas);
// const res = method({
//   className:'Chef',
//   parameters:[{name:'name1', value:'value1'}]
// })
//
// console.log(res)
//
// fs.writeFileSync('generatedClass.js', res)
