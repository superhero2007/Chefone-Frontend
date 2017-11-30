// @flow

export * as fixtures from './fixtures';
import React from 'react';
import R from 'ramda';
import { Link } from 'react-router';
import Loader from '../../UIKit/Loader';
import AvatarImage from '../../UIKit/AvatarImage';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import Button from '../../UIKit/Button';
import DropdownPlus from '../../UIKit/Dropdown/DropdownPlus';
import dropdownTheme from './dropdown.theme.module.less';
import { checkEmail } from '../../../utils';
import { toPlainObject } from '../../../decorators/ValidationDecorator';
import withSimpleState from '../../../utils/withSimpleState';
import type { Changeble } from '../../../utils/withSimpleState';
import { Row, Col } from 'react-flexbox-grid';

import Header from '../Header';

const EMAIL_PLACEHOLDER = 'eMail-Adresse';
const FIRST_NAME_PLACEHOLDER = 'Vorname';
const SELECT_CITY = 'Wähle deine Favoriten Stadt';
const LAST_NAME_PLACEHOLDER = 'Nachname';
const PASSWORD = 'Passwort';
const TERMS = ['Ich akzeptiere die', 'Nutzungsbedingungen'];
const REGISTRATION = 'Registrieren';
const ALREADY_REG_QUESTION = ['Schon registriert?', 'Logge dich ein'];
const NEED_ACCEPT_TERMS = 'Ja, ich akzeptiere die Nutzungsbedingungen';
type BtnState = 'error' | 'success' | 'pending' | 'initial';

const TITLE = 'Kostenlos Anmelden!';
const SUB_TITLE =
  'Auf CHEF.ONE erlebst du die spannenden Abenteuer deiner Stadt und teilst diese mit neuen Menschen.';

const SingleColumnRow = (props: { children?: *, className?: * } | null) => {
  const { children, className } = props || {};
  return (
    <Row className={className}>
      <Col xs={12}>{children}</Col>
    </Row>
  );
};

const INVITE_MESSAGE = ({ firstName }: { firstName: string }) =>
  `Du erhälts ein 15€ Gutschein von ${firstName} für dein erstes Dinner`;

type InvitingUserPropsT = {
  objectId: string,
  avatar: { url: string },
  firstName: string,
};

const InvitingUser = fixedCSSModules(styles, {
  allowMultiple: true,
})(({ user: { avatar, firstName } }: { user: InvitingUserPropsT }) => (
  <div styleName="inviting-user-block">
    <div styleName="avatar-img">
      <AvatarImage
        round
        placeholderStroke="orange"
        src={avatar && avatar.url}
        diam={65}
      />
    </div>
    <div styleName="invite-msg">{INVITE_MESSAGE({ firstName })}</div>
  </div>
));

type Meta<T> = {
  meta: Object,
  data: T,
};
export type PropsT = {
  align?: 'left' | 'center' | 'right',
  noPadding?: boolean,
  onSubmit: Function,
  goToLogin: Function,
  cities: Array<{ city: string, objectId: string }>,
  signinFacebook: Function,
  invitingUser: Meta<InvitingUserPropsT>,
};
const getStateToSave = props => {
  return {
    invitingUserId: {
      value:
        props.invitingUser && props.invitingUser.data
          ? props.invitingUser.data.objectId
          : undefined,
    },
    cityId: { value: props.selectCity.value.objectId },
    firstName: props.firstName,
    lastName: props.lastName,
    email: props.email,
    password: props.password,
    terms: props.terms,
  };
};
type InnerPropsT = {
  firstName: Changeble<string>,
  lastName: Changeble<string>,
  email: Changeble<string>,
  selectCity: Changeble<{ city: string, objectId: string }>,
  password: Changeble<string>,
  terms: Changeble<boolean>,
  loginButtonState: Changeble<BtnState>,
  submitButtonState: Changeble<string>,
} & PropsT;

