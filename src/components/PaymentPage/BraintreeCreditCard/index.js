//@flow

import * as _fixtures from './fixtures';
export const fixtures = _fixtures;

import React from 'react';
import R from 'ramda';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

import MaskedInput from 'react-maskedinput';

import type { Changeble } from '../../../utils/withSimpleState';
import Dropdown from '../../UIKit/Dropdown'; // const INFO_PAYMENT = 'Deine Zahlungsinformationen'

// TODO uset this translations
// const INFO_FOR_CHEF = 'Informationen für deinen Gastgeber'
const CARDHOLDER_NAME = 'Name des Karteninhabers';
const CARD_NUMBER = 'Kreditkartennummer';
const EXPIRATION_DATE = 'Gültig bis';
export type PropsT = {
  cardHolder: Changeble<string>,
  cardNumber: Changeble<string>,
  cardType: string,
  expirationYear: Changeble<string>,
  expirationMonth: Changeble<string>,
  CVV: Changeble<string>,
};
const res = R.compose(
  fixedCSSModules(styles, {
    allowMultiple: true,
  }),
)(
  ({
    cardHolder,
    cardNumber,
    expirationYear,
    expirationMonth,
    cardType,
    CVV,
  }: PropsT) => (
    <div styleName="component">
      <form>
        <div styleName="row">
          <div styleName="title">{CARDHOLDER_NAME}</div>
          <input styleName="cardholder" {...cardHolder} />
        </div>

        <div styleName="row">
          <div styleName="title">{CARD_NUMBER}</div>
          <MaskedInput
            styleName={`cardnumber ${
              cardType === 'Mastercard' || cardType === 'Visa' ? cardType : ''
            }`}
            mask="1111 1111 1111 1111"
            maxLength="16"
            value={cardNumber.value}
            onChange={val => {
              let finalVal = val.target.value;
              finalVal = finalVal.split(' ').join('');
              finalVal = finalVal.split('_').join('');
              cardNumber.onChange(finalVal);
            }}
          />
        </div>

        <div styleName="expiration-CVV">
          <div styleName="expirationWrapper">
            <div styleName="title">{EXPIRATION_DATE}</div>
            <div styleName="expiration">
              <Dropdown
                {...expirationMonth}
                defaultValue="MM"
                options={R.times(R.identity)(12).map(i => i + 1)}
              />
              <Dropdown
                {...expirationYear}
                defaultValue="YY"
                options={R.times(R.identity)(29).map(i => i + 16)}
              />
            </div>
          </div>

          <div styleName="CVVWrapper">
            <div styleName="title">CVV</div>
            <input maxLength="3" {...CVV} />
          </div>
        </div>
      </form>
    </div>
  ),
);
export default res;
