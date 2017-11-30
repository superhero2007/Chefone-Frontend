// @flow
import moment from 'moment';
import R from 'ramda';
import { createOrRetrieveChef } from './chef';
import { updateFood, nutritionMap } from './food';
import { updateUserPhone, getAvatar } from './user';
import { isFollowed } from './followers';

import { safeGetImage } from '../../utils';
import { asyncPostProcess } from './helpers';
import { priceSelector } from '../../selectors';
import EventStatus from '../../constants/EventStatus';
import { getDefaultCurrency } from './currency';
// import {findCoordsByAddress} from './geo';

import {
  Food,
  Currencies,
  Chef,
  Cities,
  Order,
  _User,
  Event,
} from '../../parseApi/api';
import type { ParseGeoPointType } from '../../parseApi/src/runtime';
import type { ParseEventInstance } from '../../parseApi/api/Event';
import type { CreateEventType } from '../../redux/type';

const categoryMap = {
  home: 1,
  pickup: 2,
};

type EventStatusType = $Keys<typeof EventStatus>;

export const getStatus = ({
  active,
  userActive,
  eventStart,
}: {
  active: boolean,
  userActive: boolean,
  eventStart: Date,
}): EventStatusType => {
  const { initial, pending, canceled, verification, done } = EventStatus;
  let status = initial;
  if (!!active && !!userActive) {
    status = pending;
  } else if (!active && !userActive) {
    status = canceled;
  } else if (!active && userActive) {
    status = verification;
  }

  if (status === pending && moment(eventStart).isAfter(moment())) {
    status === done;
  }

  return status;
};

type BaseEvent = {
  eventMoment: number,
  date: string,
  active: ?boolean,
  userActive: ?boolean,
  time: string,
  status: string,
  passed: boolean,
};

export const baseEventSelector = (event: *): BaseEvent => {
  const { eventStart, active, userActive } = event;
  const momentEventStart = moment(eventStart);

  return {
    passed: moment().isAfter(momentEventStart),
    eventMoment: moment(eventStart).unix() * 1000,
    date: momentEventStart.format('DD.MM.YYYY'),
    time: momentEventStart.format('HH:mm'),
    active,
    userActive,
    status: getStatus({ eventStart, active, userActive }),
  };
};

export const getChefEvents = async ({
  limit,
  userId,
  page,
}: {
  limit: number,
  userId: string,
  page: number,
}) => {
  const now = new Date();

  const events = await Event.Get({
    include: ['chef', 'objectIdFood', 'currency'],
    matchQueries: [
      {
        fieldName: 'chef',
        queryType: 'Chef',
        query: {
          equalTo: [Chef.Field.objectIdUser(_User.Pointer(userId))],
        },
      },
    ],
    descending: ['eventStart'],
    greaterThan: Event.Field.eventStart(now),
    limit,
    skip: page && page * limit,
  });

  return (await postProcessEvents(events)).map((event: ParseEventInstance) => {
    const objectIdFood = Food.EnsureInstance(event.objectIdFood);

    const price = priceSelector(event);
    return {
      objectId: event.objectId,
      hasOrders: event.hasOrders,
      ...baseEventSelector(event),
      currencySymbol: price.currency.symbol,
      price: price.price,
      attendeesNum: event.servingsSold,
      attendeesMax: event.servings,
      description: objectIdFood.food_description,
      image: safeGetImage(objectIdFood, 'image1'),
      title: objectIdFood.title,
      chef: event.chef,
    };
  });
};

export const hasOrders = async ({ eventId }: { eventId: string }) =>
  !!await Order.Count({
    equalTo: [
      Order.Field.objectIdEvent(Event.Pointer(eventId)),
      Order.Field.finalized(true),
    ],
    limit: 1,
  });

