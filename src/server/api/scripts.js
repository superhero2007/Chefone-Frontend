// @flow

import R from 'ramda';

import * as Api from '../../parseApi/api';

const getNthRecord = ({
  n,
  query,
  apiClassName,
}: {
  n: number,
  query: *,
  apiClassName: $Keys<typeof Api>,
}) => async () =>
  await Api[apiClassName].Get({
    ...query,
    limit: 100,
    skip: n * 100,
  });

async function* createAsyncIterable(syncIterable) {
  for (const elem of syncIterable) {
    //$FlowIssue
    yield* await elem();
  }
}

const walkQueryGenerator = async ({
  apiClassName,
  query,
}: {
  apiClassName: *,
  query: any,
}) => {
  const numberOfItems = await Api[apiClassName].Count(query);
  console.log('numberOfItems', numberOfItems);
  const createIterable = R.compose(
    R.map(n =>
      getNthRecord({
        n,
        query,
        apiClassName,
      }),
    ),
    R.times(R.identity),
  );

  return createAsyncIterable(createIterable(Math.ceil(numberOfItems / 100)));
};

const delay = sec => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), sec);
  });
};

export const getAllUsersEmails = async () => {
  const res = (async function*() {
    const apiClassName = 'Payment';
    const query = { include: ['orderobjectId.objectIdUser'] };

    const gen = await walkQueryGenerator({ apiClassName, query });
    console.log(gen);

    let i = 0;
    let emails = [];
    for await (const order of gen) {
      if (!order.orderobjectId || !order.orderobjectId.objectIdUser) {
        console.log(i++, order);
        continue;
      }
      const { orderobjectId: { objectIdUser: { email } } } = order;
      if (R.contains(email, emails)) {
        continue;
      }
      emails.push(email);
      // console.log((i++), email);
    }
    return yield emails;
  })();
  const { value } = await res.next();
  return JSON.stringify(value, null, 2);
};

export const getTouchAllRecords = async () => {
  const now = new Date();
  const res = (async function*() {
    const apiClassName = 'Order';
    const gen = await walkQueryGenerator({
      apiClassName,
      query: {
        equalTo: [Api.Order.Field.finalized(true)],
        matchesQuery: {
          fieldName: 'objectIdEvent',
          queryType: 'Event',
          query: {
            lessThan: Api.Event.Field.eventStart(now),
            limit: 1,
          },
        },
      },
    });

    const reason =
      'reviewMailSent true for finalized order for pasted event (16.02.2017)';
    let i = 0;
    let orders = [];
    for await (const order of gen) {
      console.log(i++);

      await Api.Order.Set({
        objectId: order.objectId,
        reviewMailSent: true,
        touched: reason,
      });

      orders.push(order.objectId);
      console.log(`set order with id ${order.objectId}, reason: "${reason}"`);
      await delay(500);
    }
    yield orders;
  })();
  const { value } = await res.next();
  return value;
};

export const getStatsEvents = async () => {
  // const now = new Date();
  const res = (async function*() {
    const apiClassName = 'Event';
    const gen = await walkQueryGenerator({
      apiClassName,
      query: {
        include: ['chef'],
        equalTo: [Api.Event.Field.active(true)],
        // greaterThan: Api.Event.Field.eventStart(now)
      },
    });

    let i = 0;
    let events = {};
    for await (const event of gen) {
      console.log(i++);
      const chefName = event.chef.name;
      console.log('event.chef.id', chefName);
      events[chefName] = events[chefName] ? events[chefName] + 1 : 1;
    }
    yield events;
  })();
  const { value } = await res.next();

  console.log('Object.keys(value).length');
  //$FlowIssue
  console.log(Object.keys(value).length);
  return value;
};

export const getStatsOrders = async () => {
  // const now = new Date();
  let j = 0;
  const res = (async function*() {
    const apiClassName = 'Order';
    const gen = await walkQueryGenerator({
      apiClassName,
      query: {
        include: ['objectIdUser'],
        equalTo: [Api.Order.Field.finalized(true)],
        // greaterThan: Api.Order.Field.eventStart(now)
      },
    });

    let i = 0;

    let events = {};
    for await (const order of gen) {
      if (!order.objectIdUser) {
        j++;
        continue;
      }
      console.log(order);
      const user = order.objectIdUser.objectId;
      console.log('order.chef.id', user);
      events[user] = events[user] ? events[user] + 1 : 1;
      console.log(i++);
    }
    yield events;
  })();

  const { value } = await res.next();
  console.log('j', j);

  console.log('Object.keys(value).length');
  //$FlowIssue
  console.log(Object.keys(value).length);
  return value;
};

export const getFailedToOrderUsers = async () => {
  // const now = new Date();
  let j = 0;

  const citySelected = 'Düsseldorf';

  const [city] = await Api.Cities.Get({
    equalTo: [Api.Cities.Field.city(citySelected)],
  });

  console.log(city);

  const getUsers = () =>
    (async function*() {
      const apiClassName = '_User';
      const gen = await walkQueryGenerator({
        apiClassName,
        query: {
          equalTo: [Api._User.Field.city(Api.Cities.Pointer(city.objectId))],
        },
      });

      let i = 0;

      let users = [];
      for await (const user of gen) {
        users.push(user.email || user.fb_email);
        console.log(i++);
      }
      yield users;
    })();

  const getUsersByOrder = () =>
    (async function*() {
      const apiClassName = 'Order';
      const gen = await walkQueryGenerator({
        apiClassName,
        query: {
          include: ['objectIdUser', 'objectIdEvent.city'],
        },
      });

      let i = 0;

      let users = {};
      for await (const order of gen) {
        if (!order.objectIdUser) {
          j++;
          continue;
        }
        if (
          !order.objectIdEvent ||
          order.objectIdEvent.city.city !== citySelected
        ) {
          continue;
        }

        const user = order.objectIdUser.objectId;
        users[user] = order.objectIdUser.email || order.objectIdUser.fb_email;
        console.log(i++);
      }
      yield users;
    })();

  const { value: signedUp } = await getUsers().next();

  if (!signedUp) {
    return;
  }

  console.log(signedUp);
  // const { value: notFinalizedMap } = await getUsersByOrder(false).next();
  const { value: finalizedMap } = await getUsersByOrder().next();
  // const notFinalizedList = Object.values(notFinalizedMap);
  const finalizedList = Object.values(finalizedMap);

  console.log('j', j);

  const final = R.uniq(R.union(signedUp, finalizedList));

  console.log(final.length);

  console.log(final.join('\n'));

  return final;
};
