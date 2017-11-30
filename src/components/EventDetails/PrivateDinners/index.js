// @flow

export * as fixtures from './fixtures';
import React from 'react';
import { fixedCSSModules, listFromInterval } from '../../../utils';
import styles from './index.module.less';
import withSimpleState from '../../../utils/withSimpleState';
import type { Changeble } from '../../../utils/withSimpleState';
import DatePicker from './DatePicker';
import DropdownPlus from '../../UIKit/Dropdown/DropdownPlus';
import ButtonWithPrice from '../ButtonWithPrice';
import moment from 'moment';
import R from 'ramda';

const TITLE = 'Dein privates Dinner';
const TEXT = `Du willst dein eigenes privates Dinner? Ob Geburtstagsfeier, Junggesellenabschied oder ein anderes Gruppenerlebnis, dein gewünschter Koch kocht auch privat für dich und deine Freunde. Wähle dazu einfach dein gewünschtes Datum mit der Anzahl an Personen und wir senden dir im Anschluss eine E-Mail und bestätigen dir das private Dinner, falls der Koch grünes Licht gegeben hat.`;
const BUTTON_TEXT = 'Gastgeber anfragen';
const SELECT_DATE = 'Datum';
const LEAVE_MESSAGE_EXPLAINED = 'Deine Nachricht an den Gastgeber';
const WRITE_MESSAGE = 'Hier Nachricht eingeben';
const amountToObj = item => ({
  text: item == 1 ? `${item} Gast` : `${item} Gäste`,
  value: item,
});
export type PropsT = {
  price: number,
  currency: string,
  onSubmit: Function,
};
type InnerPropsT = PropsT & {
  amount: Changeble<number>,
  progress: Changeble<string>,
  selectedDate: Changeble<moment$Moment>,
  userMessage: Changeble<string>,
};
export default R.compose(
  withSimpleState('progress', () => 'init'),
  withSimpleState('selectedDate', () => undefined),
  withSimpleState('userMessage', () => ''),
  withSimpleState('amount', () => 6),
  fixedCSSModules(styles),
)(
  ({
    amount,
    progress,
    price,
    currency,
    selectedDate,
    onSubmit,
    userMessage,
  }: InnerPropsT) => {
    const loadingSpinner =
      progress.value === 'loading' ? (
        <i className="fa fa-spinner fa-spin" />
      ) : null;
    return (
      <div styleName="component">
        <div styleName="title">{TITLE}</div>
        <div styleName="text">{TEXT}</div>
        <hr />
        <div styleName="datepicker-wrapper">
          {/*$FlowIssue*/}
          <DatePicker
            {...selectedDate}
            notEarlierThan={moment()}
            defaultText={SELECT_DATE}
          />
        </div>
        <div styleName="dropdown-wrapper">
          {/*$FlowIssue*/}
          <DropdownPlus
            tabIndex={0}
            options={listFromInterval(6, 21).map(amountToObj)}
            printWith={({ text }) => text}
            selected={{
              value: amountToObj(amount.value),
              onChange: s => {
                amount.onChange(s.value);
              },
            }}
          />
        </div>
        <label styleName="user-message-label">{LEAVE_MESSAGE_EXPLAINED}</label>
        <div>
          <textarea
            styleName="user-message"
            placeholder={WRITE_MESSAGE}
            {...userMessage}
          />
        </div>
        <div styleName="button-wrapper">
          <ButtonWithPrice
            disabled={!selectedDate.value || progress.value === 'loading'}
            onClick={async event => {
              event.stopPropagation();
              progress.onChange('loading');
              try {
                await onSubmit({
                  amount: amount.value,
                  date: selectedDate.value.toDate(),
                  price,
                  currency,
                  userMessage: userMessage.value,
                });
                progress.onChange('loaded');
              } catch (err) {
                console.error(err);
                progress.onChange('error');
              }
            }}
            text={
              <span>
                {BUTTON_TEXT} {loadingSpinner}
              </span>
            }
            priceText={`${price * amount.value}${currency}`}
          />
        </div>
      </div>
    );
  },
);
