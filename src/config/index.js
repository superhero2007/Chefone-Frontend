// @flow

import configureApiKeys from './api';
import configureEnv from './env';
export { default as styles } from './styles';
import type { TCONFIG } from './type';

const env = configureEnv();
const api = configureApiKeys(env);
const res: TCONFIG = {
  env,
  api,
};

export default res;