const postProcessEvents = async (events: Array<ParseEventInstance>) => {
  const { computedEventVals } = await asyncPostProcess(
    {
      computedEventVals: async (event: ParseEventInstance) => {
        const chef = Chef.EnsureInstance(event.chef);
        const chefUser = _User.EnsureInstance(chef.objectIdUser);
        const [chefAvatar, hasOrdersVal] = await Promise.all([
          getAvatar(chefUser.objectId),
          hasOrders({ eventId: event.objectId }),
        ]);

        return { chefAvatar, hasOrders: hasOrdersVal };
      },
    },
    events,
  );

  return events.map((event: ParseEventInstance, i: number) => {
    const computedEventVal = computedEventVals[i];
    return {
      ...computedEventVal,
      ...event.chef,
      ...event,
    };
  });
};

export const getEventByIdObj = ({ objectId }: { objectId: string }) =>
  getEventById({ eventId: objectId });

export const getEvents = async ({
  limit,
  sticky,
  page,
  exclude,
  chefId,
  futureOnly,
  passedOnly,
  city,
  fallbackToAllEvents,
}: {
  limit?: number,
  sticky?: boolean,
  page?: number,
  chefId?: string,
  exclude?: string,
  futureOnly?: boolean,
  passedOnly?: boolean,
  city?: string,
  fallbackToAllEvents?: boolean,
}) => {
  let queryParams = {
    include: ['chef', 'objectIdFood', 'currency', 'city', 'chef.objectIdUser'],
    equalTo: [
      Event.Field.active(true),
      Event.Field.userActive(true),
      ...(chefId ? [Event.Field.chef(Chef.Pointer(chefId))] : []),
    ],
    notEqualTo: [exclude ? Event.Field.objectId(exclude) : undefined],
    limit: limit,
    skip: limit && page ? page * limit : undefined,
  };

  if (sticky) {
    queryParams = {
      ...queryParams,
      equalTo: [...queryParams.equalTo, Event.Field.sticky(true)],
      limit: 1,
      skip: undefined,
    };
  }

  const now = new Date();
  if (passedOnly) {
    queryParams = {
      ...queryParams,
      lessThan: Event.Field.eventStart(now),
      descending: ['eventStart'],
    };
  } else if (futureOnly) {
    queryParams = {
      ...queryParams,
      greaterThan: Event.Field.eventStart(now),
      descending: ['eventStart'],
    };
  } else {
    if (!sticky) {
      queryParams = {
        ...queryParams,
        greaterThan: Event.Field.eventStart(now),
        ascending: ['soldOut', 'eventStart'],
      };
    }
  }

  if (city && !passedOnly) {
    queryParams = {
      ...queryParams,
      equalTo: [...queryParams.equalTo, Event.Field.city(Cities.Pointer(city))],
    };
  }

  let events;
  events = await Event.Get(queryParams);

  if (fallbackToAllEvents && events.length === 0 && !!city && page === 0) {
    return await getEvents({ ...queryParams, city: undefined });
  }

  const res = (await postProcessEvents(events)).map(
    (event: ParseEventInstance) => {
      const objectIdFood = Food.EnsureInstance(event.objectIdFood);
      const city = Cities.EnsureInstance(event.city);

      return {
        ...event,
        ...baseEventSelector(event),
        ...priceSelector(event),
        linkTo: '/event/' + event.objectId,
        chefAvatar: event.chefAvatar,
        // foodrating_total:chef.rating_total || 0,
        image1: safeGetImage(objectIdFood, 'image1'),
        title: objectIdFood.title,
        city: city.city,
        vegan: objectIdFood.food_description_vegan,
        vegetarian: objectIdFood.food_description_vegetarian,
      };
    },
  );
  return res;
};

