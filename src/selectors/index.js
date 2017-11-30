// @flow

import type { ParseEventInstance } from '../parseApi/api/Event';
import type { Parse_UserInstance } from '../parseApi/api/_User';
import type { ParseCitiesInstance } from '../parseApi/api/Cities';
import { Currencies } from '../parseApi/api';
import type { ReduxState } from '../redux/type';
import R from 'ramda';

import moment from 'moment';

export const remapEventFunc = ({
  objectId,
  chefAvatar,
  city,
  eventStart,
  servingsSold,
  //$FlowIssue
  image1,
  price,
  //$FlowIssue
  name,
  //$FlowIssue
  currency: { symbol: currencySymbol },
  //$FlowIssue
  title,
  chef,
}: *) => {
  const mom = moment(eventStart);
  return {
    objectId,
    price,
    currency: currencySymbol,
    foodImage: image1,
    title,
    numberOfGuestsBooked: servingsSold,
    month: mom.format('MMM').toUpperCase(),
    date: mom.date(),
    time: `${mom.format('ddd HH:mm')} Uhr`,
    address: city,
    chef: {
      avatar: chefAvatar,
      name,
      //$FlowIssue
      rating: chef.rating_average,
      //$FlowIssue
      bio: chef.objectIdUser.bio,
    },
  };
};

const zeroOrPositive = (val: number) => (val < 0 ? 0 : val);

type StateBoolFunc = any;
type Selector = any;

export const getCityImage = (
  city: ParseCitiesInstance,
  forWeb: boolean,
): string => {
  const imageFile = forWeb ? city.city_image_web : city.city_image;
  return imageFile ? imageFile.url : '';
};

const defaultBaseSelector = (
  condition: StateBoolFunc,
  selector: Selector,
  defaultValue: any = null,
) => (state: ReduxState) => {
  const res = condition(state) ? selector(state) : defaultValue;
  return res;
};

const defaultSelector = (
  propName: string,
  selector: Selector,
  defaultValue: any = null,
) =>
  defaultBaseSelector(
    state =>
      state[propName] &&
      state[propName].meta &&
      state[propName].meta.state === 'success',
    state => selector(state[propName].data, state),
    defaultValue,
  );

export const getEvent = defaultSelector('event', R.identity);
export const getEventId = defaultSelector('event', ({ objectId }) => objectId);

export const getObjectIdEventObject = (state: ReduxState) =>
  getEvent(state).objectIdEvent;

export const getDiscountId = defaultSelector(
  'discount',
  ({ objectId }) => objectId,
);
export const getDiscountObject = defaultSelector(
  'discount',
  ({ originalObject }) => originalObject,
);
export const getDiscountCode = defaultSelector('discount', ({ code }) => code);

const discountAssert = (state: ReduxState) => {
  const { discount } = state;
  if (!discount || discount.meta.state !== 'success') {
    throw Error('Discount should be initialized here');
  }
};

const eventAssert = (state: ReduxState) => {
  const { event } = state;
  if (!event || !event.data || !event.data.price) {
    throw Error('Event should be initialized here');
  }
};

export const getDiscountCash = (state: ReduxState) => {
  eventAssert(state);

  try {
    discountAssert(state);
  } catch (e) {
    return 0;
  }

  const { discount: { data } } = state;

  const discountObject = data;

  if (!discountObject) {
    throw Error('discountObject should be defined here');
  }

  const percentage = discountObject.percentage || 0;
  const cash = discountObject.cash || 0;
  return Math.ceil(cash ? cash : getPrice(state) * (percentage / 100));
};

const getDiscount = (state: ReduxState) => {
  return {
    objectIdDiscount: getDiscountObject(state),
    discountCode: getDiscountCode(state),
    discountPrice: getDiscountCode(state) && getDiscountCash(state),
  };
};

export const getDiscountPrice = (state: ReduxState) => {
  eventAssert(state);

  return Math.ceil(zeroOrPositive(getPrice(state) - getDiscountCash(state)));
};

export const getAmount = ({ amount }: { amount: number }) => amount;

const getRawPrice = event => {
  if (!event) {
    throw Error('event should be defined');
  }
  return event.price;
};
const getCurrentEventRawPrice = defaultSelector('event', getRawPrice);

const getFood = state => ({
  foodPrice: getCurrentEventRawPrice(state),
  foodPriceTotal: getPrice(state),
});

