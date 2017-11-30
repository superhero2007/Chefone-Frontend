// @flow

import { loadRoute, errorLoading } from './utils';
import TestRoute from './test';
import orderRoute from './order';
import adminRoute from './admin';
import reviewRoute from './review';
import eventsRoute from './events';
import Main from '../containers/Main';
import PrivacyPolicyPage from '../containers/PrivacyPolicyPage';

import { order } from '../server/api';
import { _User } from '../parseApi/api';

import { notify, notifyError } from '../actions';
// import { updateSession } from '../actions/auth';

import { getLocation, getPrevLocation } from '../selectors';
// import {loc} from '../localization';
// import a from '../utils/analytics';

import { openAuthPage, authPages } from '../redux/modules/modals';

const mainPage = () => async (
  nextState: Object,
  replace: Function,
  callback: Function,
) => {
  if (!__CLIENT__) {
    callback();
    return;
  }
  replace({
    pathname: '/',
  });
  callback();
};

const requireAdminRole = ({ dispatch, getState }) => async (
  nextState: Object,
  replace: Function,
  callback: Function,
) => {
  if (!__CLIENT__) {
    callback();
    return;
  }

  const { session } = getState();

  const fetchedUser = await _User.GetById(session.objectId);

  if (!fetchedUser.adminRole) {
    console.log(
      'fetched user is not admin, but local is - trust fetched user, forbid admin',
    );
    replace({
      pathname: '/',
    });
    callback();
    setTimeout(
      () =>
        dispatch(
          notify({
            message: 'You are not admin',
            level: 'error',
            autoDismiss: 5,
          }),
        ),
      1000,
    );
    return;
  }

  callback();
};

const requireUserHaveThisOrder = ({ dispatch, getState }) => async (
  nextState: Object,
  replace: Function,
  callback: Function,
) => {
  if (!__CLIENT__) {
    callback();
    return;
  }

  const { session, ...rest } = getState();
  const userId = session.id || session.objectId;

  const location = getLocation(rest);

  const tokens = location.pathname.split('/');
  const orderId = tokens[tokens.length - 1];

  try {
    await order.assertUserHasThisOrder({ userId, orderId });
  } catch (e) {
    replace('/');

    setTimeout(() => dispatch(notifyError(e)), 1000);
  }

  callback();
};

// const requireEmailConfirmed = ({dispatch, getState})=>
//   async (nextState:Object, replace:Function, callback:Function) => {
//     if(!__CLIENT__) {
//       callback();
//       return
//     }
//
//     await dispatch(updateSession())
//
//     const {session:{username, emailConfirmed}, ...rest} = getState()
//
//     const location = getLocation(rest);
//     const prevPath = location ? location.pathname : '/';
//     if(location.pathname.indexOf('sofort/notify') !== -1) {
//       return;
//     }
//
//     if(username && !emailConfirmed) {
//       replace({
//         pathname:prevPath,
//       })
//       setTimeout(()=>
//         dispatch(notify({
//           message: loc.errors.EMAIL_NOT_CONFIRMED,
//           level: 'error',
//           autoDismiss : 5,
//         })),
//       1000)
//     }
//     callback();
//   }

const openAuth = ({ getState, dispatch }) => (
  nextState: Object,
  replace: Function,
  callback: Function,
) => {
  if (!__CLIENT__) {
    callback();
    return;
  }

  const { session } = getState();

  if (session.username) {
    callback();
    return;
  }

  dispatch(openAuthPage(authPages.SIGN_UP));
  callback();
};

const requireAuth = ({ getState, dispatch }) => (
  nextState: Object,
  replace: Function,
  callback: Function,
) => {
  if (!__CLIENT__) {
    callback();
    return;
  }

  const { session, ...rest } = getState();
  const location = getPrevLocation(rest);
  const prevPath = location ? location.pathname : '/';
  if (prevPath.indexOf('sofort/notify') !== -1) {
    return;
  }

  if (!session.username) {
    // goToLogin({pendingRoute:nextState.location.pathname})

    replace({
      pathname: prevPath,
      state: {
        proceedTo: nextState.location.pathname,
      },
    });
    callback();

    setTimeout(() => {
      dispatch(openAuthPage(authPages.SIGN_UP));
    }, 300);

    return;
  }
  callback();
};

// const TermsGetComponent = (location: *, cb: *) => {
//   System.import('../containers/Terms')
//     .then(loadRoute(cb))
//     .catch(errorLoading);
// };

