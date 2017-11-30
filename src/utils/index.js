// @flow

import CSSModules from 'react-css-modules';
import R from 'ramda';

export const listFromNumber = (length: number): Array<number> =>
  R.times(R.identity, length);

export const listFromInterval = (
  fromNumber: number,
  toNumber: number,
): Array<number> =>
  listFromNumber(toNumber - fromNumber).map(item => item + fromNumber);

export const promiseDispatch = (
  type: string,
  func: Function,
  meta: ?Object,
) => ({
  type,
  meta,
  payload: {
    promise: func,
  },
});

export const fixedCSSModules = (styles: Object, options?: CssOptions) => <T>(
  Comp: T,
): T => CSSModules(Comp, styles, options);

export const safeGetImage = (obj: Object, name: string) => {
  const url = obj[name] && obj[name].url;

  return url && url.replace('http://', 'https://');
};

export const checkEmail = (email: string) =>
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
