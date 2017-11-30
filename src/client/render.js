//@flow
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import { match } from 'react-router';

import App from './App';

import { userSelector } from '../selectors';
import { syncHistoryWithStore } from 'react-router-redux';
import '../universalBootstrap';

import createHistory from 'history/lib/createBrowserHistory';

import { postProcessGet } from '../parseApi/src/runtime';
import { updateRavenUserContext } from '../redux/session';
import configureStore from '../redux/create';
const browserHistory = createHistory();
const rootEl = document.getElementById('root');

let session = {};
const [currentUser] = postProcessGet([Parse.User.current()]);
if (currentUser) {
  const user = userSelector(currentUser);
  updateRavenUserContext(user);

  session = {
    ...user,
    signin_date: Date.now(), //WARNING
  };
}

const initialState = { session };
const store = configureStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);

export default function render(location: *) {
  const getLocation = () => {
    const { pathname, search, hash } = window.location;
    return `${pathname}${search}${hash}`;
  };
  location = location || getLocation();

  const getRoutes = require('../routes');
  //$FlowIssue
  const routes = getRoutes(store);
  match(
    { history, routes, location },
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        render(redirectLocation);
        return;
      }
      ReactDOM.render(
        <AppContainer>
          <App {...{ store, renderProps }} />
        </AppContainer>,
        //$FlowIssue
        rootEl,
      );
    },
  );
}
