//@flow

import { loadRoute, errorLoading } from './utils';

export default ({
  requireUserHaveThisOrder,
  requireAuth,
}: {
  requireUserHaveThisOrder: Function,
  requireAuth: Function,
}) => ({
  path: 'reviews',
  onEnter: requireAuth,
  childRoutes: [
    {
      path: 'create/form-1(/:orderId)',
      onEnter: requireUserHaveThisOrder,
      getComponent(location: *, cb: *) {
        System.import('../containers/CreateReview/FirstScreen')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: 'create/form-2',
      getComponent(location: *, cb: *) {
        System.import('../containers/CreateReview/SecondScreen')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: 'create/form-3',
      getComponent(location: *, cb: *) {
        System.import('../containers/CreateReview/ThirdScreen')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: 'create/:type',
      getComponent(location: *, cb: *) {
        System.import('../containers/CreateReview/Result')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
  ],
});