export const getUserId = (state: ReduxState) => state.session.objectId;
export const getSessionPhone = ({
  session: { phone },
}: {
  session: { phone: string },
}) => phone;

export const getPhoneString = (state: ReduxState) => {
  if (state.orderProps) {
    return state.orderProps && state.orderProps.phone;
  }
  return '+' + getSessionPhone(state);
};

const getPhoneNumber = (state: ReduxState) => {
  const phoneString = getPhoneString(state);
  if (!phoneString) {
    return null;
  }

  return parseInt(phoneString.slice(1));
};

export const getOrderMessage = (state: ReduxState) => {
  return state.orderProps ? state.orderProps.message || '' : '';
};

const getServiceFeePercentage = (state: ReduxState) => state.fee.data || null;

export const getRawEventServiceFeeFunc = (price: number, feePercent: number) =>
  Math.ceil(price * feePercent / 100);

export const getRawEventServiceFee = (
  event: ParseEventInstance,
  feePercent: ?number,
) => {
  const price = getRawPrice(event);

  if (!price) {
    throw Error('price made bad data');
  }

  if (!feePercent) {
    throw Error('feePercent made bad data');
  }

  return getRawEventServiceFeeFunc(price, feePercent);
};

export const getEventServiceFee = (
  event: ParseEventInstance,
  feePercent: ?number,
): number => {
  const fee = getRawEventServiceFee(event, feePercent);
  const price = getRawPrice(event);

  if (!price || !fee) {
    throw Error('getEventServiceFee made bad data');
  }

  return Math.ceil(price + fee);
};

export const getServiceFee = (state: ReduxState) =>
  getEventServiceFee(
    state.event && state.event.data,
    state.fee && state.fee.data,
  );

export const getPrice = (state: ReduxState) =>
  getServiceFee(state) * getAmount(state);

export const getSofortOrderData = (state: ReduxState) => ({
  amount: getAmount(state),
  objectIdEvent: getObjectIdEventObject(state),
  ...getFood(state),
  phone: getPhoneNumber(state),
  serviceFee: getRawEventServiceFee(
    getEvent(state),
    getServiceFeePercentage(state),
  ),
  userMsg: getOrderMessage(state),
  discount: getDiscount(state),
  serviceFeePercentage: getServiceFeePercentage(state),
});

export const getSofortOrder = defaultSelector('sofortOrder', R.identity, {});
export const getSofort = defaultSelector('sofortOrder', R.identity, {});

export const getSofortOrderPageData = defaultBaseSelector(
  (state: ReduxState) => getSofortOrderData(state) && getSofortOrder(state),
  (state: ReduxState) => {
    const sofortOrder = getSofortOrder(state);
    return {
      amount: getDiscountPrice(state),
      currency_id: currencyStateSelector(state).name,
      objectId: getSofortOrder(state).objectId,
      version: 'PENDING_VERSION',
      timestamp: sofortOrder.timestamp,
    };
  },
  {},
);

export const getLocation = ({
  routing: { locationBeforeTransitions: location },
}: {
  routing: { locationBeforeTransitions: Object },
}) => location;

export const getPrevLocation = ({
  routing: { previousLocation: location },
}: {
  routing: { previousLocation: Object },
}) => location;

const getAvatar = (user: Parse_UserInstance): string | null => {
  if (!user || !user.avatar) {
    return null;
  }
  return user.avatar.url;
};

export const userSelector = (user: Parse_UserInstance) => ({
  ...user,
  phone: user.phone && user.phone.toString(),
  avatar: getAvatar(user),
});

export const priceSelector = (event: *) => ({
  price: event.price,
  currency: Currencies.EnsureInstance(event.currency),
});

export const currencyStateSelector = defaultSelector(
  'event',
  ({ currency }) => currency,
);

export const paymentBaseSelector = (state: ReduxState) => {
  const loaded = state.event.meta.state === 'success';
  const event = loaded ? state.event.data : {};

  return {
    phone: getPhoneString(state),
    discountCode: getDiscountCode(state),
    price: getPrice(state) || 0,
    currency: currencyStateSelector(state),
    soldOut: loaded
      ? (event.servingsSold ? event.servingsSold : 0) >=
        (event.servings ? event.servings : 0)
      : false,
    amount: getAmount(state),
    event,
  };
};

