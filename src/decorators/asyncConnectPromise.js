// @flow

import { asyncConnect } from '../redux-async-connect';
export default (promiseFunc: any) => (Component: React$ComponentType<*>) => {
  return asyncConnect([
    {
      promise: promiseFunc,
    },
  ])(Component);
};
