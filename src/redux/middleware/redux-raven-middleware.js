//@flow

import Raven from 'raven-js';

import CONFIG from '../../universalConfig';
const { env: { CIRCUIT, RELEASE } } = CONFIG;

const identity = stuff => stuff;

export default function createMiddleware(
  dsn: string,
  cfg: Object = {},
  options: Object = {},
) {
  /*
    Function that generates a crash reporter for Sentry.
    dsn - private Sentry DSN.
    cfg - object to configure Raven.
    options - customize extra data sent to sentry
      actionTransformer - tranform the action object to send; default to identity function
      stateTransformer - transform the state object to send; default to identity function
      logger - the logger to use for logging; default to console.error
  */
  if (!Raven.isSetup()) {
    if (!dsn) {
      // Skip this middleware if there is no DSN.
      console.error('[redux-raven-middleware] Sentry DSN required.');
      return () => (next: Function) => (action: Object) => {
        next(action);
      };
    }

    // common community ignore stuff
    const communityIgnoreErrors = [
      // Random plugins/extensions
      'top.GLOBALS',
      // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      'http://tt.epicplay.com',
      "Can't find variable: ZiteReader",
      'jigsaw is not defined',
      'ComboSearch is not defined',
      'http://loading.retry.widdit.com/',
      'atomicFindClose',
      // Facebook borked
      'fb_xd_fragment',
      // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
      // See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
      'bmi_SafeAddOnload',
      'EBCallBackMessageReceived',
      // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
      'conduitPage',
      // Generic error code from errors outside the security sandbox
      // You can delete this if using raven.js > 1.0, which ignores these automatically.
      'Script error.',
    ];

    const ignoreErrors = [
      ...communityIgnoreErrors,
      'Invalid username/password',
      'User with such email already exists',
      "Cannot call method 'fromLatLngToDivPixel' of undefined",
      "Cannot read property 'fromLatLngToDivPixel' of undefined",
    ];

    const ignoreUrls = [
      /* Facebook flakiness*/
      /graph\.facebook\.com/i,
      /* Facebook blocked*/
      /connect\.facebook\.net\/en_US\/all\.js/i,
      /* Woopra flakiness*/
      /eatdifferent\.com\.woopra-ns\.com/i,
      /static\.woopra\.com\/js\/woopra\.js/i,
      /* Chrome extensions*/
      /extensions\//i,
      /^chrome:\/\//i,
      /* Other plugins*/
      /127\.0\.0\.1:4001\/isrunning/i /* Cacaoweb*/,
      /webappstoolbarba\.texthelp\.com\//i,
      /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
    ];

    Raven.config(dsn, {
      environment: RELEASE ? 'live' : CIRCUIT,
      ignoreErrors,
      ignoreUrls,
    }).install();
  }

  return (store: Object) => (next: Function) => (action: Object) => {
    const {
      actionTransformer = identity,
      stateTransformer = identity,
      logger = console.error.bind(
        console,
        '[redux-raven-middleware] Reporting error to Sentry:',
      ),
    } = options;
    try {
      Raven.captureBreadcrumb({
        category: 'redux',
        message: action.type,
      });

      return next(action);
    } catch (err) {
      logger(err);

      // Send the report.
      Raven.captureException(err, {
        extra: {
          action: actionTransformer(action),
          state: stateTransformer(store.getState()),
        },
      });
    }
  };
}
