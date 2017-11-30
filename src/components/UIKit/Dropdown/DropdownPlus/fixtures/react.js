//@flow

import React from 'react';
import type { PropsT } from '../';

const res: PropsT<React$Element<*>> = {
  elements: true,
  options: [<div>one</div>, <div>two</div>, <div>three</div>],
  tabIndex: 0,
  defaultValue: <div>one</div>,
  defaultIndex: 0,
};
export default res;
