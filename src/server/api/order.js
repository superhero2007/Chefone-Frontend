// @flow

import { getEventById, baseEventSelector } from './event';
import { priceSelector } from '../../selectors';
import {
  Order,
  _User,
  Event,
  Chef,
  Messages,
  Currencies,
  Food,
  Discount,
  Cities,
} from '../../parseApi/api';

import type { ParseEventPointer } from '../../parseApi/api/Event';
import type { ParseOrderInstance } from '../../parseApi/api/Order';
import { safeGetImage } from '../../utils';
import { loc } from '../../localization';

export const assertUserHasThisOrder = async ({
  userId,
  orderId,
}: {
  userId: string,
  orderId: string,
}) => {
  const user = await _User.GetById(userId);
  const [order] = await Order.Get({
    include: ['objectIdUser'],
    equalTo: [Order.Field.objectId(orderId)],
    limit: 1,
  });

  const objectIdUser = _User.EnsureInstance(order.objectIdUser);

  if (user.objectId === objectIdUser.objectId) {
    return true;
  }

  throw Error(loc.errors.REVIEW_ERROR_USER_DOES_NOT_HAVE_ORDER);
};

export const checkIsOrderAborted = async (order: Object) => {
  return await Order.Count({
    equalTo: [Order.Field.objectId(order.objectId), Order.Field.status(-1)],
    limit: 1,
  });
};

type ParseOrderObject = {
  serviceFeePercentage?: number,
  serviceFee?: number,
  userMsg?: string,
  status: number,
  amount: number,
  finalized?: boolean,
  objectIdEvent?: ParseEventPointer,
  foodPrice?: number,
  foodPriceTotal?: number,
  phone: number,
  discount?: Object,
};

export const getOrderById = async (
  orderId: string,
  read: ?boolean,
): Promise<ParseOrderObject> => {
  const [order] = await Order.Get({
    include: [
      'objectIdEvent',
      'objectIdEvent.chef',
      'objectIdEvent.chef.objectIdUser',
      'objectIdEvent.objectIdFood',
      'objectIdEvent.currency',
    ],
    equalTo: [Order.Field.objectId(orderId)],
    limit: 1,
  });

  if (read) {
    await Order.Set({
      objectId: order.objectId,
      msgSeen: true,
    });
  }

  let { phone, status, amount } = order;

  if (!phone) {
    throw Error('phone undefined');
  }

  status = status || 0;

  if (!amount) {
    throw Error('amount undefined');
  }

  let event = Event.EnsureInstance(order.objectIdEvent);
  const objectIdFood = Food.EnsureInstance(event.objectIdFood);
  const city = Cities.EnsureInstance(event.city);
  const chef = Chef.EnsureInstance(event.chef);
  const objectIdUser = _User.EnsureInstance(chef.objectIdUser);

  let { servings, servingsSold } = event;

  servingsSold = servingsSold || 0;
  servings = servings || 0;

  const price = priceSelector(event);

  event = {
    ...event,
    ...baseEventSelector(event),
    ...price,
    currencySymbol: price.currency.symbol,
    linkTo: '/event/' + event.objectId,
    chefAvatar: event.chefAvatar,
    // foodrating_total:chef.rating_total || 0,
    image: safeGetImage(objectIdFood, 'image1'),
    title: objectIdFood.title,
    city: city.city,
    country: city.country,
    soldOut: servings - servingsSold <= 0,
    vegan: objectIdFood.food_description_vegan,
    vegetarian: objectIdFood.food_description_vegetarian,
    chefUser: chef.objectIdUser,
  };

  return {
    objectId: order.objectId,
    message: order.userMsg,
    phone,
    status,
    amount,
    eventId: event.objectId,
    finalized: order.finalized,
    user: order.objectIdUser,
    chefId: chef.objectId,
    chefUserId: objectIdUser.objectId,
    systemMsg: order.systemMsg,
    date: event.eventStart,
    totalPrice: order.foodPriceTotal,
    serviceFee: order.serviceFee,
    foodPrice: order.foodPrice,
    foodPriceTotal: order.foodPriceTotal,
    discountPrice: order.discountPrice || 0,
    event,
  };
};

export const getOrderEventByOrderId = async ({
  orderId,
}: {
  orderId: string,
}) => {
  const [order] = await Order.Get({
    include: ['objectIdEvent'],
    equalTo: [Order.Field.objectId(orderId)],
    limit: 1,
  });
  const objectIdEvent = Event.EnsureInstance(order.objectIdEvent);
  return {
    ...(await getEventById({ eventId: objectIdEvent.objectId })),
    orderId,
  };
};

export const setOrder = async ({
  amount,
  objectIdEvent,
  foodPrice,
  foodPriceTotal,
  phone,
  finalized,
  serviceFee,
  userMsg,
  discount,
  serviceFeePercentage,
}: ParseOrderObject) => {
  return await Order.Create({
    amount,
    foodPrice,
    objectIdEvent,
    objectIdUser: Parse.User.current(),
    phone,
    userMsg,
    finalized,
    foodPriceTotal,
    serviceFee,
    serviceFeePercentage,
    ...(discount && discount.objectId
      ? {
          objectIdDiscount: Discount.Pointer(
            discount.objectIdDiscount.objectId,
          ),
          discountPrice: discount.discountPrice,
        }
      : {}),
  });
};

