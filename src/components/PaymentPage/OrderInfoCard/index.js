//@flow

import * as _fixtures from './fixtures';
export const fixtures = _fixtures;

import React from 'react';
import R from 'ramda';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

import withSimpleState from '../../../utils/withSimpleState';
import { listFromNumber } from '../../../utils';
import type { Changeble } from '../../../utils/withSimpleState';

import { Row, Col } from 'react-flexbox-grid';

import Dropdown from '../../UIKit/Dropdown';

const USE_COUPON_CODE = 'Gutscheincode eingeben';
const GUEST = 'Gast';
const APPLY = 'Übernehmen';
const TOTAL = 'Gesamt';
const DISCOUNT = 'Gutschein';

const NOTE_ABOUT_48_CANCEL = (
  <div>
    Nach deiner erfolgreichen Buchung erhältst du die Kontaktdaten deines CHEFs.
    Bitte beachte unsere{' '}
    <a href="https://chefone.zendesk.com/hc/de/articles/115001257489-CHEF-ONEs-Erstattungsrichtlinien">
      Rückerstattungsrichtlinien
    </a>{' '}
    aufgrund von Absage des Events.
  </div>
);
export type PropsT = {
  onOrderDiscountVerify: Function,
  currency: string,
  price: number,
  guestsMax: number,
  finalPrice: number,
  discountValue?: number,
  foodImage: string,
  eventTitle: string,
  eventDate: string,
  eventTime: string,
  chefAvatar: string,
  discountCode: Changeble<string>,
  guestsNumber: Changeble<number>,
  isUseDiscount: Changeble<boolean>,
};
type InnerPropsT = PropsT & {
  discountApplyButton: Changeble<string>,
};

//$FlowIssue
const res: Component$<PropsT, *> = R.compose(
  withSimpleState('discountApplyButton', () => 'initial'),
  fixedCSSModules(styles),
)(
  ({
    discountApplyButton,
    onOrderDiscountVerify,
    isUseDiscount,
    discountCode,
    guestsNumber,
    guestsMax,
    currency,
    discountValue,
    price,
    finalPrice,
    foodImage,
    eventTitle,
    eventDate,
    eventTime,
    chefAvatar,
  }: InnerPropsT) => {
    const priceStr = `${currency} ${price}`;
    const priceWithGuestsStr = `${currency} ${price * guestsNumber.value}`;
    const totalPriceStr = `${currency} ${finalPrice}`;
    const discountStr = discountValue
      ? `-${currency} ${discountValue}`
      : undefined;

    return (
      <div styleName="component">
        <div styleName="card">
          <img
            styleName="food-image"
            style={{
              backgroundImage: `url(${foodImage})`,
            }}
          />
          <main>
            <section styleName="event-info">
              <div>
                <div styleName="food-title">{eventTitle}</div>
                <span styleName="date">{eventDate}</span>
                <span styleName="time">{eventTime}</span>
              </div>
              <div>
                <img styleName="chef-avatar" src={chefAvatar} />
              </div>
            </section>
            <hr />
            <section>
              <div>
                <label>{GUEST}</label>
                <div styleName="guests-selector">
                  <Dropdown
                    options={listFromNumber(guestsMax).map(x => x + 1)}
                    {...guestsNumber}
                  />
                </div>
              </div>
              <a
                styleName="use-coupon"
                onClick={() => {
                  if (isUseDiscount.value) {
                    return;
                  }
                  isUseDiscount.onChange(true);
                }}
              >
                {USE_COUPON_CODE}
              </a>
              {isUseDiscount.value && (
                <Row styleName="discount-apply">
                  <Col xs={12} sm={12} md={8} styleName="discount-input-col">
                    <input styleName="discount-input" {...discountCode} />
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={4}
                    styleName="discount-apply-button-col"
                  >
                    <button
                      styleName="discount-apply-button"
                      buttonState={discountApplyButton.value}
                      onClick={async () => {
                        try {
                          discountApplyButton.onChange('pending');
                          await onOrderDiscountVerify(discountCode.value);
                          discountApplyButton.onChange('success');
                        } catch (e) {
                          discountApplyButton.onChange('error');
                        }
                        setTimeout(
                          () => discountApplyButton.onChange('initial'),
                          1000,
                        );
                      }}
                    >
                      {APPLY}
                    </button>
                  </Col>
                </Row>
              )}
            </section>
            <hr />
            <section>
              <div styleName="guests-multiply">
                <div>
                  {priceStr} x {guestsNumber.value} {GUEST}
                </div>
                <div>
                  <span>{priceWithGuestsStr}</span>
                </div>
              </div>
              {discountStr && (
                <div styleName="discount-value">
                  <div>{DISCOUNT}</div>
                  <div>
                    <span>{discountStr}</span>
                  </div>
                </div>
              )}
              <div styleName="total">
                <div>
                  <span>{TOTAL}</span>
                </div>
                <div>
                  <span>{totalPriceStr}</span>
                </div>
              </div>
            </section>
          </main>
        </div>
        <div styleName="info-on-receive">{NOTE_ABOUT_48_CANCEL}</div>
      </div>
    );
  },
);
export default res;
