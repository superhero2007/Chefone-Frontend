//@flow

import type { PropsT } from '../';

const res: PropsT<string> = {
  options: ['one', 'two', 'three'],
  selected: {
    value: 'one',
    onChange: () => {},
  },
  defaultValue: 'defaultValue',
  tabIndex: 0,
  defaultIndex: 0,
  toggleDropdown: '',
  name: 'name',
};
export default res;
