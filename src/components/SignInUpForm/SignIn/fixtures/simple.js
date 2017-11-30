//@flow

import type { PropsT } from '../';
import { timeoutP } from '../../../../decorators/ValidationDecorator';

const res: PropsT = {
  goToSignUp: () => {},
  forgotPassword: () => {},
  signinFacebook: () => timeoutP(1000),
  onSubmit: async () => {
    await timeoutP(1000);
  },
};
export default res;
