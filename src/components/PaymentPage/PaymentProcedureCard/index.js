//@flow

import * as _fixtures from './fixtures';
export const fixtures = _fixtures;

import React from 'react';
import 'rc-collapse/assets/index.css';
import R from 'ramda';
import Collapse from '../../rc-collapse';
import Panel from '../../rc-collapse/Panel';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

import type { Changeble } from '../../../utils/withSimpleState';

import type { PropsT as TBraintreeCreditCardData } from '../BraintreeCreditCard';
import BraintreeCreditCard from '../BraintreeCreditCard'; // const TO_DASHBOARD = 'Zur Übersicht' // const TRANSACTION_FAILED_T = ( //   {amount,currencySymbol}: //   {|amount:string|number,currencySymbol:string|} // )=>`Die Transaktion hat nicht funktioniert. Entschuldige bitte, aber die einmalige Zahlung über ${currencySymbol}${amount} ist leider fehlgeschlagen.` // TODO uset this translations // const PLEASE_WAIT = 'Einen Moment... Deine Bestellung wird zubereitet.' // const ACCEPTED_PAYMENT_METHOD = 'Deine Zahlung wurde uns serviert. Vielen Dank für deine Bestellung bei CHEF.ONE. Du erhältst umgehend eine Buchungsbestätigung über die bei uns hinterlegte eMail-Adresse. Solltest du sie nicht innerhalb von 24 Stunden erhalten haben, kontaktiere uns bitte über unseren Support.'
/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
  return false;
}

const FREE_OR_CHANGE = 'Keine Gebühren';
const PAY_WITH_PAYPAL = 'Zahlung mit PayPal';
const ONLINE_BANKING_DIRECT_DEBIT = 'Online Banking und SOFORT';
const CREDIT_DEBIT_CARDS = 'Kreditkarte';
const TRANSACTION_FEE_MAY_APPLY = 'Transaktionsgebühren möglich';
export type TActiveMethod = 'creditCard' | 'paypal' | 'sofort';
export type PropsT = {
  activeMethod: Changeble<TActiveMethod>,
  braintreeCreditCardData: TBraintreeCreditCardData,
};
const Circle = fixedCSSModules(styles)(
  ({
    checked,
    onChange,
    children,
  }: {
    checked: boolean,
    onChange?: Function,
    children?: *,
  }) => (
    <label styleName="control">
      {children}
      <input type="radio" name="radio" checked={checked} onChange={onChange} />
      <div styleName="indicator" />
    </label>
  ),
);
const PaymentCircle = fixedCSSModules(styles)(
  ({
    checked,
    onChange,
    title,
    desciption,
    icons,
  }: {
    checked: boolean,
    onChange?: Function,
    title: string,
    desciption: string,
    icons: Array<any>,
  }) => {
    return (
      <Circle checked={checked} onChange={onChange}>
        <div styleName="content">
          <div>
            <div styleName="title">{title}</div>
            <div styleName="description">{desciption}</div>
          </div>
          <div styleName="icons">
            {icons.map((Icon, key) => (
              <div styleName="icon">
                <Icon key={key} />
              </div>
            ))}
          </div>
        </div>
      </Circle>
    );
  },
);
export default R.compose(fixedCSSModules(styles))(
  ({ activeMethod, braintreeCreditCardData }: PropsT) => {
    const ie = detectIE();
    return (
      <div styleName="payment-component">
        <Collapse
          style={{
            width: '100%',
          }}
          accordion={true}
          onChange={(...val) => {
            const newVal = val[0];
            if (!newVal) {
              return;
            }
            activeMethod.onChange(newVal);
          }}
          activeKey={activeMethod.value}
        >
          <Panel
            isActive={activeMethod.value === 'creditCard'}
            header={
              <PaymentCircle
                checked={activeMethod.value === 'creditCard'}
                title={CREDIT_DEBIT_CARDS}
                desciption={TRANSACTION_FEE_MAY_APPLY}
                icons={[
                  fixedCSSModules(styles)(() => <div styleName="visa-icon" />),
                  fixedCSSModules(styles)(() => (
                    <div styleName="mastercard-icon" />
                  )),
                ]}
              />
            }
            _key="creditCard"
          >
            <BraintreeCreditCard {...braintreeCreditCardData} />
          </Panel>
          <Panel
            isActive={activeMethod.value === 'paypal'}
            header={
              <PaymentCircle
                checked={activeMethod.value === 'paypal'}
                title={PAY_WITH_PAYPAL}
                desciption={TRANSACTION_FEE_MAY_APPLY}
                icons={[
                  fixedCSSModules(styles)(() => (
                    <div styleName="paypal-icon" />
                  )),
                ]}
              />
            }
            _key="paypal"
          />
          {!ie && (
            <Panel
              isActive={activeMethod.value === 'sofort'}
              header={
                <PaymentCircle
                  checked={activeMethod.value === 'sofort'}
                  title={ONLINE_BANKING_DIRECT_DEBIT}
                  desciption={FREE_OR_CHANGE}
                  icons={[
                    fixedCSSModules(styles)(() => (
                      <div styleName="sofort-icon" />
                    )),
                  ]}
                />
              }
              _key="sofort"
            />
          )}
        </Collapse>
      </div>
    );
  },
);
