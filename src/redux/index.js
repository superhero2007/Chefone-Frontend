// @flow

import { combineReducers } from 'redux';
import { routerReducer } from './modules/react-router-redux';
import onboarding from './modules/onboarding';
import cities from './modules/cities';
import city from './modules/city';
import jobs from './modules/jobs';
import jobSections from './modules/jobSections';
import inviteDiscounts from './modules/inviteDiscounts';
import event from './modules/event';
import notification from './modules/notification';
import { loadingBarReducer } from 'react-redux-loading-bar';
import events from './modules/events';
import passedEvents from './modules/passedEvents';
import invitingUser from './modules/invitingUser';
import chefEvents from './modules/chefEvents';
import myOrders from './modules/myOrders';
import meta from './modules/meta';
import adminEvents from './modules/adminEvents';
import adminEventDetails from './modules/adminEventDetails';
import adminPaymentOverview from './modules/adminPaymentOverview';
import discount from './modules/discount';
import amount from './modules/amount';
import reviewsForDashboard from './modules/reviewsForDashboard';
import reviews from './modules/reviews';
import createReview from './modules/createReview';
import fee from './modules/fee';
import order from './modules/order';
import createEvent from './modules/createEvent';
import modals from './modules/modals';
import orders from './modules/orders';
import message from './modules/message';
import stickyEvent from './modules/stickyEvent';
import messages from './modules/messages';
import loadedOrder from './modules/loadedOrder';
import sofortOrder from './modules/sofortOrder';
import finalizeOrder from './modules/finalizeOrder';
import attendees from './modules/attendees';
import progress from './modules/progress';
import session from './session';
import { reducer as reduxAsyncConnect } from '../redux-async-connect';

export default combineReducers({
  routing: routerReducer,
  meta,
  invitingUser,
  progress,
  stickyEvent,
  createEvent,
  createReview,
  reduxAsyncConnect,
  session,
  cities,
  jobs,
  jobSections,
  fee,
  reviewsForDashboard,
  city,
  order,
  orders,
  inviteDiscounts,
  loadedOrder,
  sofortOrder,
  finalizeOrder,
  modals,
  notification,
  loading: loadingBarReducer,
  event,
  events,
  passedEvents,
  adminEvents,
  adminEventDetails,
  adminPaymentOverview,
  chefEvents,
  myOrders,
  discount,
  amount,
  reviews,
  attendees,
  messages,
  message,
  onboarding,
});