export const getEventById = async ({
  eventId,
  userId,
}: {
  eventId: string,
  userId?: string,
}) => {
  let events = await Event.Get({
    include: [
      'chef',
      'chef.objectIdUser',
      'city',
      'objectIdFood',
      'objectIdFood.chef.objectIdUser',
      'currency',
    ],
    equalTo: [Event.Field.objectId(eventId)],
    limit: 1,
  });

  if (!events.length) {
    return { notFound: true };
  }

  let [event] = events;

  const soldOut = event.servingsSold >= event.servings;

  let newEventId;
  if (soldOut || event.passed) {
    const [newEvent] = await Event.Get({
      equalTo: [
        Event.Field.chef(Chef.Pointer(event.chef.objectId)),
        Event.Field.active(true),
        Event.Field.userActive(true),
        Event.Field.soldOut(false),
      ],
      limit: 1,
      descending: ['eventStart'],
      greaterThan: Event.Field.eventStart(new Date()),
    });
    if (newEvent) {
      newEventId = newEvent.objectId;
    }
  }

  const chef = Chef.EnsureInstance(event.chef);
  const chefUser = _User.EnsureInstance(chef.objectIdUser);

  const doesFollowChef = userId
    ? await isFollowed({ chefId: chef.objectId, userId })
    : false;

  const chefAvatar = await getAvatar(chefUser.objectId);

  event = { ...event, chefAvatar };
  const { rating_total, rating_average } = chef;
  event = { ...event, rating_total, rating_average };

  const objectIdUser = _User.EnsureInstance(chef.objectIdUser);
  const objectIdFood = Food.EnsureInstance(event.objectIdFood);
  const city = Cities.EnsureInstance(event.city);

  const res = {
    ...event,
    ...objectIdUser,
    ...baseEventSelector(event),
    kitchen1: safeGetImage(chef, 'kitchen1'),
    image3: safeGetImage(objectIdFood, 'image3'),
    image2: safeGetImage(objectIdFood, 'image2'),
    image1: safeGetImage(objectIdFood, 'image1'),
    ...priceSelector(event),
    newEventId,
    city,
    doesFollowChef,
    name: chef.name,
    foodDescription: objectIdFood.food_description,
    title: objectIdFood.title,
    foodImage: objectIdFood.image1 && objectIdFood.image1.url,
    rating_total: chef.rating_total,
    rating: chef.rating_average,
    cityName: city.city,
    chefName: chef.name,
    chefUserId: objectIdUser.objectId,
    geoLocation: event.location,
    servingsSold: event.servingsSold || 0,
    //$FlowIssue
    nutrition: R.invertObj(nutritionMap)[objectIdFood.nutrition],
    //$FlowIssue
    category: R.invertObj(categoryMap)[event.type],
    createdAtMonthAndYear: moment(chef.createdAt).format('MMM YYYY'),
    avatar: safeGetImage(objectIdUser, 'avatar'),
    objectId: event.objectId,
  };
  return res;
};

