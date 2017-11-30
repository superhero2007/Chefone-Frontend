// @flow

import React from 'react';
import '../../../styles/index.less';
import './index.less';

export default (props: Object) => (
  <textarea className="form-control orderview__input" rows="3" {...props} />
);