//$FlowIssue
export default R.compose(
  withSimpleState('submitButtonState', ({ submitButtonState }) => {
    return submitButtonState;
  }),
  withSimpleState(
    'firstName',
    ({ firstName }) => firstName || '',
    value => !value,
  ),
  withSimpleState(
    'lastName',
    ({ lastName }) => lastName || '',
    value => !value,
  ),
  withSimpleState('selectCity', () => '', value => !value),
  withSimpleState(
    'email',
    ({ email }) => email || '',
    email => checkEmail(email),
  ),
  withSimpleState(
    'password',
    ({ password }) => password || '',
    value => !value,
  ),
  withSimpleState(
    'terms',
    ({ terms }) => terms || '',
    value => !value && NEED_ACCEPT_TERMS,
  ),
  fixedCSSModules(styles, {
    allowMultiple: true,
  }),
)(
  class extends React.Component<*, *> {
    props: InnerPropsT;
    render() {
      const props = this.props;
      const {
        align = 'center',
        noPadding,
        terms,
        firstName,
        lastName,
        cities,
        selectCity,
        email,
        password,
        goToLogin,
        invitingUser,
        submitButtonState,
        onSubmit,
      } = props;

      const alignMap = {
        left: { start: 'xs' },
        center: { center: 'xs' },
        right: { end: 'xs' },
      };

      const alignObj = alignMap[align];
      return (
        <form
          styleName="component"
          style={noPadding ? { padding: 0 } : {}}
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
          <SingleColumnRow>
            <Header title={TITLE} subTitle={SUB_TITLE} align={align} />
          </SingleColumnRow>
          <SingleColumnRow>
            {invitingUser && (
              <div>
                {invitingUser.meta.state === 'success' &&
                  invitingUser.data && (
                    <InvitingUser user={invitingUser.data} />
                  )}
                {invitingUser.meta.state === 'loading' && <Loader />}
              </div>
            )}
          </SingleColumnRow>

          <SingleColumnRow>
            <Row>
              <Col md={6} xs={12} styleName="my-row">
                <input
                  type="text"
                  placeholder={FIRST_NAME_PLACEHOLDER}
                  className="form-control"
                  required
                  {...firstName}
                />
              </Col>

              <Col md={6} xs={12} styleName="my-row">
                <input
                  type="text"
                  placeholder={LAST_NAME_PLACEHOLDER}
                  className="form-control"
                  required
                  {...lastName}
                />
              </Col>
            </Row>
            <SingleColumnRow styleName="my-row">
              {/*$FlowIssue*/}
              <DropdownPlus
                theme={dropdownTheme}
                type="text"
                className={styles['dropdown']}
                defaultValue={SELECT_CITY}
                options={cities}
                printWith={({ city }) => city}
                selected={selectCity}
              />
            </SingleColumnRow>

            <SingleColumnRow styleName="my-row">
              <input
                type="email"
                placeholder={EMAIL_PLACEHOLDER}
                className="form-control"
                required
                {...email}
              />
            </SingleColumnRow>

            <SingleColumnRow styleName="my-row">
              <input
                type="password"
                placeholder={PASSWORD}
                className="form-control"
                required
                {...password}
              />
            </SingleColumnRow>
            <SingleColumnRow>
              <Button
                width="100%"
                type="submit"
                text={
                  <span>
                    {submitButtonState.value === 'loading' ? (
                      <i className="fa fa-spinner fa-spin" />
                    ) : null}
                    {REGISTRATION}
                  </span>
                }
              />
            </SingleColumnRow>
          </SingleColumnRow>

          <Row {...alignObj}>
            <Col xs={12}>
              <div className="checkbox" styleName="checkbox">
                <label>
                  <input type="checkbox" required {...terms} /> {TERMS[0]}{' '}
                  <Link to="/AGB">{TERMS[1]}</Link>
                </label>
              </div>
            </Col>
          </Row>
          <Row {...alignObj}>
            <Col xs={12}>
              {ALREADY_REG_QUESTION[0]}{' '}
              <a onClick={goToLogin}>{ALREADY_REG_QUESTION[1]}</a>
            </Col>
          </Row>
        </form>
      );
    }
  },
);
