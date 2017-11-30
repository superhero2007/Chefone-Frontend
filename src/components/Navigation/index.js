// @flow

import React from 'react';
import { Link } from 'react-router';
import Account from './Account';
import Newsletter from '../Newsletter';
import type { PropsT as AccountPropsT } from './Account';
import Modal from '../Modal';
import SignIn from '../SignInUpForm/SignIn';
import SignUp from '../SignInUpForm/SignUp';
import MobileMenu from './Mobile/MobileMenu';
import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, {
  allowMultiple: true,
});
import { MenuIcon } from './MenuItem';
import type { ParseCitiesInstance } from '../../parseApi/api/Cities';
import { authPages, mobilePages } from '../../redux/modules/modals';
import Separator from './Separator';
import MenuOptions from './MenuOptions';

import '../animations.css';

type InnerPropsT = {
  push: Function,
  goToBlog: Function,
  goToConfirm: Function,
  goInbox: Function,
  goDashboard: Function,
  goToInvites: Function,
  goToHelp: Function,
  goToCity: Function,
  goToHome: Function,
  goToCreateEvent: Function,
  goToAdmin: Function,
  forgotPassword: Function,
  signin: Function,
  signout: Function,
  signup: Function,
  signinFacebook: Function,
  modalsClose: Function,
  openMobilePage: Function,
  openAuthPage: Function,
  signupMailchimp: Function,
  invitingUser: *,
  cities: Array<ParseCitiesInstance>,
  city: ParseCitiesInstance | null,
  modalsPage: string | null,
  avatar: string,
  firstName: string,
  lastName: string,
  username: string,
  admin?: boolean,
};

const SIGN_UP = 'Registrieren';
const MESSAGE = 'Nachrichten';
const ON_CONFIRM = 'Profil Bearbeiten';
const HELP = 'Hilfe';
const CREATE_EVENT = 'Gastgeber werden';
const GO_TO_INVITES = 'Freunde einladen';

const res: (props: InnerPropsT) => * = applyStyles((props: InnerPropsT) => {
  const {
    invitingUser,
    goInbox,
    goDashboard,
    goToCity,
    goToHelp,
    admin,
    goToAdmin,
    goToBlog,
    goToCreateEvent,
    goToConfirm,
    modalsClose,
    modalsPage,
    openMobilePage,
    avatar,
    firstName,
    signin,
    signup,
    forgotPassword,
    signinFacebook,
    openAuthPage,
    signout,
    goToInvites,
    cities,
    city,
    username,
    lastName,
    signupMailchimp,
  } = props;

  const goToHome = () => openMobilePage('HOME');
  const goToLogin = () => openAuthPage('LOGIN');
  const goToSignUp = () => openAuthPage('SIGN_UP');

  const mainMenuOptionsLoggedIn = (
    <div>
      <MenuOptions>
        {admin && <MenuIcon onClick={goToAdmin} text="Admin" />}
        <MenuIcon
          onClick={goDashboard}
          leftIcon={<div className="icon-dashboard" />}
          text="Dashboard"
        />
        <MenuIcon
          onClick={goInbox}
          leftIcon={<div className="icon-message-orange" />}
          text={MESSAGE}
        />
        <MenuIcon
          onClick={goToConfirm}
          leftIcon={
            !avatar ? (
              <div className="icon-profile" />
            ) : (
              <div
                className="icon-profile"
                style={{
                  backgroundImage: `url(${avatar})`,
                }}
              />
            )
          }
          text={ON_CONFIRM}
        />
        <MenuIcon
          onClick={goToCreateEvent}
          leftIcon={<div className="icon-create-orange" />}
          text={CREATE_EVENT}
        />
        <MenuIcon
          onClick={goToHelp}
          leftIcon={<div className="icon-help-orange" />}
          text={HELP}
        />
        <MenuIcon
          onClick={goToBlog}
          leftIcon={<div className="icon-blog-orange" />}
          text="Blog"
        />
        <MenuIcon
          onClick={goToInvites}
          leftIcon={<div className="icon-money-orange" />}
          text={GO_TO_INVITES}
        />
      </MenuOptions>
      <Separator />
      <MenuOptions>
        <MenuIcon onClick={signout} text="Logout" />
      </MenuOptions>
    </div>
  );

  const mainMenuOptionsLoggedOut = (
    <MenuOptions>
      <MenuIcon noMargin onClick={goToHome} text="Home" />
      <MenuIcon noMargin onClick={goToHelp} text={HELP} />
      <MenuIcon noMargin onClick={goToCreateEvent} text={CREATE_EVENT} />
      <MenuIcon noMargin onClick={goToSignUp} text={SIGN_UP} />
      <MenuIcon noMargin onClick={goToLogin} text="Login" />
    </MenuOptions>
  );

  const mainMenuOptions = (
    <div>{firstName ? mainMenuOptionsLoggedIn : mainMenuOptionsLoggedOut}</div>
  );

  const accountProps: AccountPropsT = {
    city,
    cities,
    goToCity,
    goToCreateEvent,
    goToHelp,
    openAuthPage,
    firstName,
    avatar,
    mainMenuOptions,
    username,
    lastName,
  };

  const mobileMenuProps = {
    mainMenuOptions,
    cities,
    goToCity,
    openMobilePage,
    page: modalsPage,
    onClose: () => {
      modalsClose();
    },
  };

  const modalMap = {
    [authPages.LOGIN]: (
      <Modal onCloseClick={modalsClose} styleName="auth-modal">
        <SignIn
          forgotPassword={forgotPassword}
          signinFacebook={signinFacebook}
          goToSignUp={() => openAuthPage(authPages.SIGN_UP)}
          onSubmit={signin}
        />
      </Modal>
    ),
    [authPages.SIGN_UP]: (
      <Modal onCloseClick={modalsClose} styleName="auth-modal">
        <SignUp
          cities={cities}
          invitingUser={invitingUser}
          signinFacebook={signinFacebook}
          goToLogin={() => openAuthPage(authPages.LOGIN)}
          onSubmit={signup}
        />
      </Modal>
    ),
    [authPages.MAILCHIP]: (
      <Modal onCloseClick={modalsClose}>
        <Newsletter onSubmit={signupMailchimp} />
      </Modal>
    ),
  };

  return (
    <div styleName="navbar-container">
      {modalsPage !== null && modalMap[modalsPage]}
      <nav styleName="navbar main-nav-block">
        <Link to="/" styleName="logo" />
        <div styleName="menu-icons-collections-wrapper">
          <Account {...accountProps} />
        </div>
        <MobileMenu {...mobileMenuProps} />
        <div
          styleName="mobile-menu-icon"
          onClick={() => openMobilePage(mobilePages.HOME)}
        />
      </nav>
    </div>
  );
});
export default res;
