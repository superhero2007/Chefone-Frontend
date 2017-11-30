// @flow

import { safeGetImage } from '../../utils';
import moment from 'moment';
import R from 'ramda';
import * as chef from './chef';
import {
  Reviews,
  Event,
  Chef,
  Order,
  _User,
  Food,
  Backend,
} from '../../parseApi/api';
import type { ParseReviewsInstance } from '../../parseApi/api/Reviews';
import { sendJsonPostSimple } from './helpers';

const sortOrdersByEventStart = orders => {
  if (orders[0] && orders[1]) {
    orders.sort((order1, order2) => {
      if (!order2.objectIdEvent || !order2.objectIdEvent.eventStart) {
        throw Error('order2.objectIdEvent.eventStart undefined');
      }

      if (!order1.objectIdEvent || !order1.objectIdEvent.eventStart) {
        throw Error('order1.objectIdEvent.eventStart undefined');
      }

      return order2.objectIdEvent.eventStart - order1.objectIdEvent.eventStart;
    });
  }
};
export const countReviewsForEvent = async (eventId: string) =>
  Reviews.Count({
    equalTo: [
      Reviews.Field.active(true),
      Reviews.Field.objectIdEvent(Event.Pointer(eventId)),
    ],
  });

export const getOrdersNeedReview = async ({
  include,
  eventsIds,
  greaterDate,
  lessDate = moment()
    .subtract(10, 'hour')
    .toISOString(),
  limit,
  userId,
  noEmail,
}: {
  include?: *,
  eventsIds?: Array<string>,
  greaterDate?: string,
  lessDate?: string,
  userId?: string,
  limit?: number,
  noEmail?: boolean,
}) => {
  const params = {
    include: include ? include : ['objectIdEvent'],
    doesNotExist: 'review',
    notEqualTo: [
      ...(noEmail ? [Order.Field.reviewMailSent(true)] : []),
      Order.Field.refunded(true),
    ],
    equalTo: [
      Order.Field.finalized(true),
      ...(userId ? [Order.Field.objectIdUser(_User.Pointer(userId))] : []),
    ],
    matchQueries: [
      {
        fieldName: 'objectIdEvent',
        queryType: 'Event',
        query: {
          greaterThan: greaterDate
            ? Event.Field.eventStart(new Date(greaterDate))
            : undefined,
          lessThan: lessDate
            ? Event.Field.eventStart(new Date(lessDate))
            : undefined,
          limit,
          containedIn: eventsIds && {
            fieldName: 'objectId',
            values: eventsIds,
          },
        },
      },
    ],
  };

  const orders = await Order.Get(params);

  sortOrdersByEventStart(orders);

  return orders;
};

export const listOrdersNeedReview = async (opts: *) =>
  //$FlowIssue
  R.pluck('objectId')(await getOrdersNeedReview(opts));

export const listEventsNeedReview = async (opts: *) =>
  R.compose(R.uniq, R.map((order: *) => order.objectIdEvent.objectId))(
    await getOrdersNeedReview(opts),
  );

export const fetchCrono = async () => {
  return (await Backend.Get({
    equalTo: [Backend.Field.service('reviewCrono')],
    limit: 1,
  }))[0];
};

export const setLastSendedReviewReminderDate = async ({
  date,
}: {
  date: string,
}) => {
  const chrono = await fetchCrono();
  await Backend.Set({
    objectId: chrono.objectId,
    lastTimeSent: new Date(date),
  });
  return true;
};
export const getLastSendedReviewReminderDate = async () => {
  return moment((await fetchCrono()).lastTimeSent).toISOString();
};
type ReviewReminders = any;
export const getReviewRemindersTimeSpan = async (): Promise<
  ReviewReminders,
> => {
  const yesterday = moment().subtract(1, 'day');
  const greaterDate = moment
    .min(yesterday, moment(await getLastSendedReviewReminderDate()))
    .toISOString();
  const lessDate = yesterday.toISOString();
  return {
    lessDate,
    greaterDate,
  };
};

export const getChefReviews = async ({
  userId,
}: {
  userId: string,
}): Promise<Array<*>> => {
  const maybeChef = await chef.getChefByUser({ userId });

  if (maybeChef) {
    return await getReviews({ chefId: maybeChef });
  }
  return [];
};

export const getUserReviews = async ({
  userId,
}: {
  userId: string,
}): Promise<Array<*>> => {
  const [myChefReviews, ordersToReview] = await Promise.all([
    getChefReviews({ userId }),
    getOrdersNeedReview({
      userId,
      include: ['objectIdEvent.chef.objectIdUser'],
    }),
  ]);

  //$FlowIssue
  const chefsAwaitsForMyReview = R.map(
    ({
      objectId: orderId,
      objectIdEvent: {
        chef: { objectIdUser: { avatar, objectId: chefUserId, firstName } },
      },
    }) => ({
      type: 'chefsAwaitForMyReview',
      avatar: avatar ? avatar.url : null,
      orderId,
      chefUserId,
      name: firstName,
    }),
  )(ordersToReview);

  return [
    ...chefsAwaitsForMyReview,
    ...R.map(review => ({ ...review, type: 'myChefReview' }))(myChefReviews),
  ];
};

