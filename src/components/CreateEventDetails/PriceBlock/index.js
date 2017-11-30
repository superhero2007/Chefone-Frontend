// @flow

export * as fixtures from './fixtures';
import React from 'react';
import CategorySelector from './CategorySelector';
import PostFixInput from './PostFixInput';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

import type { Changeble } from '../../../utils/withSimpleState';
import ValidationDecorator from '../../../decorators/ValidationDecorator';
import { Row, Col } from 'react-flexbox-grid';

const FormPriceInput = ValidationDecorator()(props => (
  <PostFixInput className="input-field" {...props} />
));

const safeConvertToInt = val => parseInt(val) || 0;

export type PropsT = {
  price: Changeble<string>,
  category: Changeble<string>,
  calcFee: Function,
  calcGuestPrice: Function,
  currency: Object,
};

export default applyStyles(
  ({ price, category, calcFee, calcGuestPrice, currency }: PropsT) => (
    <div styleName="block price-block">
      <Row>
        <Col xs={12}>
          <p>Preis</p>
          <FormPriceInput
            {...price}
            type="number"
            postfixName={currency.name}
            postfixValue={currency.symbol}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <p styleName="category-title">Kategorie</p>
          <CategorySelector {...category} />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <hr />
          <Row styleName="price-row">
            <Col xs>
              <p>Gast zahlt</p>
            </Col>
            <Col xs>
              <p className="text-right">
                {currency.symbol}
                {calcGuestPrice(safeConvertToInt(price.value))}
              </p>
            </Col>
          </Row>

          <Row styleName="price-row">
            <Col xs>
              <p>Servicegebühr</p>
            </Col>
            <Col xs>
              <p className="text-right">
                {currency.symbol}
                {calcFee(safeConvertToInt(price.value))}
              </p>
            </Col>
          </Row>
          <hr />

          <Row styleName="price-row">
            <Col xs>
              <p styleName="orange">Du erhältst</p>
            </Col>
            <Col xs>
              <p className="text-right" styleName="orange">
                {currency.symbol}
                {safeConvertToInt(price.value)}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  ),
);
