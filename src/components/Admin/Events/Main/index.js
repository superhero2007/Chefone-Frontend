// @flow

import React from 'react';
export * as fixtures from './fixtures';
import Table from '../Table';
import Dashboard from '../Dashboard';
import Dropdown from '../../../UIKit/Dropdown';
import Input from '../../../UIKit/Input';
import Calendar from '../../../UIKit/input-moment/Calendar';
import DashboardNavbar from '../../../DashboardNavbar';
import PaymentsOverview from '../PaymentsOverview';
import type { PropsT as PaymentsOverviewT } from '../PaymentsOverview';
import { LoaderDecorator } from '../../../../decorators';
import styles from './index.module.less';
import { fixedCSSModules } from '../../../../utils';
import withSimpleState from '../../../../utils/withSimpleState';
import type { Changeble } from '../../../../utils/withSimpleState';
import Modal from '../../../Modal';
import type { AdminEventInfo } from '../../../../server/api/admin';
import R from 'ramda';

export type AdminEventsComponentType = {
  events: Array<AdminEventInfo>,
  paymentOverview: PaymentsOverviewT,
};

const CalendarIcon = fixedCSSModules(styles)(() => (
  <div styleName="calendar-icon" />
));

const ModaledCalendar = ({
  mom,
  momentModal,
  notEarlierThan,
  notLaterThan,
}: {
  mom: Changeble<moment$Moment>,
  momentModal: Changeble<boolean>,
  notEarlierThan?: moment$Moment,
  notLaterThan?: moment$Moment,
}) => (
  <div>
    {momentModal.value && (
      <Modal onCloseClick={() => momentModal.onChange(false)}>
        <div style={{ marginTop: 100, marginLeft: 20, marginRight: 20 }}>
          <Calendar
            {...{
              moment: mom.value,
              notEarlierThan,
              notLaterThan,
              onSave: momToSave => {
                mom.onChange(momToSave);
                momentModal.onChange(false);
              },
            }}
          />
        </div>
      </Modal>
    )}
  </div>
);

const InputCalendar = fixedCSSModules(styles)(({ mom, momentModal }) => (
  <div onClick={() => momentModal.onChange(true)}>
    <Input
      value={mom.value.format('MMM DD, YYYY')}
      styleName="date-input"
      RightIcon={CalendarIcon}
    />
  </div>
));

type InnerPropsT = AdminEventsComponentType & {
  selectedMode: Object,
  timeRange: *,
  fromMoment: Changeble<moment$Moment>,
  fromMomentModal: Changeble<boolean>,
  toMoment: Changeble<moment$Moment>,
  toMomentModal: Changeble<boolean>,
  onSelectEvent: Function,
};

const res: Component$<AdminEventsComponentType, *> = R.compose(
  withSimpleState(
    'fromMoment',
    ({ timeRange: { value: { greaterDate } } }) => greaterDate,
  ),
  withSimpleState('fromMomentModal', () => false),
  withSimpleState(
    'toMoment',
    ({ timeRange: { value: { lessDate } } }) => lessDate,
  ),
  withSimpleState('toMomentModal', () => false),
  LoaderDecorator({
    condition: ({ events }) => !!events,
    isOnlyLoader: true,
  }),
  fixedCSSModules(styles),
)(
  ({
    timeRange,
    events,
    paymentOverview,
    fromMoment,
    fromMomentModal,
    toMoment,
    toMomentModal,
    selectedMode,
    onSelectEvent,
  }: InnerPropsT) => {
    let filterFunc = (a: *) => !!a;
    if (selectedMode.value === 'all') {
      filterFunc = (a: *) => !!a;
    } else if (selectedMode.value === 'active') {
      filterFunc = ({ passed }) => !passed;
    } else if (selectedMode.value === 'passed') {
      filterFunc = ({ passed }) => !!passed;
    }

    let filteredEvents = events ? R.filter(filterFunc)(events) : [];

    const dashboard: {
      eventsNumber: number,
      guestsNumber: number,
      revenue: number,
      serviceFeeTotal: number,
      currencySymbol: string,
    } = {
      eventsNumber: filteredEvents.length,
      //$FlowIssue
      guestsNumber: R.compose(R.sum, R.pluck('servingsSold'))(filteredEvents),
      //$FlowIssue
      revenue: R.compose(R.sum, R.pluck('bruttoTotal'))(filteredEvents),
      serviceFeeTotal: R.compose(R.sum, R.pluck('serviceFeeTotal'))(
        //$FlowIssue
        filteredEvents,
      ),
      currencySymbol: '€',
    };
    //$FlowIssue
    filteredEvents = R.map(obj => {
      return {
        ...obj,
        reviewsMails: 1,
      };
    })(filteredEvents);
    return (
      <div>
        <ModaledCalendar
          mom={{
            value: fromMoment.value,
            onChange: mom => {
              fromMoment.onChange(mom);
              timeRange.onChange({
                greaterDate: mom,
                lessDate: toMoment.value,
              });
            },
          }}
          notLaterThan={toMoment.value}
          momentModal={fromMomentModal}
        />
        <ModaledCalendar
          mom={{
            value: toMoment.value,
            onChange: mom => {
              toMoment.onChange(mom);
              timeRange.onChange({
                greaterDate: fromMoment.value,
                lessDate: mom,
              });
            },
          }}
          notEarlierThan={fromMoment.value}
          momentModal={toMomentModal}
        />
        <DashboardNavbar />
        <div styleName="my-container">
          <div styleName="list" className="container">
            <div styleName="payment-overview">
              <PaymentsOverview {...paymentOverview} />
            </div>
            <Dashboard {...dashboard} />
            <h1>{selectedMode.value} Dinners</h1>
            <div styleName="select-raw">
              <span>From</span>
              <InputCalendar mom={fromMoment} momentModal={fromMomentModal} />
              <span>to</span>
              <InputCalendar mom={toMoment} momentModal={toMomentModal} />
              <div styleName="modes">
                <Dropdown
                  className={styles.dropdown}
                  options={['all', 'active', 'passed']}
                  {...selectedMode}
                />
              </div>
            </div>
            {filteredEvents && (
              <div styleName="events">
                <Table values={filteredEvents} onSelectEvent={onSelectEvent} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
export default res;