export const getReviews = async ({
  limit,
  chefId,
  page,
}: {
  limit?: number,
  chefId?: string,
  page?: number,
}): Promise<*> => {
  const reviews = await Reviews.Get({
    include: ['chef', 'objectIdFood', 'objectIdUser', 'objectIdEvent'],
    equalTo: [
      Reviews.Field.active(true),
      ...(chefId ? [Reviews.Field.chef(Chef.Pointer(chefId))] : []),
    ],
    limit,
    descending: ['createdAt'],
    skip: page && limit && page * limit,
  });

  return reviews.map((review: ParseReviewsInstance) => {
    const { user_review, rating } = review;
    const objectIdUser = _User.EnsureInstance(review.objectIdUser);
    const firstName = objectIdUser.firstName;
    const avatar = safeGetImage(objectIdUser, 'avatar');

    if (!review.createdAt) {
      throw Error('data.createdAt undefined');
    }

    const createdAtMonthAndYear = moment(review.createdAt).format('MMMM YYYY');
    return {
      objectId: review.objectId,
      text: user_review,
      name: firstName,
      createdAtMonthAndYear,
      avatar,
      rating,
    };
  });
};

export type UpdateReviewData = {
  eventId: string,
  orderId: string,
  userId: string,
  submitedRating: number,
  reviewText: string,
  reviewCompanyText: string,
};

export const updateReview = async ({
  eventId,
  orderId,
  userId,
  submitedRating,
  reviewText,
  reviewCompanyText,
}: UpdateReviewData) => {
  const order = await Order.GetById(orderId);
  const maybeReview = order.review;

  if (maybeReview) {
    throw Error(
      `order ${orderId} already has review ${maybeReview.objectId ||
        'undefined'}`,
    );
  }

  const objectIdEvent = await Event.GetById(eventId);

  if (!objectIdEvent.chef || !objectIdEvent.chef.objectId) {
    throw Error('objectIdEvent.chef undefined');
  }

  const chefPointer = Chef.Pointer(objectIdEvent.chef.objectId);

  if (!objectIdEvent.objectIdFood || !objectIdEvent.objectIdFood.objectId) {
    throw Error('objectIdEvent.objectIdFood undefined');
  }

  const foodPointer = Food.Pointer(objectIdEvent.objectIdFood.objectId);

  const reviewId = await Reviews.setOrCreate({
    objectIdEvent: Event.Pointer(eventId),
    order: Order.Pointer(order.objectId),
    objectIdUser: _User.Pointer(userId),
    chef: chefPointer,
    objectIdFood: foodPointer,
    user_review: reviewText,
    company_review: reviewCompanyText,
    rating: submitedRating,
  });

  await Order.Set({
    objectId: order.objectId,
    review: Reviews.Pointer(reviewId),
  });

  return reviewId;
};

export const sendEmailReviewReminders = async (): Promise<Array<string>> => {
  const chrono = await fetchCrono();

  if (!chrono.active) {
    console.log('sending reminders disabled');
    return [];
  }

  console.log('looking for passed events..');

  const eventsIds = await listEventsNeedReview({
    noEmail: true,
  });

  await sendRemindersByEvents({ eventsIds });
  console.log('sended');
  const lastEventId = eventsIds[eventsIds.length - 1];
  const newLastDate = (await Event.GetById(lastEventId)).eventStart;
  console.log('lastEventId', lastEventId);
  console.log('newLastDate', newLastDate);

  await setLastSendedReviewReminderDate({
    date: moment(newLastDate).toISOString(),
  });

  return eventsIds;
};

export const sendReminders = async ({
  orderIds,
}: {
  orderIds: Array<string>,
}) => {
  console.log(orderIds);
  const result = await sendJsonPostSimple({
    url: `/api-mail/reviewReminders`,
    data: { orderIds },
    noRemoveEmpty: true,
  });

  return await result.text();
};

export const sendRemindersByEvents = async ({
  eventsIds,
}: {
  eventsIds: Array<string>,
}) => {
  const orderIds = await listOrdersNeedReview({ eventsIds });

  if (!orderIds || orderIds.length === 0) {
    throw Error('no orders to send to');
  }
  console.log('sending reminders to ', orderIds);

  return await sendReminders({ orderIds });
};

export const setReviewOrderFlag = async ({ orderId }: { orderId: string }) => {
  return Order.Set({
    objectId: orderId,
    reviewMailSent: true,
  });
};
