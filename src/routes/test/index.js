// @flow

import React from 'react';
import R from 'ramda';
import { Link } from 'react-router';

export default {
  path: 'test',
  indexRoute: {
    getComponent(location: *, cb: *) {
      System.import('./childRoutes').then((testRoutes: *) => {
        console.log(testRoutes);
        if (!testRoutes || !testRoutes.length) {
          cb(null, () => <div />);
          return;
        }
        cb(null, () => (
          <div>
            {/*$FlowIssue*/}
            {R.compose(
              R.map(({ path }) => (
                <Link to={`/test/${path}`}>
                  <div>
                    {path}
                    <br />
                  </div>
                </Link>
              )),
            )(testRoutes)}
          </div>
        ));
      });
    },
  },
  getChildRoutes(location: *, cb: *) {
    System.import('./childRoutes').then((module: *) => {
      cb(null, module);
    });
  },
};
