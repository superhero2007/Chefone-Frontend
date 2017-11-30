// @flow

import React from 'react';
import SignIn from '../../SignInUpForm/SignIn';
export * as fixtures from './fixtures';
export type PropsT = {};

import { Row, Col } from 'react-flexbox-grid';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

// eslint-disable-next-line
export default applyStyles(({ styles, ...props }) => {
  return (
    <Row styleName="component">
      <Col xs={12} sm={8} md={6} lg={4} styleName="form">
        <SignIn {...props} />
      </Col>
      <Col xs={0} styleName="image" />
    </Row>
  );
});
