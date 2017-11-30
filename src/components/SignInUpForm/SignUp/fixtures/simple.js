//@flow

import type { PropsT } from '../';
import { timeoutP } from '../../../../decorators/ValidationDecorator';
import { avatar } from '../../../../stubData';

const res: PropsT = {
  cities: [
    { city: 'Hamburg', objectId: '1' },
    { city: 'Berlin', objectId: '2' },
  ],
  goToLogin: () => {},
  signinFacebook: () => timeoutP(1000),
  onSubmit: async args => {
    console.log(args);
    await timeoutP(1000);
  },
  invitingUser: {
    meta: { state: 'success' },
    data: {
      objectId: 'objectId',
      avatar: { url: avatar },
      firstName: 'Eddi',
    },
  },
};
export default res;
