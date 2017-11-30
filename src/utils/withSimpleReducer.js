import React from 'react';
import { withReducer } from 'recompose';
import R from 'ramda';
import shallowequal from 'shallowequal';

import { createAction, handleActions } from 'redux-actions';

const componentToWrapFunc = (
  name,
  funcname,
  reducerMap,
  errorsFunc,
  BaseComponent,
) =>
  class ComponentToWrap extends React.Component<*, *> {
    constructor() {
      super();
      this.state = { initial: true, submited: false };
    }

    componentWillReceiveProps(nextProps) {
      if (
        this.state.initial &&
        !shallowequal(this.props[name], nextProps[name])
      ) {
        this.setState({ initial: false });
      }
    }

    render() {
      const onSubmitForm = async submitedValue => {
        const props = this.props;
        this.setState({ submited: true });

        if (props['onSubmitForm']) {
          return await props['onSubmitForm'](submitedValue);
        }

        return submitedValue;
      };

      const props = this.props;
      const dispathcFunc = props[funcname];
      const dispatchMap = R.compose(
        R.fromPairs,
        R.map(actionName => [
          [actionName],
          (...args) => dispathcFunc(createAction(actionName)(...args)),
        ]),
        Object.keys,
      )(reducerMap);

      const value = props[name];
      const errors = errorsFunc ? errorsFunc(value) : null;

      return (
        <BaseComponent
          {...props}
          onSubmitForm={onSubmitForm}
          {...{
            [name]: {
              errors,
              value,
              ...this.state,
              ...dispatchMap,
            },
          }}
        />
      );
    }
  };

export default (
  name,
  reducerMap,
  initialStateFunc,
  errorsFunc,
) => BaseComponent => {
  const funcname = `${name}_dispatch`;

  return class Component extends React.Component<*, *> {
    state = {
      WrappedSimpleReducerComponent: null,
    };
    componentDidMount() {
      const initialState = initialStateFunc(this.props);
      const finalReducer = handleActions(reducerMap, initialState);

      const WrappedSimpleReducerComponent = withReducer(
        name,
        funcname,
        finalReducer,
        initialState,
      )(
        componentToWrapFunc(
          name,
          funcname,
          reducerMap,
          errorsFunc,
          BaseComponent,
        ),
      );

      this.setState({ WrappedSimpleReducerComponent });
    }

    // eslint-disable-next-line
    render() {
      const { WrappedSimpleReducerComponent } = this.state;
      return WrappedSimpleReducerComponent ? (
        <WrappedSimpleReducerComponent {...this.props} />
      ) : null;
    }
  };
};
