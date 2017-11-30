//@flow

import type { PropsT } from '../';

import { cities } from '../../../../stubData';

const res: PropsT = {
  city: 'Hamburg',
  goToCreateEvent: () => {},
  cities: cities.map(({ name }) => name),
};
export default res;
