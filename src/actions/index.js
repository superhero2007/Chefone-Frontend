// @flow

import CONFIG from '../universalConfig';
const { env: { CIRCUIT }, api: { SOFORT_PROJECT_ID } } = CONFIG;
import md5 from 'md5';
import R from 'ramda';

import type { ParseCitiesInstance } from '../parseApi/api/Cities';
import { load as loadJobs } from '../redux/modules/jobs';
import { load as loadJobSections } from '../redux/modules/jobSections';
import { load as loadCities } from '../redux/modules/cities';
import { load as loadFee } from '../redux/modules/fee';
// import { setCookie, getCookie } from 'redux-cookie';
import {
  load as loadEvents,
  clear as clearEvents,
} from '../redux/modules/events';

import {
  load as loadPassedEvents,
  clear as clearPassedEvents,
} from '../redux/modules/passedEvents';
import { load as loadEvent } from '../redux/modules/event';
import { load as loadStickyEvent } from '../redux/modules/stickyEvent';
import { load as loadReviews } from '../redux/modules/reviews';
import { load as loadAttendees } from '../redux/modules/attendees';
import { load as loadMessages } from '../redux/modules/messages';
// import { authPages, openAuthPage } from '../redux/modules/modals';
import { load as loadDiscount } from '../redux/modules/discount';
import { load as loadFinalizeOrder } from '../redux/modules/finalizeOrder';
import { load as createSofortOrder } from '../redux/modules/sofortOrder';
import { load as loadOrder } from '../redux/modules/loadedOrder';
import { load as loadOrders } from '../redux/modules/orders';
import { setAmount } from '../redux/modules/amount';
import {
  fetchedEventForCreateEvent,
  cleanCreateEvent,
} from '../redux/modules/createEvent';
import { fetchedEventForCreateReview } from '../redux/modules/createReview';
import { updateSession, signout } from './auth';
import { order, payment, event, user } from '../server/api';
import { promiseDispatch } from '../utils';
import { Chef, Cities, Discount, Order } from '../parseApi/api';
import type { GetState } from '../redux/type';
import type { TOutFormData as TPaymentPageData } from '../components/PaymentPage';
import { init } from '../redux/modules/createEvent';
const { getOrderById } = order;
const { set100PercentDiscountPayment } = payment;

import {
  getPrice,
  getDiscountPrice,
  getLocation,
  getSofortOrder,
  getSofortOrderData,
  getAmount,
  currencyStateSelector,
} from '../selectors';

import { push } from 'react-router-redux';
import * as constants from '../constants/ActionTypes';
import { createAction } from 'redux-actions';
import { loc } from '../localization';

import { fb, ec } from '../utils/analytics';

export const goToCreateEventForm = (params?: {
  guestsNumber: number,
  city: *,
}) => async (dispatch: Function, getState: GetState) => {
  if (params === undefined) {
    dispatch(push('/events/create/select-city'));
    return;
  }
  const { cities: { data } } = getState();
  //$FlowIssue
  const foundedCity = R.find(({ city }) => city === params.city)(data);

  dispatch(
    init({
      amountOfPeople: params.guestsNumber,
      city: foundedCity,
    }),
  );
  dispatch(push('/events/create/form'));
};

export const onAmountChanged = ({
  amount,
  eventId,
}: {
  amount?: number,
  eventId: string,
}) => async (dispatch: Function, getState: GetState) => {
  let state = getState();

  if (state.event.meta.state !== 'success') {
    await dispatch(loadEventWithEvents(eventId));
  }

  if (amount === undefined) {
    return;
  }
  dispatch(setAmount({ amount }));
};

export const notify = (obj: Object) =>
  createAction('NOTIFY')({
    position: 'tr',
    autoDismiss: 10,
    ...obj,
  });

export const notifyError = (error: Object) =>
  notify({
    message: error.message,
    level: 'error',
  });

export const notifySuccess = (message: string) =>
  notify({
    message,
    level: 'success',
  });

export const updateCity = (city: ParseCitiesInstance) => ({
  type: constants.UPDATE_CITY,
  city,
});

export const fetchOrders = (options: Object) => (dispatch: Function) =>
  dispatch(loadOrders(options));

export const resetEvents = () => ({ type: constants.RESET_EVENTS });
export const resetEvent = () => ({ type: constants.RESET_EVENT });
export const resetOrders = () => ({ type: constants.RESET_ORDERS });
export const resetOrder = () => ({ type: constants.RESET_ORDER });
export const resetDiscount = () => ({ type: constants.RESET_DISCOUNT });
export const resetAttendees = () => ({ type: constants.RESET_ATTENDEES });

