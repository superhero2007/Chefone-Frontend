//@flow

import moment from 'moment';
import type { PropsT } from '../';

const res: PropsT = {
  moment: moment(),
  notEarlierThan: moment(),
  onSave: () => {},
};
export default res;
