// @flow

import { loadRoute, errorLoading } from './utils';

export default ({ requireAuth }: { requireAuth: Function }) => ({
  path: 'order',

  childRoutes: [
    {
      path: 'payment-result/:type',
      onEnter: requireAuth,
      getComponent(location: *, cb: *) {
        System.import('../containers/PaymentResult')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: ':eventId',
      onEnter: requireAuth,
      getComponent(location: *, cb: *) {
        System.import('../containers/PaymentPage')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: 'sofort/notify',
      getComponent(location: *, cb: *) {
        System.import('../containers/SofortResult')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
      nofooter: true,
      nonavbar: true,
    },
  ],
});
