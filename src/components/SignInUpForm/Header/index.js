// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import { Row, Col } from 'react-flexbox-grid';

import styles from './index.module.less';

export type PropsT = {
  align?: 'left' | 'center' | 'right',
  title: string,
  subTitle: string,
};

export default fixedCSSModules(styles)(
  ({ title, subTitle, align = 'center' }: PropsT) => {
    const alignMap = {
      left: { start: 'xs' },
      center: { center: 'xs' },
      right: { end: 'xs' },
    };

    const alignObj = alignMap[align];

    return (
      <Col xs={12}>
        <Row {...alignObj} styleName="title">
          {title}
        </Row>

        <Row {...alignObj} styleName="sub_title">
          {subTitle}
        </Row>
      </Col>
    );
  },
);
