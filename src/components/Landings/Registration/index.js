// @flow

import React from 'react';
import SignUp from '../../SignInUpForm/SignUp';
export * as fixtures from './fixtures';

import { Row, Col } from 'react-flexbox-grid';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

// eslint-disable-next-line
export default applyStyles(({ styles, ...props }: *) => {
  return (
    <Row styleName="component" center="xs" middle="xs">
      <Col xs={12}>
        <Row>
          <Col xs={0} sm={4}>
            <Row end="xs">
              <div styleName="image" />
            </Row>
          </Col>
          <Col xs={0} sm={5} styleName="form">
            <SignUp {...props} align="left" noPadding />
          </Col>
          <Col xs={12} sm={0} md={0} lg={0} lgx={0} styleName="form">
            <SignUp {...props} noPadding />
          </Col>
        </Row>
      </Col>
    </Row>
  );
});