export const bookingDetailsSelector = (state: ReduxState) => {
  const loading =
    state.event.meta.state !== 'success' || state.fee.meta.state !== 'success';

  if (loading) {
    return { loading };
  }

  const { event, attendees, loadedOrder, messages, session, message } = state;

  return {
    ...paymentBaseSelector(state),
    session,
    event: event.data || {},
    order: loadedOrder.data || {},
    attendees: attendees.data || [],
    messages: messages.data || [],
    newMessage: message || null,
  };
};

export const summarySelector = (state: ReduxState) => {
  const paymentBase = paymentBaseSelector(state);

  const loading = state.event.meta.state !== 'success';
  const { discount } = state;

  const { firstName, avatar, currency, title, eventStart } = paymentBase.event;

  const { orderProps: { phone, message } } = state;

  const hasDiscount = discount.meta.state === 'success';
  const discountCash = hasDiscount ? getDiscountCash(state) : 0;

  const res = {
    ...paymentBase,
    currency,
    loading,
    hasDiscount,
    eventStart,
    discountCash,
    phone,
    message,
    name: firstName,
    image: avatar,
    foodName: title,
    clientToken: state.order.data && state.order.data.clientToken,
    paymentLoading: state.finalizeOrder.meta.state === 'loading',
    //amount: getDiscountPrice(state),
    currency_id: currency && currency.name,
    version: 'PENDING_VERSION',
    timestamp: new Date().getTime(),
    finalPrice: getDiscountPrice(state) || 0,
    originalPrice: getServiceFee(state),
    discountCode: getDiscountCode(state),
    discountId: hasDiscount && state.discount.data.objectId,
    userId: getUserId(state),
    eventId: getEventId(state),
    userMessage: getOrderMessage(state),
    objectId: getSofortOrder(state).objectId,
    ...getDiscount(state),
  };

  return res;
};

const getEventWithPrice = (event, state) => ({
  ...event,
  price: getEventServiceFee(event, getServiceFeePercentage(state)),
});

export const getEventsWithPrices = (eventsSelector: Function) =>
  defaultBaseSelector(
    (state: ReduxState) =>
      eventsSelector(state).data &&
      eventsSelector(state).data.map &&
      getServiceFeePercentage(state),
    (state: ReduxState) => {
      const events = eventsSelector(state);
      return events.data.map(event => getEventWithPrice(event, state));
    },
    [],
  );

export const paymentSelector = (state: ReduxState) => {
  const { finalizeOrder, order, amount } = state;

  return {
    loading: finalizeOrder.meta.state === 'loading',
    ready: order.data && order.data.clientToken,
    clientToken: order.data && order.data.clientToken,
    userMessage: getOrderMessage(state),
    userId: getUserId(state),
    phone: getPhoneString(state),
    amount,
    eventId: getEventId(state),
    ...getDiscount(state),
  };
};

export const inboxSelector = (state: ReduxState) => {
  const { session, orders } = state;
  return {
    session,
    orders: orders.data || [],
    ordersLoading: orders.meta.state === 'loading',
    ordersLoaded: orders.meta.state === 'success',
  };
};

export const baseLoadingSelector = (state: ReduxState) => {
  let { fee, cities, city } = state;

  return {
    loading:
      fee.meta.state !== 'success' ||
      cities.meta.state !== 'success' ||
      !city.data,
  };
};

export const homeSelector = (state: ReduxState) => {
  let { events, passedEvents, cities, stickyEvent } = state;

  const { loading } = baseLoadingSelector(state);

  const eventsLoaded = !loading && events.meta.state === 'success';
  const eventsLoading = !eventsLoaded;
  const passedEventsLoaded = !loading && passedEvents.meta.state === 'success';
  const passedEventsLoading = !passedEventsLoaded;
  const stickyLoading =
    !stickyEvent.data || stickyEvent.meta.state !== 'success';

  return {
    eventsLoading,
    eventsLoaded,
    passedEventsLoading,
    passedEventsLoaded,
    passedEvents: !loading
      ? getEventsWithPrices(({ passedEvents }) => passedEvents)(state)
      : [],
    events: !loading ? getEventsWithPrices(({ events }) => events)(state) : [],
    sticky:
      !loading && stickyEvent.meta.state === 'success'
        ? getEventWithPrice(stickyEvent.data, state)
        : null,
    stickyLoading: stickyLoading,
    cities: cities && cities.data,
    city: state.city.data,
  };
};

export const selectCitySelector = (state: ReduxState) => ({
  cities: (state.cities && state.cities.data) || [],
});
