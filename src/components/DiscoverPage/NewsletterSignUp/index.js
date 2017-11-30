// @flow

import React from 'react';
export * as fixtures from './fixtures';
import R from 'ramda';
import withSimpleState from '../../../utils/withSimpleState';
import type { Changeble } from '../../../utils/withSimpleState';
import Card from '../../UIKit/Card';
import Input from '../../UIKit/Input';
import Button from '../../UIKit/Button';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import inputTheme from './input.theme.module.less';
import buttonTheme from './button.theme.module.less';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });
import { Row, Col } from 'react-flexbox-grid';

export type PropsT = {
  onSubmit: Function,
};

const EMAIL_PLACEHOLDER = 'eMail-Adresse eingeben';
const BUTTON_TEXT = 'Jetzt anmelden';

const DISCOUNT = `Gratis-Dinnern`;
const TEXT = applyStyles(({ discount }) => (
  <span>
    Jetzt Newsletter anmelden und 1 von 5 {discount} im Monat gewinnen.
  </span>
));

const MessageIcon = fixedCSSModules(styles)(() => (
  <div styleName="message-icon" />
));

const InputButton = R.compose(
  withSimpleState('inputChangeble', () => ''),
  withSimpleState('inputFocusChangeble', () => false),
  withSimpleState('buttonFocusChangeble', () => false),
  applyStyles,
)(
  ({
    onSubmit,
    buttonFocusChangeble,
    inputChangeble,
    inputFocusChangeble,
  }: {
    onSubmit: Function,
    inputChangeble: Changeble<string>,
    inputFocusChangeble: Changeble<boolean>,
    buttonFocusChangeble: Changeble<boolean>,
  }) => {
    return (
      <Col xs={12}>
        <Row
          styleName={`input-button ${
            inputFocusChangeble.value || buttonFocusChangeble.value
              ? 'focus'
              : ''
          }`}
        >
          <Col xs={8} styleName="input-button-col">
            <Input
              theme={inputTheme}
              LeftIcon={MessageIcon}
              placeholder={EMAIL_PLACEHOLDER}
              onFocus={() => inputFocusChangeble.onChange(true)}
              onBlur={() => inputFocusChangeble.onChange(false)}
              {...inputChangeble}
            />
          </Col>
          <Col xs={4} styleName="input-button-col">
            <Button
              theme={buttonTheme}
              text={BUTTON_TEXT}
              onFocus={() => buttonFocusChangeble.onChange(true)}
              onBlur={() => buttonFocusChangeble.onChange(false)}
              onClick={() => onSubmit(inputChangeble.value)}
            />
          </Col>
        </Row>
      </Col>
    );
  },
);

export default applyStyles(({ onSubmit }: PropsT) => (
  <Card>
    <Row>
      <Col sm={8} xs={12} styleName="component">
        <Row styleName="text">
          <Col xs={12}>
            {
              <TEXT
                discount={<span styleName="discount-text">{DISCOUNT}</span>}
              />
            }
          </Col>
        </Row>
        <Row>
          {/*$FlowIssue*/}
          <InputButton onSubmit={onSubmit} />
        </Row>
      </Col>
      <Col sm={4} xs={0} styleName="photo-col">
        <div styleName="photo" />
      </Col>
    </Row>
  </Card>
));
