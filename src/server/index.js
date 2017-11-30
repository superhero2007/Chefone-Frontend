//@flow

import 'isomorphic-fetch';
import CONFIG from '../config';

let app;
try {
  global.CONFIG = CONFIG;
  require('../universalBootstrap');
  //$FlowIssue
  app = require('./app')(CONFIG);
} catch (err) {
  console.log(err);
}

// check if HMR is enabled
if (module.hot) {
  // accept update of dependency
  module.hot.accept('./app', function() {
    console.log('restart server');
    app.close();
    //$FlowIssue
    app = require('./app')(CONFIG);
  });
}