export const getOrders = async ({
  chefUserId,
  finalized,
  userId,
  limit,
}: {
  chefUserId: string,
  finalized: ?boolean,
  userId: string,
  limit: number,
}) => {
  let chefOrderMatchesQuery;

  if (chefUserId) {
    let [chef] = await Chef.Get({
      matchQueries: [
        {
          fieldName: 'objectIdUser',
          queryType: '_User',
          query: {
            equalTo: [_User.Field.objectId(chefUserId)],
          },
        },
      ],
      limit: 1,
    });

    chefOrderMatchesQuery = chef
      ? {
          fieldName: 'objectIdEvent',
          queryType: 'Event',
          query: {
            equalTo: [Event.Field.chef(Chef.Pointer(chef.objectId))],
          },
        }
      : undefined;
  }

  let orders = await Order.Or(
    [
      ...(chefOrderMatchesQuery
        ? [
            {
              equalTo: [finalized ? Order.Field.finalized(finalized) : null],
              matchQueries: [chefOrderMatchesQuery],
              limit,
            },
          ]
        : []),
      {
        equalTo: [
          finalized ? Order.Field.finalized(finalized) : null,
          userId ? Order.Field.objectIdUser(_User.Pointer(userId)) : null,
        ],
        limit,
      },
    ],
    {
      include: [
        'objectIdEvent',
        'objectIdEvent.chef',
        'objectIdEvent.city',
        'objectIdEvent.currency',
        'objectIdEvent.objectIdFood',
        'objectIdEvent.chef.objectIdUser',
      ],
      descending: ['createdAt'],
      limit,
    },
  );

  console.log('orders');

  orders = orders.map((order: ParseOrderInstance) => {
    const objectIdEvent = Event.EnsureInstance(order.objectIdEvent);
    const currency = Currencies.EnsureInstance(objectIdEvent.currency);
    const objectIdFood = Food.EnsureInstance(objectIdEvent.objectIdFood);
    const chef = Chef.EnsureInstance(objectIdEvent.chef);
    const chefUser = _User.EnsureInstance(chef.objectIdUser);
    const city = Cities.EnsureInstance(objectIdEvent.city);

    return {
      objectId: order.objectId,
      message: order.userMsg,
      phone: order.phone,
      amount: order.amount,
      foodPrice: order.foodPrice,
      foodPriceTotal: order.foodPriceTotal,
      date: order.updatedAt,
      currency: currency.symbol,
      user: order.objectIdUser,
      chef,
      city,
      chefName: chef.name,
      chefAvatar: chefUser.avatar && chefUser.avatar.url,
      foodTitle: objectIdFood.title,
      foodDescription: objectIdFood.food_description,
      isNew: !order.msgSeen,
      isChef: chefUser.objectId === userId,
    };
  });

  return await Promise.all(
    orders.map(async order => {
      const [lastMessage] = await Messages.Get({
        // equalTo:[Messages.Field.],
        descending: ['createdAt'],
        limit: 1,
      });
      // lastMessageQuery
      //   .equalTo('order', orders[i]);
      // if (orders[i].isChef) {
      //   lastMessageQuery
      //     .equalTo('user', orders[i].user);
      // } else {
      //   lastMessageQuery
      //     .equalTo('chef', orders[i].chef);
      // }
      return {
        ...order,
        lastMessage,
      };
    }),
  );
};

export const getMyOrders = async ({
  limit,
  userId,
  page,
}: {
  limit: number,
  userId: string,
  page: number,
}) => {
  const orders = await Order.Get({
    include: [
      'objectIdEvent',
      'objectIdEvent.chef',
      'objectIdEvent.chef.objectIdUser',
      'objectIdEvent.city',
      'objectIdEvent.currency',
      'objectIdEvent.objectIdFood',
    ],
    equalTo: [
      Order.Field.objectIdUser(_User.Pointer(userId)),
      Order.Field.finalized(true),
    ],
    limit,
    skip: page && page * limit,
  });

  const res = orders.map((order: ParseOrderInstance) => {
    let event = Event.EnsureInstance(order.objectIdEvent);
    const objectIdFood = Food.EnsureInstance(event.objectIdFood);
    const city = Cities.EnsureInstance(event.city);
    const chef = Chef.EnsureInstance(event.chef);

    let { servings, servingsSold } = event;

    servingsSold = servingsSold || 0;
    servings = servings || 0;

    event = {
      ...event,
      ...baseEventSelector(event),
      ...priceSelector(event),
      linkTo: '/event/' + event.objectId,
      chefAvatar: event.chefAvatar,
      // foodrating_total:chef.rating_total || 0,
      image1: safeGetImage(objectIdFood, 'image1'),
      title: objectIdFood.title,
      city: city.city,
      country: city.country,
      soldOut: servings - servingsSold <= 0,
      vegan: objectIdFood.food_description_vegan,
      vegetarian: objectIdFood.food_description_vegetarian,
      chefUser: chef.objectIdUser,
    };
    return {
      ...order,
      event,
    };
  });

  return res;
};
