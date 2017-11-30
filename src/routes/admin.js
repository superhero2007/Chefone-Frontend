//@flow

import { loadRoute, errorLoading } from './utils';

export default ({
  requireAdminRole,
  requireAuth,
}: {
  requireAdminRole: Function,
  requireAuth: Function,
}) => ({
  path: '/',
  onEnter: requireAuth,
  childRoutes: [
    {
      path: 'admin',
      onEnter: requireAdminRole,
      childRoutes: [
        {
          path: 'events/:eventId',
          getComponent(location: *, cb: *) {
            System.import('../containers/Admin/EventDetails')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
        {
          path: 'events',
          getComponent(location: *, cb: *) {
            System.import('../containers/Admin/Events')
              .then(loadRoute(cb))
              .catch(errorLoading);
          },
        },
      ],
    },
  ],
});
