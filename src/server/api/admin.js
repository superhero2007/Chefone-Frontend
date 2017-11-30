// @flow

import type { ParseOrderInstance } from '../../parseApi/api/Order';
import type { ParseEventInstance } from '../../parseApi/api/Event';
import R from 'ramda';
import { asyncPostMix } from './helpers';
import { getEventServiceFee } from '../../selectors';
import { getStatus, hasOrders } from './event';
import { calcEarnings } from './payment';
import type { PropsT as PaymentOverviewT } from '../../components/Admin/Events/PaymentsOverview';

import { getFee } from './fee';
import {
  Food,
  Currencies,
  Chef,
  Order,
  _User,
  Event,
} from '../../parseApi/api';
import type { Parse_UserInstance } from '../../parseApi/api/_User';

import moment from 'moment';

export const getOrdersByEvent = async (
  objectId: string,
): Promise<Array<ParseOrderInstance>> => {
  return await Order.Get({
    equalTo: [
      Order.Field.objectIdEvent(Event.Pointer(objectId)),
      Order.Field.finalized(true),
    ],
    notEqualTo: [Order.Field.refunded(true)],
  });
};

type MoneyStat<T> = {
  nettoPrice: T,
  nettoTotal: T,
  bruttoPrice: T,
  bruttoTotal: T,
  serviceFeeTotalPercent: T,
  serviceFeeTotal: T,
  discountTotal: T,
};

export const getEventMoneyStats = async (
  objectId: string,
): Promise<MoneyStat<number>> => {
  const event = await Event.GetById(objectId);
  const orders = await getOrdersByEvent(objectId);

  let priceWithFee;
  if (!orders.length) {
    const fee = await getFee();
    priceWithFee = getEventServiceFee(event, fee);
  } else {
    const firstOrder = orders[0];
    if (!firstOrder.serviceFee || !firstOrder.amount) {
      priceWithFee = 'Error check DB';
    } else {
      priceWithFee = event.price + firstOrder.serviceFee / firstOrder.amount;
    }
  }

  const { foodPrice, foodPriceTotal, discountPrice } = R.reduce(
    (prev, next) => {
      const discountPrice = next.discountPrice || 0;
      return {
        foodPrice: prev.foodPrice + next.foodPrice,
        foodPriceTotal: prev.foodPriceTotal + next.foodPriceTotal,
        discountPrice: prev.discountPrice + discountPrice,
      };
    },
    {
      foodPrice: 0,
      foodPriceTotal: 0,
      discountPrice: 0,
    },
  )(orders);

  const discountTotal = discountPrice;
  const nettoPrice = event.price || 0;
  const nettoTotal = foodPrice;
  const bruttoPrice = priceWithFee;
  const bruttoTotal = foodPriceTotal;
  const serviceFeeTotal = bruttoTotal - nettoTotal;
  const serviceFeeTotalPercent = serviceFeeTotal / bruttoTotal * 100;

  //$FlowIssue
  return {
    nettoPrice,
    nettoTotal,
    bruttoPrice,
    bruttoTotal,
    serviceFeeTotalPercent,
    serviceFeeTotal,
    discountTotal,
  };
};

export const canSendReviewStatuses = {
  notSended: 'notSended',
  sended: 'sended',
  invalid: 'invalid',
};

export type AdminEventInfoBase = {
  canSendReviewStatus: $Keys<typeof canSendReviewStatuses>,
  passed: boolean,
  objectId: string,
  firstName: string,
  lastName: string,
  chefName: string,
  title: string,
  timeStart: string,
  dateStart: string,
  date: string,
  servings: number,
  servingsSold: number,
  servingsVsSold: string,
  status: string,
  currencySymbol: string,
  locationAddress: string,
  locationDetails: string,
  avatar: string,
  email: string,
  phone: string,
  userId: string,
  chefId: string,
  foodId: string,
} & MoneyStat<number>;

export type AdminEventInfo = {
  canSendReviewStatus: $Keys<typeof canSendReviewStatuses>,
  passed: boolean,
  objectId: string,
  firstName: string,
  lastName: string,
  chefName: string,
  title: string,
  date: string,
  servings: number,
  servingsSold: number,
  servingsVsSold: string,
  status: string,
  currencySymbol: string,
} & MoneyStat<number>;

