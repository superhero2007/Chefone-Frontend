//@flow

import { loadRoute, errorLoading } from './utils';

export default ({ requireAuth }: { requireAuth: Function }) => ({
  path: 'events',
  onEnter: requireAuth,
  indexRoute: {
    getComponent(location: *, cb: *) {
      System.import('../containers/ChefEvents')
        .then(loadRoute(cb))
        .catch(errorLoading);
    },
  },
  childRoutes: [
    {
      path: 'create/select-city',
      getComponent(location: *, cb: *) {
        System.import('../containers/SelectEventCity')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: 'create/form',
      getComponent(location: *, cb: *) {
        System.import('../containers/CreateEvent')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: 'create/form-details',
      getComponent(location: *, cb: *) {
        System.import('../containers/CreateEventDetails')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: 'create/:type',
      getComponent(location: *, cb: *) {
        System.import('../containers/CreateEventResult')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
  ],
});
