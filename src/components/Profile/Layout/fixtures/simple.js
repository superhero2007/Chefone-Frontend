//@flow

import type { PropsT } from '../';

import { event2, review } from '../../../../stubData';

export const user = {
  name: 'Eddi',
  age: 22,
  cooked: 18,
  takePart: 7,
  profession: 'Graphic Designer',
  location: 'Hamburg, Germany',
  languages: ['English', 'Detsch'],
  about:
    'Eddi is a passionate computer scientist and entrepreneur, he quickly came up with the idea of ​​solving his problem digitally: he wanted to create a platform for enthusiastic cooks to offer a menu, whether refined or grounded, professional or hobby Guests can find and book these dinners quickly and easily.',
  avatar: '/static/about/avatar1.jpg',
};

const res: PropsT = {
  userData: user,
  eventsAttended: [event2, event2, event2],
  eventsOffered: [event2, event2],
  review,
};
export default res;