type EventsMode = 'passed' | 'active' | 'all';

export const getAdminEventsBase = async ({
  limit,
  page,
  mode,
  greaterDate,
  lessDate,
  objectId,
}: {
  limit?: number,
  page?: number,
  mode?: EventsMode,
  objectId?: string,
  greaterDate?: string,
  lessDate?: string,
}): Promise<Array<AdminEventInfoBase>> => {
  mode = mode || 'all';

  let queryParams = {
    include: ['chef', 'chef.objectIdUser', 'objectIdFood', 'currency', 'city'],
    descending: ['eventStart'],
    greaterThan: greaterDate
      ? Event.Field.eventStart(new Date(greaterDate))
      : undefined,
    lessThan: lessDate ? Event.Field.eventStart(new Date(lessDate)) : undefined,
    equalTo: [
      Event.Field.active(true),
      Event.Field.userActive(true),
      ...(objectId ? [Event.Field.objectId(objectId)] : []),
    ],
    limit: limit ? limit : undefined,
    skip: page && limit ? page * limit : undefined,
  };

  if ((!objectId && mode === 'passed') || mode === 'active') {
    const field = Event.Field.eventStart(new Date());
    if (mode === 'passed') {
      queryParams = { lessThanOrEqualTo: field, ...queryParams };
    } else if (mode === 'active') {
      queryParams = { greaterThan: field, ...queryParams };
    }
  }

  const events = await Event.Get(queryParams);

  console.log(`matched ${events.length} events`);

  const resEvents = await asyncPostMix(
    {
      moneyStats: async ({ objectId }) => await getEventMoneyStats(objectId),
      hasOrders: async ({ objectId }) => {
        return await hasOrders({ eventId: objectId });
      },
    },
    events,
  );

  const finalEvents = resEvents.map(
    (
      event: ParseEventInstance & {
        moneyStats: MoneyStat<number>,
      },
    ): AdminEventInfoBase => {
      const moneyStats = event.moneyStats;
      const reviewMailSent = event.reviewMailSent;
      const hasOrders = event.hasOrders;
      const objectId = event.objectId;
      const servings = event.servings || 0;
      const servingsSold = event.servingsSold || 0;
      const servingsVsSold = servingsSold + '/' + servings;
      const locationAddress =
        event.locationAddress || 'Error: locationAddress not fetched';
      const locationDetails =
        event.locationDetails || 'Error: locationDetails not fetched';

      const eventStart = event.eventStart;

      const status = getStatus(event);

      if (!eventStart) {
        throw Error('eventStart not fetched');
      }

      const momentEventStart = moment(eventStart);
      const passed = moment().isAfter(momentEventStart);

      const dateStart = momentEventStart.format('MMM DD, YYYY');
      const timeStart = momentEventStart.format('h:mm A');

      const date = dateStart + ' ' + timeStart;

      const currency = Currencies.EnsureInstance(event.currency);
      const currencySymbol = currency.symbol || 'Error: currency not found';

      const objectIdFood = Food.EnsureInstance(event.objectIdFood);
      const foodId = objectIdFood.objectId;
      const title = objectIdFood.title || 'Error: title not fetched';

      const chef = Chef.EnsureInstance(event.chef);
      const chefId = chef.objectId;

      const objectIdUser: Parse_UserInstance = _User.EnsureInstance(
        chef.objectIdUser,
      );
      const userId = objectIdUser.objectId;
      const firstName =
        objectIdUser.firstName || 'Error: firstName not fetched';
      const lastName = objectIdUser.lastName || 'Error: lastName not fetched';
      const chefName = firstName + ' ' + lastName;

      const phone =
        (objectIdUser.phone && objectIdUser.phone.toString()) ||
        'Error: phone not fetched';
      const email =
        objectIdUser.email ||
        objectIdUser.fb_email ||
        'Error: email not fetched';
      const avatar =
        (objectIdUser.avatar && objectIdUser.avatar.url) ||
        'Error: avatar not fetched';

      let canSendReviewStatus = reviewMailSent
        ? canSendReviewStatuses.sended
        : canSendReviewStatuses.notSended;

      if (!hasOrders || momentEventStart.isAfter(moment())) {
        canSendReviewStatus = canSendReviewStatuses.invalid;
      }

      return {
        canSendReviewStatus,
        passed,
        objectId,
        date,
        dateStart,
        timeStart,
        firstName,
        lastName,
        chefName,
        title,
        servings,
        servingsSold,
        servingsVsSold,
        currencySymbol,
        status,
        locationAddress,
        locationDetails,
        avatar,
        email,
        phone,
        userId,
        chefId,
        foodId,
        ...moneyStats,
      };
    },
  );

  return finalEvents;
};

