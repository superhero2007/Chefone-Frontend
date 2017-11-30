//@flow

export * as fixtures from './fixtures';

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

import type { Changeble } from '../../../utils/withSimpleState';

import { Link } from 'react-router';
import CustomerInfoForm from '../CustomerInfoForm';
import OrderInfoCard from '../OrderInfoCard';
import Loader from '../../UIKit/Loader';
import PaymentProceedure from '../PaymentProcedureCard';
import type { PropsT } from '../PaymentProcedureCard';
import { Row, Col } from 'react-flexbox-grid';
const TITLE = 'Informationen für deinen Gastgeber';
const CONTINUE = 'Jetzt Buchen';
const PAYMENT_METHOD = 'Zahlungsmethode';
const USER_CONFIRM_TERMS = [
  'Indem du deine Bestellung aufgibst, bestätigst du unsere ',
  'Geschäftsbedingungen',
  ' gelesen, verstanden und akzeptiert zu haben.',
];
const Errors = fixedCSSModules(styles)(({ value }: { value: Array<any> }) => {
  return (
    <div styleName="errors">
      {value.map((item, key) => (
        <div styleName="error-item" key={key}>
          {' '}
          • {item}
        </div>
      ))}
    </div>
  );
});
export type Props = {
  orderInfoCard: {
    onOrderDiscountVerify: Function,
    currency: string,
    price: number,
    guestsMax: number,
    finalPrice: number,
    foodImage: string,
    eventTitle: string,
    eventDate: string,
    eventTime: string,
    chefAvatar: string,
  },
  paymentProceedure: PropsT,
  errors: Array<any>,
  isMobile: boolean,
  touched: boolean,
  disabled: boolean,
  discount100: boolean,
  discountCode: Changeble<string>,
  chefMessageChangeble: Changeble<string>,
  phoneChangeble: Changeble<string>,
  isAgreedTerms: Changeble<boolean>,
  isUseDiscount: Changeble<boolean>,
  onContinueClick: Function,
  paymentReady: boolean,
  customerInfoReady: boolean,
  orderInfoReady: boolean,
};
export default fixedCSSModules(styles)(
  ({
    isMobile,
    orderInfoCard,
    isUseDiscount,
    discountCode,
    touched,
    chefMessageChangeble,
    phoneChangeble,
    errors,
    isAgreedTerms,
    onContinueClick,
    disabled,
    discount100,
    paymentProceedure,
    paymentReady,
    customerInfoReady,
    orderInfoReady,
  }: Props) => {
    const orderInfoCardElem = orderInfoReady ? (
      <OrderInfoCard
        isUseDiscount={isUseDiscount}
        discountCode={discountCode}
        {...orderInfoCard}
      />
    ) : (
      <Loader />
    );
    const paymentProcedureElem = paymentReady ? (
      <div>
        {!discount100 ? (
          <div>
            <PaymentProceedure {...paymentProceedure} />
            <hr />
          </div>
        ) : null}
      </div>
    ) : (
      <Loader />
    );
    const customerInfoFormElem = customerInfoReady ? (
      <div
        style={{
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        <span styleName="title-customer">{TITLE}</span>
        <CustomerInfoForm
          chefMessageChangeble={chefMessageChangeble}
          phoneChangeble={phoneChangeble}
        />
      </div>
    ) : (
      <Loader />
    );
    const continueReady = paymentReady && customerInfoReady && orderInfoReady;
    const agreedTermsElem = continueReady ? (
      <div styleName="agreed-terms">
        <input type="checkbox" name="option5" {...isAgreedTerms} />
        <span styleName="terms-text">
          {USER_CONFIRM_TERMS[0]}
          <Link to="/AGB">{USER_CONFIRM_TERMS[1]}</Link>
          {USER_CONFIRM_TERMS[2]}
        </span>
      </div>
    ) : (
      <div />
    );
    const errorsElem = (
      <div>{touched && errors.length ? <Errors value={errors} /> : null}</div>
    );
    const continueButtonElem = continueReady ? (
      <div styleName="continue-wrapper">
        <button
          styleName="continue"
          style={
            isMobile
              ? {
                  width: '100%',
                }
              : {}
          }
          disabled={disabled}
          onClick={onContinueClick}
        >
          {/* <i className="fa fa-spinner fa-spin"></i> */}
          {CONTINUE}
        </button>
      </div>
    ) : (
      <div />
    );
    const termsWithButton = (
      <div styleName="terms-with-button">
        {touched && <hr />}
        {agreedTermsElem}
        {continueButtonElem}
      </div>
    );
    console.log(isMobile);
    return (
      <div styleName="component">
        <div className="container">
          {isMobile ? (
            <div>
              {orderInfoCardElem}
              <hr />

              {customerInfoFormElem}
              <hr />
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                <span styleName="title-customer">{PAYMENT_METHOD}</span>
              </div>
              <br />
              {paymentProcedureElem}
              {errorsElem}
              {termsWithButton}
            </div>
          ) : (
            <Row>
              <Col md={6} xs={6}>
                {customerInfoFormElem}
                <hr />
                <br />
                {paymentProcedureElem}
                {errorsElem}
                {termsWithButton}
              </Col>
              <Col md={6} xs={6}>
                {orderInfoCardElem}
              </Col>
            </Row>
          )}
        </div>
      </div>
    );
  },
);