export const onSubmitPayment = (
  nonce: string,
  orderId: string,
  paypal: boolean,
) => async (dispatch: Function) => {
  try {
    await dispatch(
      loadFinalizeOrder({
        order_id: orderId,
        payment_method_nonce: nonce,
        paypal,
      }),
    );
    dispatch(push('/order/payment-result/success'));
  } catch (e) {
    dispatch(push('/order/payment-result/fail'));
  }
};

const openSofort = ({
  currency_id,
  version,
  objectId,
  amount,
}: {
  currency_id: string,
  version: string,
  objectId: string,
  amount: string,
}) => {
  const PLATFORM = 'web';

  const user_variable_2 = md5(`2M5KTq1xwhWUOrKUWO4nm2c9TwjgQFhc${objectId}`);
  const src = `https://www.sofort.com/payment/start/?user_id=125695&project_id=${
    SOFORT_PROJECT_ID
  }&amount=${amount}&currency_id=${currency_id}&reason_1=CHEF%2eONE%20-%20${
    objectId
  }&user_variable_0=${objectId}&user_variable_1=${PLATFORM}&user_variable_2=${
    user_variable_2
  }&user_variable_4=sofort&user_variable_5=${version}`;

  var win = window.open(src, '_blank');
  win.focus();
};

export const onSofortStartPaymentProc = () => async (
  dispatch: Function,
  getState: GetState,
) => {
  const orderData = getSofortOrderData(getState());
  await dispatch(createSofortOrder(orderData));

  dispatch(onSofortIdleProc());
};

const parsePhoneNumber = (phone: string): number => {
  let phoneT = phone.split('+').join('');
  phoneT = phoneT.split(' ').join('');
  phoneT = phoneT.split('(').join('');
  phoneT = phoneT.split(')').join('');

  return parseInt(phoneT);
};

export const onPaymentContinueClick = (paymentPageData: TPaymentPageData) =>
  promiseDispatch(
    'onPaymentContinueClick',
    async (dispatch: Function, getState: GetState) => {
      await ec.addPaymentInfo();
      fb('AddPaymentInfo');

      const { phone, chefMessage, activeMethod, nonce } = paymentPageData;

      const phoneNumber = parsePhoneNumber(phone);

      const state = getState();
      const { discount, session, order, amount } = state;

      if (paymentPageData.discount100) {
        dispatch(make100PercentDiscountPayment(phoneNumber, session.objectId));
        return;
      }

      dispatch(push('/order/payment-result/pending'));

      const { data: { orderId } } = order;
      const discountPrice = getDiscountPrice(state);

      if (activeMethod === 'sofort') {
        dispatch(onSofortStartPaymentProc());
        openSofort({
          currency_id: currencyStateSelector(state).name,
          version: 'PENDING_VERSION',
          objectId: orderId,
          amount: discountPrice.toString(),
        });
      }

      const orderData = {
        objectId: orderId,
        userMsg: chefMessage,
        phone: phoneNumber,
        amount: parseInt(amount),
        foodPriceTotal: getPrice(state),
        ...(discount.data
          ? {
              objectIdDiscount: Discount.Pointer(discount.data.objectId),
              discountPrice: discountPrice,
            }
          : {}),
      };

      await Order.Set(orderData);

      await user.updateUserPhone({
        userId: session.objectId,
        phone: phoneNumber,
      });

      if (activeMethod === 'creditCard' || activeMethod === 'paypal') {
        if (!nonce) {
          throw Error('nonce should be defined here');
        }
        await dispatch(
          onSubmitPayment(nonce, orderId, activeMethod === 'paypal'),
        );
      }
    },
  );

// const showNewsletter = () => (dispatch: Function) => {
//   const DELAY = 45000;
//   const visited = dispatch(getCookie('visited'));
//   if (visited) {
//     return;
//   }
//   setTimeout(() => dispatch(openAuthPage(authPages.MAILCHIP)), DELAY);
//   dispatch(setCookie('visited', true));
// };

export const onLoad = () =>
  promiseDispatch('ON_LOAD', async (dispatch: Function, getState: GetState) => {
    // dispatch(showNewsletter());

    try {
      await dispatch(loadCities());
    } catch (e) {
      const code = e.reason ? e.reason.code : e.code;
      if (code === 209) {
        await dispatch(signout());
        window.location.reload();
        return;
      } else {
        throw e;
      }
    }

    await dispatch(loadFee());

    const { cities, city } = getState();

    if (
      cities.data &&
      cities.data.length &&
      (!city.data || !Object.keys(city.data).length)
    ) {
      dispatch(updateCity(cities.data[0]));
    }
  });