export const getAdminEvents = async (
  params: *,
): Promise<Array<AdminEventInfo>> => {
  const events = await getAdminEventsBase(params);

  return events.map(
    ({
      canSendReviewStatus,
      passed,
      objectId,
      firstName,
      lastName,
      chefName,
      title,
      date,
      servings,
      servingsSold,
      servingsVsSold,
      status,
      currencySymbol,
      nettoPrice,
      nettoTotal,
      bruttoPrice,
      bruttoTotal,
      serviceFeeTotalPercent,
      serviceFeeTotal,
      discountTotal,
    }) => ({
      canSendReviewStatus,
      passed,
      objectId,
      firstName,
      lastName,
      chefName,
      title,
      date,
      servings,
      servingsSold,
      servingsVsSold,
      status,
      currencySymbol,
      nettoPrice,
      nettoTotal,
      bruttoPrice,
      bruttoTotal,
      serviceFeeTotalPercent,
      serviceFeeTotal,
      discountTotal,
    }),
  );
};

export const getPaymentOverview = async (): Promise<PaymentOverviewT> => {
  const currentDateStr = moment().toISOString();
  const monthAgoMom = moment().subtract(1, 'month');
  const prevMonthEndDateStr = monthAgoMom
    .clone()
    .endOf('month')
    .toISOString();
  const prevMonthStartDateStr = monthAgoMom
    .clone()
    .startOf('month')
    .toISOString();

  //$FlowIssue
  const currentMonthEarnings = await calcEarnings({
    greaterDate: prevMonthEndDateStr,
    lessDate: currentDateStr,
  });
  //$FlowIssue
  const prevMonthEarnings = await calcEarnings({
    greaterDate: prevMonthStartDateStr,
    lessDate: prevMonthEndDateStr,
  });
  const thisMonthEarnings = currentMonthEarnings;
  const lastMonthEarnings = prevMonthEarnings;

  const percent = (thisMonthEarnings / lastMonthEarnings - 1) * 100;
  return {
    thisMonthEarnings: thisMonthEarnings.toString(),
    lastMonthEarnings: lastMonthEarnings.toString(),
    percent: parseInt(percent.toFixed(0)),
  };
};

export type EventPanel = {
  eventId: string,
  timeStart: string,
  dateStart: string,
  locationAddress: string,
  locationDetails: string,
  eventTitle: string,
  nettoTotal: string,
  bruttoTotal: string,
  serviceFeeTotal: string,
  serviceFeeTotalPercent: string,
  servings: number,
  servingsSold: number,
};

export type ChefPanel = {
  firstName: string,
  lastName: string,
  avatar: string,
  email: string,
  phone: string,
  userId: string,
  chefId: string,
  foodId: string,
};

export const STATUSES = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  NOT_AVAILABLE: 'NOT_AVAILABLE',
};

export type AdminEventOrder = {
  objectId: string,
  email: string,
  date: string,
  transactionStatus: $Keys<typeof STATUSES>,
  customer: string,
  quantity: string,
  phone: string,
  customerMessage: ?string,
  foodPrice: string,
  serviceFee: string,
  total: string,
  status: $Keys<typeof STATUSES>,
  systemMessage: ?string,
  refunded: $Keys<typeof STATUSES>,
};

export type AdminEventDetails_Dashboard = {
  guests: number,
  serviceFeeTotal: string,
  bruttoTotal: string,
};

export type AdminEventDetails = {
  eventPanel: EventPanel,
  chefPanel: ChefPanel,
  ordersPanel: Array<AdminEventOrder>,
  dashboard: AdminEventDetails_Dashboard,
};

