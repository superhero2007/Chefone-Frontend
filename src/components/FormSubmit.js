import {
  compose,
  cond,
  is,
  identity,
  pipe,
  T,
  prop,
  objOf,
  props as getProps,
} from 'ramda';
import { withProps, withHandlers } from 'recompose';

import { toPlainProps } from '../decorators/ValidationDecorator';
import withSimpleState from '../utils/withSimpleState';

const withPlainState = (propName: string) =>
  withSimpleState(propName, prop(propName));

type PropsSelector = (props: Object) => Object;

export const submittedProps = (
  submit: string[] | PropsSelector,
  statePropName: string = 'stateToSubmit',
) =>
  pipe(
    cond([[is(Array), toPlainProps], [is(Function), identity], [T, identity]]),
    (fn: PropsSelector): PropsSelector => pipe(fn, objOf(statePropName)),
    withProps,
    //$FlowIssue
  )(submit);

const formSubmit = (
  actionName: string,
  submitButtonName: string,
  statePropName: string,
) => (props: Object) => async event => {
  event.preventDefault();
  const [submitButtonState, onSubmit, stateToSubmit] = getProps(
    [submitButtonName, actionName, statePropName],
    props,
  );
  submitButtonState.onChange('loading');

  try {
    await onSubmit(stateToSubmit);
    submitButtonState.onChange('success');
  } catch (e) {
    console.log(e);
    submitButtonState.onChange('error');
  }
};

const FormSubmit = (
  submitter = 'formSubmit',
  action = 'onSubmit',
  button = 'submitButtonState',
  stateProp = 'stateToSubmit',
) =>
  compose(
    withPlainState(button),
    withHandlers({
      [submitter]: formSubmit(action, button, stateProp),
    }),
  );

export default FormSubmit;
