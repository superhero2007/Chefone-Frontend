//@flow

import { cities, event2 } from '../../../../stubData';

export default {
  bg: cities[0].image,
  events: [event2, event2, event2, event2, event2, event2],
  passedEvents: [event2, event2, event2, event2, event2, event2],
  cityName: 'Hamburg',
  eventsLoading: false,
  passedEventsLoading: false,
  getMoreEvents: () => {},
  canLoadMore: true,
};
