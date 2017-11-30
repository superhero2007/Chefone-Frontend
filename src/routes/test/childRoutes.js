//@flow

import React from 'react';
import R from 'ramda';
import { fixtures } from '../../components';

console.log('!!!!');
console.log(fixtures);

const getFixturesPaths = (fixtures, prefix = []) => {
  const finalFixtures = ((fixtures: any): { [key: string]: any });
  const isFirstLowercase = key => key[0] !== key[0].toUpperCase();

  return R.compose(
    R.flatten,
    R.map(([key, value]) => {
      const pathname =
        key !== 'fixtures' && !isFirstLowercase(key)
          ? [...prefix, key]
          : prefix;
      let childLinks = [];
      if (value.fixtures) {
        childLinks = getFixturesPaths(value.fixtures, pathname);
      }

      return [
        ...childLinks,
        ...(isFirstLowercase(key) ? [[...prefix, key].join('/')] : []),
      ];
    }),
    R.toPairs,
  )(finalFixtures);
};
function isFunction(functionToCheck) {
  var getType = {};
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === '[object Function]'
  );
}
const getChildrenRoutes = R.map((pathToFixture: string) => {
  const arr = pathToFixture.split('/');
  const proc = (arr, fixtureMap) => {
    const [head, ...rest] = arr;
    if (arr.length === 2) {
      const fixture = fixtureMap[head].fixtures[arr[1]];
      const Component = fixtureMap[head].default;
      let component;
      if (isFunction(fixture)) {
        component = fixture;
      } else {
        component = class extends React.Component<*, *> {
          render() {
            return <Component {...fixture} />;
          }
        };
      }
      return {
        path: pathToFixture,
        component,
      };
    }
    return proc(rest, fixtureMap[head].fixtures);
  };
  return proc(arr, fixtures);
});

console.log('fixtures', fixtures);
const paths = getFixturesPaths(fixtures);
console.log('getFixturesPaths', paths);
//$FlowIssue
const childRoutes = getChildrenRoutes(paths);

console.log('getFixturesPaths', getFixturesPaths);

export default childRoutes;
