// @flow

import React from 'react';

import { Row, Col } from 'react-flexbox-grid';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
const TITLE = 'GUTES TUN.';
const DESCRIPTION =
  'Jeder, der an einem CHEF.ONE-Event teilnimmt, unterstützt hungernde Menschen. Wir von CHEF.ONE spenden 1% unseres Gewinns für wohltätige Zwecke im Kampf gegen den Hunger.';
const SLOGAN = 'We donate 1% against hunger';
export default fixedCSSModules(styles)(() => (
  <div styleName="component">
    <div className="container">
      <Row center="xs">
        <Col md={6} xs={12}>
          <h2>{TITLE}</h2>
          <p styleName="description">{DESCRIPTION}</p>
          <p styleName="slogan">{SLOGAN}</p>
        </Col>
        <Col md={6} sm={0} xs={0} styleName="money_icon_wrapper">
          <div styleName="money_icon" />
        </Col>
      </Row>
    </div>
  </div>
));
