// @flow

import React from 'react';
import R from 'ramda';
import './ValidationDecorator.less';

export const checkCompose = (...checks: Array<Function>) => {
  return (value: Object) =>
    checks.map(checkFunc => checkFunc(value)).filter(id => id);
};

const ErrorComponent = ({ errors }) => (
  <div className="validation-errors-container">
    {errors &&
      errors.map((error, i) => (
        <div className="validation-error" key={i}>
          {error}
        </div>
      ))}
  </div>
);

export default (MyErrorComponent: React$ComponentType<*> = ErrorComponent) => (
  Component: React$ComponentType<*>,
) => (props: Object) => {
  let style = {};

  let { errors, initial, showError, submited } = props;

  const allowToShow = submited || !initial;

  showError = showError || !!(allowToShow && errors && errors.length);

  if (showError) {
    style = {
      border: 'solid red 1px',
    };
  }

  return (
    <div>
      <Component
        style={{
          ...(props.style || {}),
          ...style,
        }}
        {...props}
      />
      {showError && <MyErrorComponent {...props} />}
    </div>
  );
};

//$FlowIssue
export const hasError = R.compose(
  R.not,
  R.isEmpty,
  R.flatten,
  R.filter(R.identity),
  R.map(arr => (arr[1] ? arr[1].errors : null)),
  R.toPairs,
);

export const timeoutP = (time: number): Promise<number> =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

export const rejectP = (time: number): Promise<number> =>
  new Promise((_, reject) => {
    setTimeout(reject, time);
  });

export const toPlainObject = R.compose(
  R.fromPairs,
  //$FlowIssue
  R.map(([key, { value }]) => [key, value]),
  R.toPairs,
);

export const progressPendingPromise = (nextButtonState: Object) => (
  pendingPromiseFunc: Function,
  successPromiseFunc?: Function,
) => async (state: Object) => {
  nextButtonState.onChange('loading');
  await timeoutP(500);
  if (hasError(state)) {
    throw Error('Validation errors');
  }

  const plainObj = toPlainObject(state);

  await pendingPromiseFunc(plainObj);

  if (successPromiseFunc) {
    return await successPromiseFunc(plainObj);
  }
  return plainObj;
};
