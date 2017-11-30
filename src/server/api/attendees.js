// @flow

import R from 'ramda';
import { Order, Event, _User } from '../../parseApi/api';

type Out = {
  avatar: string | null,
  firstName: string,
};

export const getAttendees = async ({
  limit,
  objectIdEvent,
  page,
}: {
  limit: number,
  objectIdEvent: string,
  page: number,
}): Promise<Array<Out>> => {
  let queryParams = {
    include: ['objectIdUser', 'objectIdEvent'],
    equalTo: [Order.Field.finalized(true)],
    notEqualTo: [Order.Field.refunded(true)],
    limit,
    skip: page && page * limit,
  };

  if (objectIdEvent) {
    let eventForSearch;
    if (
      typeof objectIdEvent === 'string' ||
      typeof objectIdEvent === 'number'
    ) {
      eventForSearch = Event.Pointer(objectIdEvent);
    } else {
      eventForSearch = objectIdEvent;
    }

    queryParams = {
      ...queryParams,
      equalTo: [
        ...queryParams.equalTo,
        Order.Field.objectIdEvent(eventForSearch),
      ],
    };
  }

  const attendees = await Order.Get(queryParams);

  const res = R.compose(
    R.map(({ objectIdUser }) => {
      const { avatar, firstName } = _User.EnsureInstance(objectIdUser);
      return { avatar: avatar ? avatar.url : null, firstName };
    }),
    R.uniqBy(({ objectIdUser: { objectId } }) => objectId),
    R.filter(
      ({ objectIdUser }) => objectIdUser && objectIdUser.__type !== 'Pointer',
    ),
  )(attendees);

  return res;
};
