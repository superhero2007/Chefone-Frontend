//@flow

import rootReducer from '..';
import { createStore, compose, applyMiddleware } from 'redux';
import Cookies from 'js-cookie';
import { createCookieMiddleware } from 'redux-cookie';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { api, apiError, historyChange } from '../middleware';
import { routerMiddleware } from 'react-router-redux';

import CONFIG from '../../universalConfig';
const { api: { SENTRY_DSN }, env: { NODE_ENV } } = CONFIG;

const enhancer = compose(
  __CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : f => f,
);

export default function configureStore(history: Object, initialState: Object) {
  const reduxRouterMiddleware = routerMiddleware(history);

  let raven = [];
  if (__CLIENT__ && NODE_ENV === 'production') {
    const RavenMiddleware = require('../middleware/redux-raven-middleware');
    //$FlowIssue
    raven = [RavenMiddleware(SENTRY_DSN)];
  }

  let cookiesMiddleware = [];
  if (__CLIENT__) {
    raven = [createCookieMiddleware(Cookies)];
  }

  const createStoreWithMiddleware = applyMiddleware.apply(null, [
    ...raven,
    ...cookiesMiddleware,
    promise,
    api,
    apiError,
    thunk,
    historyChange,
    reduxRouterMiddleware,
  ])(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../', () => store.replaceReducer(require('../index')));
  }

  return store;
}