export const fetchJobs = (options: Object) => (
  dispatch: Function,
  getState: GetState,
) => {
  options = { ...options, limit: 6 };
  const { jobs: { data: jobs } } = getState();
  if (!jobs) {
    dispatch(loadJobs());
  }
};

export const fetchJobSections = (options: Object) => (
  dispatch: Function,
  getState: GetState,
) => {
  options = { ...options, limit: 6 };
  const { jobSections: { data: jobSections } } = getState();
  if (!jobSections) {
    dispatch(loadJobSections());
  }
};

export const fetchEvents = (options: Object) => (dispatch: Function) => {
  dispatch(loadCities());

  dispatch(clearEvents());
  dispatch(clearPassedEvents());

  dispatch(loadEvents({ ...options, limit: 12 }));
  dispatch(
    loadPassedEvents({ ...options, limit: 3, fallbackToAllEvents: true }),
  );
};

export const loadCitiesAndEvents = () =>
  promiseDispatch(
    'loadCitiesAndEvents',
    async (dispatch: Function, getState: GetState) => {
      const { cities: { data: cities } } = getState();
      if (!cities) {
        await dispatch(loadCities());
      }

      await dispatch(loadEvents({ limit: 3 }));
      await dispatch(loadStickyEvent());
    },
  );

export const fetchCities = () => (dispatch: Function, getState: GetState) => {
  const { cities: { data: cities } } = getState();
  if (!cities) {
    dispatch(loadCities());
  }
};

export const loadEventWithEvents = (eventId: string) => async (
  dispatch: Function,
  getState: GetState,
) => {
  const { session: { objectId: userId } } = getState();
  await dispatch(loadEvent({ eventId, userId }));

  const { event: { data: event } } = getState();
  if (event.notFound) {
    dispatch(push('/notfound'));
    return;
  }

  const chef = Chef.EnsureInstance(event.chef);
  const city = Cities.EnsureInstance(event.city);

  await dispatch(loadReviews({ chefId: chef.objectId, limit: 3 }));

  await dispatch(
    loadEvents({ city: city.objectId, limit: 3, exclude: eventId }),
  );
  await dispatch(loadAttendees({ objectIdEvent: event.objectId }));
};

export const loadBookingDetailsInfo = (orderId: string) => async (
  dispatch: Function,
  getState: GetState,
) => {
  await dispatch(loadFee());
  await dispatch(loadOrder(orderId));

  const { loadedOrder: { data: order }, session } = getState();
  const eventId = order.eventId;
  await dispatch(loadEvent({ eventId }));
  const chefUserId = order.chefUserId;
  const isChef = chefUserId === session.objectId;

  const userId = isChef ? order.user.objectId : session.objectId;

  await dispatch(
    loadAttendees({
      objectIdEvent: eventId,
      limit: 5,
    }),
  );

  await dispatch(
    loadMessages({
      orderId: order.objectId,
      isChef,
      userId,
      chefId: order.chefId,
    }),
  );
};

export const onBookNowClick = () =>
  promiseDispatch(
    'ON_BOOK_NOW_CLICK',
    async (dispatch: Function, getState: GetState) => {
      await dispatch(updateSession());

      const { event: { data: { objectId } } } = getState();
      await ec.clickBookNow();
      fb('InitiateCheckout');
      dispatch(push(`/order/${objectId}`));
    },
  );

export const onOrderDiscountVerify = (discountCode: string) =>
  promiseDispatch(
    'ONORDERDISCOUNTVERIFY_ACTIONS',
    async (dispatch: Function, getState: GetState) => {
      const {
        event,
        session: { objectId: currentUserId },
        amount,
      } = getState();

      const currencyName = event.data.currency.name;

      await dispatch(loadDiscount(discountCode, currencyName, currentUserId));

      const { discount } = getState();
      dispatch(setAmount({ amount, event, discount }));
    },
  );

let sofortIdleTimeout;
export const onSofortIdleProc = () => async (
  dispatch: Function,
  getState: GetState,
) => {
  const state = getState();
  const { pathname } = getLocation(state);
  if (pathname.indexOf('sofort') === -1) {
    return;
  }
  const { timestamp, ...rest } = getSofortOrder(state);
  const order = await getOrderById(rest);

  const timeout = timestamp + 60000 * 3;
  if (timeout < new Date().getTime()) {
    dispatch(push('/order/payment-result/fail'));
    return;
  }

  if (sofortIdleTimeout) {
    clearTimeout(sofortIdleTimeout);
    sofortIdleTimeout = null;
  }

  if (order.finalized) {
    dispatch(push('/order/payment-result/success'));
    return;
  } else if (order.status === -1) {
    dispatch(push('/order/payment-result/fail'));
    return;
  }

  sofortIdleTimeout = setTimeout(() => {
    dispatch(onSofortIdleProc());
  }, 1000);
};

