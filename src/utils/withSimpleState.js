// @flow

import React from 'react';
import { withState } from 'recompose';

const impl = (name, initialStateFunc, errorsFunc) => BaseComponent => {
  const myName = name;
  const funcname = `${name}_onChange`;

  return withState(myName, funcname, state => {
    const initValue = initialStateFunc(state);
    const myState = state[myName];
    return {
      onChange: myState && myState.onChange,
      value: initValue,
      initial: true,
      errors: errorsFunc ? errorsFunc(initValue) : null,
    };
  })(props => {
    const onSubmitForm = async submitedValue => {
      props[funcname]({
        ...props[name],
        submited: true,
      });

      if (props['onSubmitForm']) {
        return await props['onSubmitForm'](submitedValue);
      }

      return submitedValue;
    };

    const onChange = event => {
      if (event && event.target) {
        if (event.target.type === 'checkbox') {
          event = event.target.checked;
        } else if (event.target.value || event.target.value === '') {
          event = event.target.value;
        }
      }

      const errors = errorsFunc ? errorsFunc(event) : null;

      const oldValue = props[name];

      const valueToEmit = {
        ...oldValue,
        value: event,
        errors,
      };

      props[funcname](valueToEmit);

      if (oldValue.onChange) {
        oldValue.onChange(valueToEmit.value);
      }
    };

    return (
      <BaseComponent
        {...props}
        onSubmitForm={onSubmitForm}
        {...{
          [name]: {
            ...props[name],
            onChange,
          },
        }}
      />
    );
  });
};

export type Changeble<T> = {
  value: T,
  onChange: Function,
};

/* eslint-disable */
type Type = <K, T, C>(
  name: string,
  initialStateFunc: (props: K) => T,
  errorsFunc?: Function,
) => (BaseComponent: C) => C;

const res = ((impl: any): Type);

export default res;