export const getAdminEventOrders = async (
  eventId: string,
): Promise<Array<AdminEventOrder>> => {
  const orders = await Order.Get({
    equalTo: [Order.Field.objectIdEvent(Event.Pointer(eventId))],
    include: ['objectIdUser'],
  });

  return orders.map((order: ParseOrderInstance) => {
    const foodPrice = order.foodPrice ? order.foodPrice + '€' : 'N/A';
    const serviceFee = order.serviceFee ? order.serviceFee + '€' : 'N/A';
    const total = order.foodPriceTotal ? order.foodPriceTotal + '€' : 'N/A';
    const customerMessage = order.userMsg ? order.userMsg : null;
    const systemMessage = order.systemMsg ? order.systemMsg : null;
    const quantity = order.amount ? order.amount.toString() : 'N/A';
    const phone =
      (order.phone && order.phone.toString()) || 'Error: phone not fetched';
    let firstName, lastName, email;
    try {
      const objectIdUser = _User.EnsureInstance(order.objectIdUser);
      firstName = objectIdUser.firstName || 'Error: firstName not fetched';
      lastName = objectIdUser.lastName || 'Error: lastName not fetched';
      email =
        objectIdUser.email ||
        objectIdUser.fb_email ||
        'Error: email not fetched';
    } catch (e) {
      firstName = 'Error: firstName not fetched';
      lastName = 'Error: lastName not fetched';
      email = 'Error: email not fetched';
    }
    const customer = firstName + ' ' + lastName;
    const statusMap = {
      undefined: STATUSES.NOT_AVAILABLE,
      [1]: STATUSES.SUCCESS,
      [-1]: STATUSES.FAIL,
    };
    const orderStatus = order.status;
    const status =
      statusMap[orderStatus === undefined ? 'undefined' : orderStatus];
    const finalised = order.finalized;
    const transactionStatus =
      finalised === undefined
        ? STATUSES.NOT_AVAILABLE
        : finalised ? STATUSES.SUCCESS : STATUSES.FAIL;
    const orderRefunded = order.refunded;
    const refunded =
      orderRefunded === undefined
        ? STATUSES.NOT_AVAILABLE
        : orderRefunded ? STATUSES.SUCCESS : STATUSES.FAIL;
    const date = moment(order.createdAt).format('MMM DD, YYYY HH:mm');
    const objectId = order.objectId;
    return {
      objectId,
      phone,
      email,
      date,
      transactionStatus,
      customer,
      quantity,
      customerMessage,
      foodPrice,
      serviceFee,
      total,
      status,
      systemMessage,
      refunded,
    };
  });
};
export const getEventDetails = async ({
  objectId,
}: {
  objectId: string,
}): Promise<AdminEventDetails> => {
  const events = await getAdminEventsBase({
    objectId,
  });
  if (!events || events.length !== 1) {
    throw Error(`no event with objectId ${objectId}`);
  }
  const [fetchedAdminEvent] = events;
  const {
    firstName,
    lastName,
    title,
    timeStart,
    dateStart,
    servings,
    servingsSold,
    currencySymbol,
    nettoTotal,
    bruttoTotal,
    serviceFeeTotal,
    serviceFeeTotalPercent,
    locationAddress,
    locationDetails,
    avatar,
    email,
    phone,
    userId,
    chefId,
    foodId,
  } = fetchedAdminEvent;
  const nettoTotalStr = nettoTotal + currencySymbol;
  const serviceFeeTotalStr = serviceFeeTotal + currencySymbol;
  const bruttoTotalStr = bruttoTotal + currencySymbol;
  const eventPanel = {
    eventId: objectId,
    timeStart,
    dateStart,
    locationAddress,
    locationDetails,
    eventTitle: title,
    nettoTotal: nettoTotalStr,
    bruttoTotal: bruttoTotalStr,
    serviceFeeTotal: serviceFeeTotalStr,
    serviceFeeTotalPercent: serviceFeeTotalPercent.toFixed(0),
    servings,
    servingsSold,
  };
  const chefPanel = {
    firstName,
    lastName,
    avatar,
    email,
    phone,
    userId,
    chefId,
    foodId,
  };
  const ordersPanel = await getAdminEventOrders(objectId);
  const dashboard = {
    guests: servingsSold,
    serviceFeeTotal: serviceFeeTotalStr,
    bruttoTotal: bruttoTotalStr,
  };
  return {
    eventPanel,
    chefPanel,
    ordersPanel,
    dashboard,
  };
};
