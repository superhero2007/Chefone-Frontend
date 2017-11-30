//@flow

import { timeoutP } from '../../../../decorators/ValidationDecorator';
// import { avatar } from '../../../../stubData';

const res = {
  cities: [
    { city: 'Hamburg', objectId: '1' },
    { city: 'Berlin', objectId: '2' },
  ],
  goToLogin: () => {},
  signinFacebook: () => timeoutP(1000),
  onSubmit: async () => {
    console.log('111');
    await timeoutP(1000);
  },
  // invitingUser: {
  //   meta: { state: 'success' },
  //   data: {
  //     objectId: 'objectId',
  //     avatar: avatar,
  //     firstName: 'Eddi',
  //   },
  // },
};
export default res;