// EXAMPLE: '{"cityId":"PeVkQ4haYN","chefId":"AJDzeZEMPo","foodId":"wtq1hDBn65","locationDetails":"locationDetails","eventMoment":1470495243,"street":"Abbestraße","apartment":25,"price":99,"amountOfPeople":100,"category":"home"}'
export const updateEvent = async ({
  eventId,
  foodId,
  cityId,
  chefId,
  locationDetails,
  eventMoment,
  address,
  price,
  amountOfPeople,
  location,
  category,
}: {
  eventId?: string,
  foodId: string,
  chefId: string,
  cityId: string,
  locationDetails: string,
  eventMoment: number,
  address: string,
  price: number,
  amountOfPeople: number,
  location: ParseGeoPointType,
  category: string,
}): Promise<string> => {
  const finalCategory = categoryMap[category];
  if (!finalCategory) {
    throw Error(`category - ${category} is invalobjectId`);
  }
  const currency = await getDefaultCurrency();
  const eventDeadline = moment(eventMoment).subtract(6, 'hours');
  const resultId = await Event.setOrCreate({
    objectId: eventId,
    objectIdFood: Food.Pointer(foodId),
    chef: Chef.Pointer(chefId),
    city: Cities.Pointer(cityId),
    locationDetails,
    eventStart: new Date(eventMoment),
    eventDeadline: new Date(eventDeadline.unix() * 1000),
    currency: Currencies.Pointer(currency.objectId),
    location,
    locationAddress: address,
    price,
    servings: amountOfPeople,
    servingsSold: 0,
    type: finalCategory,
    userActive: true,
  });
  return resultId;
}; // '{"cityId":"PeVkQ4haYN","userId":"WbCNrHwcH2","locationDetails":"zaz","phoneNumber":123,"eventMoment":1570505243000,"address":"Hamburg,+Abbestraße,+25","price":99,"amountOfPeople":100,"category":"home","title":"3232323","foodDescription":"hello","nutrition":"vegetarian","foodImages":[null,null,null],"useMasterKey":true}' // '{"cityId":"PeVkQ4haYN","userId":"TmC97x1k3D","locationDetails":"locationDetails","phoneNumber":"phoneNumber","eventMoment":1470495243,"address":"Hamburg, Abbestraße, 25","price":99,"amountOfPeople":100,"category":"home","title":"3232323","foodDescription":"32323","nutrition":"vegetarian","foodImages":[null,null,null],"useMasterKey":true}'
export const updateEventProcedure = async ({
  eventId,
  userId,
  cityId,
  title,
  locationDetails,
  foodDescription,
  amountOfPeople,
  nutrition,
  category,
  foodImages,
  eventMoment,
  phoneNumber,
  address,
  location,
  price,
  useMasterKey,
}: CreateEventType) => {
  console.log('retriving/creating chef...');
  const chefId = await createOrRetrieveChef({
    userId,
  });
  console.log('chefId is', chefId);
  console.log('saving user phone...');
  await updateUserPhone({
    userId,
    phone: phoneNumber,
    useMasterKey,
  });
  console.log('creating food...');
  let foodId;
  if (eventId) {
    console.log(`retrive foodId from eventId - ${eventId}`);
    foodId = await getFoodId({
      eventId,
    });
    console.log(`retrived foodId - ${foodId}`);
  }
  console.log('food not found'); // FOOD table // Insert the ObjectIDChef to the CHEF column and link it with the one from aboves checkup. // Insert Title, fooddescription, nutrition into this table
  foodId = await updateFood({
    foodId,
    chefId,
    title,
    foodDescription,
    foodImages,
    nutrition,
  });
  if (!foodId) {
    throw Error('failed to create food');
  }
  console.log('foodId: ', foodId);
  console.log('creating event...');
  const newEventId = await updateEvent({
    eventId,
    locationDetails,
    foodId,
    cityId, // Insert City Pointer into the event table. We are fetching them from the CHEF Contact View.
    chefId, // Insert the ObjectIDChef to the CHEF column and link it with the one from aboves checkup.
    eventMoment, // Insert EventStart into the table (do the same for EventDeadline
    address,
    location,
    price, // Insert Price and Servings
    amountOfPeople,
    category, // Insert Type, which Home = 1 and Pickup = 2,
  });
  return {
    chefId,
    foodId,
    eventId: newEventId,
  };
};
export const getFoodId = async ({
  eventId,
}: {
  eventId: string,
}): Promise<string> => {
  const event = await Event.GetById(eventId);
  const objectIdFood = Food.EnsureInstance(event.objectIdFood);
  if (!objectIdFood.objectId) {
    throw Error('objectIdFood.objectId undefined');
  }
  return objectIdFood.objectId;
}; // babel-node ./ api event removeEventProcedure -j '{"eventId":"BtsJo9rGEI"}'
export const removeEventProcedure = async ({
  eventId,
}: {
  eventId: string,
}) => {
  console.log('retrive food...');
  const foodId = await getFoodId({
    eventId,
  });
  console.log('foodId', foodId);
  console.log('delete event...');
  await Event.Delete(eventId);
  console.log('delete food...');
  if (foodId) {
    await Food.Delete(foodId);
  }
  return {
    status: 'ok',
  };
};
