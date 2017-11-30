// @flow

import ES6Promise from 'es6-promise';

if (typeof Promise === 'undefined') {
  ES6Promise.polyfill();
}

import 'whatwg-fetch';
import moment from 'moment-timezone';

moment.locale('de');
moment.tz.setDefault('Europe/Berlin');

//TODO I have no idea what is about, need to git blame and find if we need that
if (!Object.keys) {
  //$FlowIssue
  Object.keys = function(obj) {
    var keys = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }

    return keys;
  };
}

//$FlowIssue
const Parse = require(`${__CLIENT__ ? 'parse' : 'parse/node'}`);

const {
  api: { PARSE_URL, PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY },
  //$FlowIssue
} = CONFIG;

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_URL;

if (typeof global !== 'undefined') {
  global.Parse = Parse;
}
