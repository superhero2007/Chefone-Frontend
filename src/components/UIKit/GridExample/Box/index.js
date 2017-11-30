//@flow

import React from 'react';

import { Col } from 'react-flexbox-grid';
import box from './style.module.less';

export default (props: {
  type?: 'row' | 'container' | 'nested' | 'large',
  children?: *,
}) => {
  return (
    <Col {...props}>
      <div className={box[props.type || 'box']}>{props.children}</div>
    </Col>
  );
};
