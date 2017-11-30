// @flow

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as auth from '../../actions/auth';
import Navigation from '../../components/Navigation';
import {
  load as loadInvitingUser,
  clear as clearInvitingUser,
} from '../../redux/modules/invitingUser';
import {
  close as modalsClose,
  openAuthPage,
  openMobilePage,
} from '../../redux/modules/modals';
import type { ReduxState } from '../../redux/type';
import * as actions from '../../actions';

export default connect(
  ({ session, cities, city, modals, invitingUser }: ReduxState, props) => ({
    routeParams: props.params,
    session,
    invitingUser,
    city,
    modalsPage: modals.page,
    cities: cities.data ? cities.data : [],
  }),
  {
    ...auth,
    ...actions,
    push,
    modalsClose,
    openMobilePage,
    openAuthPage,
    loadInvitingUser,
    clearInvitingUser,
  },
)(
  class NavigationContainer extends React.Component<*, *> {
    state: {
      ssrHack: boolean,
    };
    previousChildren: any;
    constructor() {
      super();
      this.state = {
        ssrHack: true,
      };
    }
    componentDidMount() {
      // this.props.clearInvitingUser();
      // if (this.props.params.inviteUserId) {
      //   this.props.loadInvitingUser({
      //     objectId: this.props.params.inviteUserId,
      //   });
      // }

      this.setState({ ssrHack: false });
    }
    render() {
      const {
        invitingUser,
        signout,
        push,
        location,
        session,
        cities,
        city,
        signinFacebook,
        signin,
        signup,
        modalsPage,
        modalsClose,
        openMobilePage,
        openAuthPage,
        signupMailchimp,
      } = this.props;
      const { ssrHack } = this.state;

      return (
        <Navigation
          invitingUser={invitingUser}
          push={push}
          signupMailchimp={signupMailchimp}
          username={session.username}
          lastName={session.lastName}
          avatar={session.avatar}
          firstName={session.firstName}
          cities={cities}
          city={ssrHack ? null : city.data}
          modalsPage={modalsPage}
          goToCity={city => push({ pathname: `/discover/${city.city}` })}
          forgotPassword={() => push({ pathname: '/forgot-password' })}
          goInbox={() => push({ pathname: '/inbox' })}
          goDashboard={() => push({ pathname: '/dashboard' })}
          goToHome={() => push({ pathname: '/' })}
          goToHelp={() => {
            window.open('https://chefone.zendesk.com/hc/en-us');
          }}
          goToInvites={() => push('/invites')}
          goToCreateEvent={() => push('/landing-chefs')}
          signout={signout}
          signinFacebook={signinFacebook}
          signin={signin}
          signup={signup}
          openAuthPage={openAuthPage}
          openMobilePage={openMobilePage}
          modalsClose={modalsClose}
          goToBlog={() => window.open('https://blog.chef.one/')}
          goToConfirm={() => push({ pathname: '/confirm' })}
          admin={session.adminRole}
          goToAdmin={() =>
            push({
              pathname: '/admin/events',
              state: location && location.state,
            })
          }
        />
      );
    }
  },
);
