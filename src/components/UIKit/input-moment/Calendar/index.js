// @flow

export * as fixtures from './fixtures';
import R from 'ramda';
import cx from 'classnames';
import React, { Component } from 'react';
import range from 'lodash/range';
import { chunk } from 'lodash/array';
import withSimpleState from '../../../../utils/withSimpleState';
import type { Changeble } from '../../../../utils/withSimpleState';

import WithSaveButton from '../WithSaveButton';

import { fixedCSSModules } from '../../../../utils';
import styles from './index.module.less';

type DayT = {
  key?: string,
  i: number,
  w: number,
  day: moment$Moment,
  current: moment$Moment,
  selected: moment$Moment,
  notLaterThan?: moment$Moment,
  notEarlierThan?: moment$Moment,
  onClick: Function,
  onDisabledClick: Function,
};

const Day = fixedCSSModules(styles)(
  ({
    i,
    w,
    day,
    current,
    selected,
    notLaterThan,
    notEarlierThan,
    onClick,
    onDisabledClick,
  }: DayT) => {
    const prevMonth = w === 0 && i > 7;
    if (prevMonth) {
      day.subtract(1, 'month');
    }
    const nextMonth = w >= 4 && i <= 14;
    if (nextMonth) {
      day.add(1, 'month');
    }

    let enabled = true;

    if (
      notEarlierThan &&
      !day.clone().isAfter(notEarlierThan.clone().add(1, 'day'))
    ) {
      enabled = false;
    }

    if (
      notLaterThan &&
      !day.clone().isBefore(notLaterThan.clone().subtract(1, 'day'))
    ) {
      enabled = false;
    }

    const selectedDay =
      enabled && !prevMonth && !nextMonth && i === selected.date();
    const currentDay =
      enabled &&
      !prevMonth &&
      !nextMonth &&
      current
        .clone()
        .startOf('day')
        .isSame(day.clone().startOf('day'));
    const cn = cx({
      disabled: !enabled,
      'prev-month': enabled && prevMonth,
      'next-month': enabled && nextMonth,
      selected: !currentDay && selectedDay,
      'current-day': currentDay,
    });

    return (
      <td
        styleName={cn}
        onClick={e => {
          e.preventDefault();
          if (!enabled) onDisabledClick();
          if (enabled && !(currentDay && selectedDay)) {
            onClick();
          }
        }}
      >
        {i}
      </td>
    );
  },
);

export type PropsT = {
  moment: moment$Moment,
  notEarlierThan?: moment$Moment,
  notLaterThan?: moment$Moment,
  className?: string,
  prevMonthIcon?: string,
  nextMonthIcon?: string,
  onSave: Function,
  dateError?: Object,
};

export type InnerPropsT = {
  selected: Changeble<moment$Moment>,
} & PropsT;

export default R.compose(
  withSimpleState('selected', ({ moment }) => moment),
  fixedCSSModules(styles),
)(
  class extends Component<*, *> {
    static displayName = 'Calendar';

    static defaultProps = {
      prevMonthIcon: 'fa fa-angle-left',
      nextMonthIcon: 'fa fa-angle-right',
    };

    render() {
      const {
        selected,
        moment: current,
        notEarlierThan,
        notLaterThan,
        className,
        prevMonthIcon,
        nextMonthIcon,
        onSave,
        dateError,
      }: InnerPropsT = this.props;

      const { value: m, onChange } = selected;

      const d1 = m
        .clone()
        .subtract(1, 'month')
        .endOf('month')
        .date();
      const d2 = m
        .clone()
        .date(1)
        .day();
      const d3 = m
        .clone()
        .endOf('month')
        .date();

      const days = [].concat(
        range(d1 - d2 + 1, d1 + 1),
        range(1, d3 + 1),
        range(1, 42 - d3 - d2 + 1),
      );

      const canPrevMonth = notEarlierThan
        ? m
            .clone()
            .subtract(1, 'month')
            .isAfter(notEarlierThan.clone().startOf('month'))
        : true;

      const canNextMonth = notLaterThan
        ? m
            .clone()
            .add(1, 'month')
            .isBefore(notLaterThan.clone().endOf('month'))
        : true;

      const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return (
        <WithSaveButton onSave={() => console.log(m) || onSave(m)}>
          {
            <div styleName={cx('m-calendar', className)}>
              <div styleName="toolbar">
                {canPrevMonth && (
                  <button
                    type="button"
                    styleName="prev-month"
                    onClick={(e: Object) => {
                      e.preventDefault();
                      onChange(m.subtract(1, 'month'));
                    }}
                  >
                    <i className={prevMonthIcon} />
                  </button>
                )}
                <span styleName="current-date">{m.format('MMMM YYYY')}</span>
                {canNextMonth && (
                  <button
                    type="button"
                    styleName="next-month"
                    onClick={(e: Object) => {
                      e.preventDefault();
                      onChange(m.add(1, 'month'));
                    }}
                  >
                    <i className={nextMonthIcon} />
                  </button>
                )}
              </div>

              <table>
                <thead>
                  <tr>{weeks.map((w, i) => <td key={i}>{w}</td>)}</tr>
                </thead>

                <tbody>
                  {chunk(days, 7).map((row, w) => (
                    <tr key={w}>
                      {row.map(i => (
                        <Day
                          key={i}
                          notEarlierThan={notEarlierThan}
                          notLaterThan={notLaterThan}
                          i={i}
                          w={w}
                          selected={m.clone()}
                          current={current}
                          day={m.clone().date(i)}
                          onDisabledClick={() => {
                            const prevMonth = w === 0 && i > 7;
                            const nextMonth = w >= 4 && i <= 14;

                            const newMoment = m.clone();
                            newMoment.date(i);
                            if (prevMonth) {
                              newMoment.subtract(1, 'month');
                            }
                            if (nextMonth) {
                              newMoment.add(1, 'month');
                            }
                            const lessThanWeek =
                              m.clone().diff(newMoment, 'days') <= 6;
                            dateError.onChange(lessThanWeek);
                          }}
                          onClick={() => {
                            const prevMonth = w === 0 && i > 7;
                            const nextMonth = w >= 4 && i <= 14;

                            const newMoment = m.clone();
                            newMoment.date(i);
                            if (prevMonth) {
                              newMoment.subtract(1, 'month');
                            }
                            if (nextMonth) {
                              newMoment.add(1, 'month');
                            }

                            onChange(newMoment);
                          }}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </WithSaveButton>
      );
    }
  },
);