export const make100PercentDiscountPayment = (
  phoneNumber: number,
  userId: string,
) =>
  promiseDispatch(
    'make100PercentDiscountPayment',
    async (dispatch: Function, getState: GetState) => {
      const state = getState();
      const { discount: { data } } = state;
      const discountObject = data;
      if (!discountObject) {
        throw Error('discount should be defined here');
      }

      const amountOfPeople = getAmount(state);

      dispatch(push('/order/payment-result/pending'));

      const { order: { data: { orderId } } } = state;

      try {
        const { event: { data: event } } = getState();
        const currencyobjectId = event.currency.objectId;

        await set100PercentDiscountPayment({
          discountObject,
          orderobjectId: orderId,
          currencyobjectId,
          environment: CIRCUIT === 'production' ? 'production' : 'sandbox',
          amount: parseInt(amountOfPeople),
          phoneNumber,
          userId,
        });

        dispatch(push('/order/payment-result/success'));
      } catch (e) {
        dispatch(push('/order/payment-result/fail'));
        throw e;
      }
    },
  );

export const fetchReviewData = ({ orderId }: { orderId: string }) => async (
  dispatch: Function,
) => {
  try {
    const fetchedEvent = await order.getOrderEventByOrderId({ orderId });

    dispatch(fetchedEventForCreateReview(fetchedEvent));
  } catch (e) {
    console.log(e);

    dispatch(
      notifyError({ message: loc.errors.CREATING_REVIEW_NO_SUCH_ORDER }),
    );
    dispatch(push('/notfound'));
  }
};

export const fetchDiscoverData = (cityName: string) => async (
  dispatch: Function,
  getState: GetState,
) => {
  const findCityByName = (cities: Array<ParseCitiesInstance>, name: string) => {
    return R.find(
      city => city && city.city.toLowerCase() === name.toLowerCase(),
    )(cities);
  };
  const { cities, city, events } = getState();

  if (city.data.city === cityName) {
    if (!events.data && events.meta.state !== 'loading') {
      await dispatch(fetchEvents({ city: city.data.objectId }));
    }
    return;
  }

  const foundCity = findCityByName(cities.data, cityName);

  if (!foundCity) {
    dispatch(push('/notfound'));
    return;
  }

  dispatch(updateCity(foundCity));
  dispatch(fetchEvents({ city: foundCity.objectId }));
};

export const editEvent = (eventId: string) => async (
  dispatch: Function,
  getState: GetState,
) => {
  const { session: { objectId: userId } } = getState();
  const fetchedEvent = await event.getEventById({ eventId });

  dispatch(fetchedEventForCreateEvent({ ...fetchedEvent, userId }));
  dispatch(push('/events/create/select-city'));
};

export const onSubmitCreateEvent = () => async (
  dispatch: Function,
  getState: GetState,
) => {
  const { session: { objectId: userId }, createEvent } = getState();

  dispatch(push('/events/create/pending'));
  try {
    await event.updateEventProcedure({
      ...createEvent,
      userId,
      cityId: createEvent.city.objectId,
    });
    dispatch(cleanCreateEvent());
    dispatch(updateSession());
    dispatch(push('/events/create/success'));
  } catch (e) {
    dispatch(cleanCreateEvent());
    dispatch(updateSession());
    dispatch(push('/events/create/fail'));
    throw e;
  }
};

const mapSofort = {};
export const onMaybeSofortResult = (msg: Object) => (
  dispatch: Function,
  getState: GetState,
) => {
  let queryDict;

  const { id: orderId } = getSofortOrder(getState());

  const cleanDomainFromWWW = str => {
    if (str.indexOf('www.chef') !== -1) {
      return str.replace('www.chef', 'chef');
    }
    return str;
  };

  let finalOrigin = cleanDomainFromWWW(location.origin);
  let finalMsgOrigin = cleanDomainFromWWW(msg.origin);

  if (finalMsgOrigin === finalOrigin) {
    try {
      queryDict = JSON.parse(msg.data);
      console.log(msg.data);
      if (queryDict.status === 'success') {
        if (mapSofort[queryDict.locationSearch]) {
          return;
        }
        mapSofort[queryDict.locationSearch] = true;
        fetch(`/api-payment/sofort/notify${queryDict.locationSearch}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        })
          .then(() => {
            dispatch(push(`/order/payment-result/success?orderId=${orderId}`));
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        dispatch(push('/order/payment-result/fail'));
      }
    } catch (err) {
      console.log(err);
    }
  }
};
