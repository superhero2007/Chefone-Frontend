//@flow

import CONFIG from '../universalConfig';

import '../utils/storagePolyfill';
const { api: { FACEBOOK_APP_ID } } = CONFIG;

import '../../styles/index.less';

window.fbAsyncInit = function() {
  Parse.FacebookUtils.init({
    appId: FACEBOOK_APP_ID,
    status: true,
    cookie: true,
    xfbml: true,
    version: 'v2.5',
  });
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  //$FlowIssue
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

let render = require('./render');
//$FlowIssue
render();
if (module.hot) {
  module.hot.accept('./render', () => {
    render = require('./render');
    //$FlowIssue
    render();
  });
}