export default (store: Object) => {
  const requireUserHaveThisOrderWithStore = requireUserHaveThisOrder(store);
  const requireAdminRoleWithStore = requireAdminRole(store);
  const requireAuthWithStore = requireAuth(store);
  const openAuthWithStore = openAuth(store);
  const mainPageWithStore = mainPage();
  // const requireEmailConfirmedWithStore = requireEmailConfirmed(store);

  return [
    {
      path: '/',
      component: Main,
      indexRoute: {
        getComponent(location: *, cb: *) {
          System.import('../containers/FrontPage')
            .then(loadRoute(cb))
            .catch(errorLoading);
        },
      },
      childRoutes: [
        {
          path: 'signin',
          onEnter: openAuthWithStore,
          getComponent(location: *, cb: *) {
            System.import('../containers/FrontPage')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'i/:inviteUserId',
          onEnter: openAuthWithStore,
          getComponent(location: *, cb: *) {
            System.import('../containers/FrontPage')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'l/register',
          getComponent(location: *, cb: *) {
            System.import('../containers/LandingRegistration')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'l/login',
          getComponent(location: *, cb: *) {
            System.import('../containers/LandingLogin')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'invites',
          onEnter: mainPageWithStore,
          getComponent(location: *, cb: *) {
            System.import('../containers/Invites')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'inbox',
          onEnter: requireAuthWithStore,
          getComponent(location: *, cb: *) {
            System.import('../containers/Inbox')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'booking-details/:orderId',
          onEnter: requireAuthWithStore,
          childRoutes: [
            {
              indexRoute: {
                onEnter: requireUserHaveThisOrderWithStore,
                getComponent(location: *, cb: *) {
                  System.import('../containers/BookingDetails')
                    .then(loadRoute(cb))
                    .catch(errorLoading);
                },
              },
            },
          ],
        },
        {
          path: 'refund',
          getComponent(location: *, cb: *) {
            System.import('../containers/Refund')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'privacy',
          component: PrivacyPolicyPage,
        },
        {
          path: 'about',
          getComponent(location: *, cb: *) {
            System.import('../containers/About')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'AGB',
          onEnter: () => {
            if (!__CLIENT__) {
              return;
            }
            window.location.href =
              'https://chefone.zendesk.com/hc/de/sections/202501269-Rechtliches';
          },
        },
        {
          path: 'terms',
          onEnter: () => {
            if (!__CLIENT__) {
              return;
            }
            window.location.href =
              'https://chefone.zendesk.com/hc/de/sections/202501269-Rechtliches';
          },
        },
        {
          path: 'legal-disclosure',
          getComponent(location: *, cb: *) {
            System.import('../containers/Legal')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'contact',
          onEnter: () => {
            if (!__CLIENT__) {
              return;
            }
            window.location.href =
              'https://chefone.zendesk.com/hc/de/requests/new';
          },
        },
        {
          path: 'discover',
          indexRoute: {
            getComponent(location: *, cb: *) {
              System.import('../containers/Discover')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
          },
          childRoutes: [
            {
              path: ':cityName',
              getComponent(location: *, cb: *) {
                System.import('../containers/Discover')
                  .then(loadRoute(cb))
                  .catch(errorLoading);
              },
            },
          ],
        },
        {
          path: 'confirm',
          onEnter: requireAuthWithStore,
          getComponent(location: *, cb: *) {
            System.import('../containers/Confirm')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'auth',
          childRoutes: [
            {
              path: 'success',
              getComponent(location: *, cb: *) {
                System.import('../containers/SignUpSuccess')
                  .then(loadRoute(cb))
                  .catch(errorLoading);
              },
            },
          ],
        },
        {
          path: 'forgot-password',
          getComponent(location: *, cb: *) {
            System.import('../containers/ForgotPassword')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'email/confirm/:token',
          getComponent(location: *, cb: *) {
            System.import('../containers/ConfirmUserNotification')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'private-dinner-result',
          onEnter: requireAuthWithStore,
          getComponent(location: *, cb: *) {
            System.import('../containers/PrivateDinnerResult')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'unfollow/:chefId',
          onEnter: requireAuthWithStore,
          getComponent(location: *, cb: *) {
            System.import('../containers/Unfollow')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'jobs',
          indexRoute: {
            getComponent(location: *, cb: *) {
              System.import('../containers/Jobs')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
          },
          childRoutes: [
            {
              path: ':id',
              getComponent(location: *, cb: *) {
                System.import('../containers/JobDetails')
                  .then(loadRoute(cb))
                  .catch(errorLoading);
              },
            },
          ],
        },
        {
          path: 'landing-chefs',
          getComponent(location: *, cb: *) {
            System.import('../containers/LandingChefs')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'dashboard',
          onEnter: requireAuthWithStore,
          indexRoute: {
            getComponent(location: *, cb: *) {
              System.import('../containers/Dashboard')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
          },
          childRoutes: [
            {
              path: ':orderId',
              getComponent(location: *, cb: *) {
                System.import('../containers/OrderDetails')
                  .then(loadRoute(cb))
                  .catch(errorLoading);
              },
            },
          ],
        },
        TestRoute,
        eventsRoute({
          requireAuth: requireAuthWithStore,
        }),
        reviewRoute({
          requireAuth: requireAuthWithStore,
          requireUserHaveThisOrder: requireUserHaveThisOrderWithStore,
        }),
        adminRoute({
          requireAuth: requireAuthWithStore,
          requireAdminRole: requireAdminRoleWithStore,
        }),
        orderRoute({
          requireAuth: requireAuthWithStore,
        }),
        {
          path: 'event/:eventId',
          getComponent(location: *, cb: *) {
            System.import('../containers/EventDetails')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
          childRoutes: [
            {
              path: 'waitingList',
              onEnter: requireAuthWithStore,
              getComponent(location: *, cb: *) {
                System.import('../containers/EventDetails')
                  .then(loadRoute(cb))
                  .catch(errorLoading);
              },
            },
            {
              path: 'privateDinnerRequest',
              onEnter: requireAuthWithStore,
              getComponent(location: *, cb: *) {
                System.import('../containers/EventDetails')
                  .then(loadRoute(cb))
                  .catch(errorLoading);
              },
            },
          ],
        },
        {
          path: '*',
          getComponent(location: *, cb: *) {
            System.import('../containers/NotFound')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
      ],
    },
  ];
};
