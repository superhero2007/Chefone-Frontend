// @flow

export * as fixtures from './fixtures';
import React from 'react';

import R from 'ramda';

import Button from '../../UIKit/Button';
import withSimpleState from '../../../utils/withSimpleState';
import type { Changeble } from '../../../utils/withSimpleState';
import { checkEmail } from '../../../utils';
import { toPlainObject } from '../../../decorators/ValidationDecorator';

import { fixedCSSModules } from '../../../utils';
import { Row, Col } from 'react-flexbox-grid';

import Header from '../Header';
import styles from './index.module.less';
import facebookPlain from '../../../../static/icons/icon_facebook_plain.svg';

const LINK_TO_FB_ALT = 'Link zu unserer Facebook-Präsenz';

const OR = 'oder';
const EMAIL_PLACEHOLDER = 'eMail-Adresse';
const PASSWORD = 'Passwort';
const PASSWORD_FORGOT = 'Passwort vergessen?';

const TITLE = 'Hello! Wilkommen zurück.';
const SUB_TITLE = 'Melde dich mit deiner E-Mail an.';

const getStateToSave = props => ({
  email: props.email,
  password: props.password,
});
type BtnState = 'error' | 'success' | 'pending' | 'initial';
export type PropsT = {
  noPadding?: boolean,
  onSubmit: Function,
  goToSignUp: Function,
  signinFacebook: Function,
  forgotPassword: Function,
};
type InnerPropsT = {
  email: Changeble<string>,
  password: Changeble<string>,
  submitButtonState: Changeble<BtnState>,
  fbButtonState: Changeble<BtnState> /* onSubmitForm:Function,*/,
} & PropsT;
export default R.compose(
  withSimpleState('fbButtonState', ({ fbButtonState }) => fbButtonState),
  withSimpleState(
    'submitButtonState',
    ({ submitButtonState }) => submitButtonState,
  ),
  withSimpleState('email', ({ email }) => email || '', checkEmail),
  withSimpleState(
    'password',
    ({ password }) => password || '',
    value => !value,
  ),
  fixedCSSModules(styles),
)(
  class extends React.Component<*, *> {
    props: InnerPropsT;
    render() {
      const props = this.props;
      const {
        noPadding,
        forgotPassword,
        email,
        password,
        submitButtonState,
        onSubmit,
        goToSignUp,
        signinFacebook,
        fbButtonState,
      } = props;

      const fbButton = (
        <Button
          width="100%"
          mode="fb"
          styleName="facebook"
          onClick={async () => {
            fbButtonState.onChange('loading');
            try {
              await signinFacebook({});
              fbButtonState.onChange('success');
            } catch (e) {
              console.log(e);
              fbButtonState.onChange('error');
            }
          }}
          text={
            <span>
              {fbButtonState.value === 'loading' ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                <img src={facebookPlain} alt={LINK_TO_FB_ALT} />
              )}
            </span>
          }
        />
      );
      return (
        <div styleName="component" style={noPadding ? { padding: 0 } : {}}>
          <Header title={TITLE} subTitle={SUB_TITLE} />

          <Row>
            <Col xs={12}>
              <form
                onSubmit={async event => {
                  event.preventDefault();
                  submitButtonState.onChange('loading');
                  const stateToSubmit = toPlainObject(getStateToSave(props));
                  try {
                    await onSubmit(stateToSubmit);
                    submitButtonState.onChange('success');
                  } catch (e) {
                    console.log(e);
                    submitButtonState.onChange('error');
                  }
                }}
              >
                <div styleName="input-wrapper">
                  <input
                    type="email"
                    placeholder={EMAIL_PLACEHOLDER}
                    className="form-control"
                    required
                    {...email}
                  />
                </div>
                <div styleName="input-wrapper">
                  <input
                    type="password"
                    placeholder={PASSWORD}
                    className="form-control"
                    required
                    {...password}
                  />
                </div>
                <div styleName="pass-forget-wrap">
                  <a href="#" onClick={forgotPassword}>
                    {PASSWORD_FORGOT}
                  </a>
                </div>
                <Button
                  width="100%"
                  styleName="login-btn"
                  type="submit"
                  mode="turquoise"
                  text={
                    <span>
                      Login
                      {submitButtonState.value === 'loading' ? (
                        <i className="fa fa-spinner fa-spin" />
                      ) : null}
                    </span>
                  }
                />
              </form>
              <div styleName="hr-oder">{OR}</div>
              <Row>
                <Col sm={6} xs={12} styleName="register-fb-cols">
                  <Button
                    width="100%"
                    text="Registrieren"
                    onClick={() => goToSignUp()}
                  />
                </Col>
                <Col sm={6} xs={12}>
                  {fbButton}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      );
    }
  },
);
