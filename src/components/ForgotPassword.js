// @flow

import React from 'react';
import R from 'ramda';

import Alert from 'react-bootstrap/lib/Alert';
import withSimpleState from '../utils/withSimpleState';
import Button from './UIKit/Button';
import BigFormInput from './BigFormInput';
import { checkEmail } from '../utils';
import ValidationDecorator, {
  checkCompose,
  toPlainObject,
} from '../decorators/ValidationDecorator';

import IconsMasterSvg from '../../static/Icons-Master-SVG_return.svg';

const MyFormInput = ValidationDecorator()(props => <BigFormInput {...props} />);

const getStateToSave = props => ({
  //$FlowIssue
  email: props.email,
});

const INVALID_EMAIL = 'ungültige E-Mail';
const RESET = 'Zurücksetzten';
type PropsT = {
  goToLogin: Function,
  reset_password_error: boolean,
  onSubmit: Function,
};
const res: (a: PropsT) => * = R.compose(
  withSimpleState(
    'email',
    ({ email }) => email || '',
    checkCompose(email => checkEmail(email) && INVALID_EMAIL),
  ),
)(props => {
  const {
    goToLogin,
    onSubmit,
    reset_password_error,
    //$FlowIssue
    onSubmitForm,
    //$FlowIssue
    email,
  }: PropsT & {
    email: Object,
    onSubmitForm: Function,
    //$FlowIssue
  } = props;
  let error_alert = null;
  if (reset_password_error) {
    //console
    error_alert = (
      <Alert bsStyle="danger">
        <strong>
          Cannot complete request no user found with email {email.value}
        </strong>
      </Alert>
    );
  }
  return (
    <div className="text-center sign auth-container">
      <div className="logo-image" />
      <div>
        <p style={{ textAlign: 'left' }}>
          <span
            style={{
              cursor: 'pointer',
              textAlign: 'left',
            }}
            onClick={goToLogin}
          >
            <img
              src={IconsMasterSvg}
              style={{
                height: '40px',
                borderRadius: '2px',
                textAlign: 'left',
                boxShadow: 'none',
              }}
            />
          </span>
        </p>

        <small>Forgot Password</small>
        <MyFormInput
          type="text"
          name="email"
          className="center-block"
          placeholder="Email"
          {...email}
        />

        <div className="col-xs-12">
          <Button
            className="center-block"
            onClick={async () => {
              const stateToSubmit = getStateToSave(props);
              await onSubmitForm(stateToSubmit);
              try {
                onSubmit(toPlainObject(stateToSubmit));
              } catch (e) {
                console.log(e);
              }
            }}
            text={RESET}
          />
          {error_alert}
        </div>
      </div>
      <div className="clearfix" />
    </div>
  );
});
export default res;
