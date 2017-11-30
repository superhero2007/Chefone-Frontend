//@flow

import type { PropsT } from '../';

import { cities, event } from '../../../../stubData';

const res: PropsT = {
  city: {},
  goToCity: () => {},
  goToLandingChefs: () => {},
  signupMailchimp: () => {},
  cities: cities,
  events: [event, event, event],
  bestEvent: event,
};
export default res;
