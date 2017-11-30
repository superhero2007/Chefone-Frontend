// @flow

import React from 'react';
import R from 'ramda';
import moment from 'moment';

import { withHandlers } from 'recompose';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import Dropdown from '../../UIKit/Dropdown';
import Button from '../../UIKit/Button';
import { Panel } from '../Share';

import withSimpleState from '../../../utils/withSimpleState';
import type { Changeble } from '../../../utils/withSimpleState';

import panelTheme from './panel-theme.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const TEXTS = {
  HEADER: '3. Vervollständige dein Profil',
  DETAILS: 'Teile der CHEF.ONE Community in ein paar Sätzen mit, wer du bist.',
  bio: 'Über mich',
  location: 'In welcher Stadt wohnst du?',
  NEXT: 'Next',
  DOB: {
    LABEL: 'Geburtsdatum',
    MONTH: 'Monat',
    DAY: 'Tag',
    YEAR: 'Jahr',
  },
};
const makeArray = R.times(R.identity);
const minAge = 10;
const maxAge = 100;
const currentYear = moment().year() - minAge;
const monthOptions = R.compose(
  R.map(id =>
    moment()
      .month(id)
      .format('MMMM'),
  ),
  makeArray,
)(12);
const dayOptions = R.map(R.add(1))(makeArray(31));
const YearOptions = R.map(id => currentYear - id)(makeArray(maxAge - minAge));
type DateChangable = {
  year: Changeble<string>,
  month: Changeble<string>,
  day: Changeble<number>,
};
const DOBSelector = applyStyles(
  ({ className, year, month, day }: { className?: string } & DateChangable) => (
    <div styleName="dob" className={className}>
      <div styleName="flex-row label">{TEXTS.DOB.LABEL}</div>
      <div styleName="flex-row dropdowns" className={className}>
        <Dropdown
          required
          styleName="item"
          options={monthOptions}
          defaultValue={TEXTS.DOB.MONTH}
          {...month}
        />
        <Dropdown
          required
          styleName="item"
          options={dayOptions}
          defaultValue={TEXTS.DOB.DAY}
          {...day}
        />
        <Dropdown
          required
          styleName="item"
          options={YearOptions}
          defaultValue={TEXTS.DOB.YEAR}
          {...year}
        />
      </div>
    </div>
  ),
);
export type Props = {
  stage: Changeble<number>,
  onSkipClick: Function,
  onNextClick: Function,
};
type InnerProps = Props &
  DateChangable & {
    bio: Changeble<string>,
    location: Changeble<string>,
    onFormSubmit(): void,
  };
const getBirthday = R.pipe(R.unapply(R.pluck('value')), R.join('-'), birthday =>
  moment(birthday, 'DD-MMMM-YYYY'),
);
//$FlowIssue
const res: (a: Props) => any = R.compose(
  withSimpleState(
    'year',
    ({ data: { birthday } }) => (birthday ? moment(birthday).year() : null),
  ),
  withSimpleState(
    'month',
    ({ data: { birthday } }) =>
      birthday ? moment(birthday).format('MMMM') : null,
  ),
  withSimpleState(
    'day',
    ({ data: { birthday } }) => (birthday ? moment(birthday).date() : null),
  ),
  withSimpleState('bio', ({ data: { bio } }) => bio),
  withSimpleState('location', ({ data: { location } }) => location),
  withHandlers({
    onFormSubmit: ({
      day,
      month,
      year,
      bio,
      location,
      onNextClick,
    }) => event => {
      event.preventDefault();
      //$FlowIssue
      const birthday = getBirthday(day, month, year);
      onNextClick({
        birthday: birthday.toDate(),
        location: location.value,
        bio: bio.value,
      });
    },
  }),
  applyStyles,
)(
  ({
    onSkipClick,
    stage,
    onNextClick,
    year,
    month,
    day,
    bio,
    location,
  }: InnerProps) => (
    <Panel
      stage={stage}
      onSkipClick={onSkipClick}
      header={TEXTS.HEADER}
      detailedText={TEXTS.DETAILS}
      theme={panelTheme}
    >
      {/*$FlowIssue*/}
      <textarea
        required
        styleName="row input-font field"
        rows="3"
        className="form-control"
        placeholder={TEXTS.bio}
        {...bio}
      />
      {/*$FlowIssue*/}
      <input
        required
        styleName="row input-font field"
        className="form-control"
        placeholder={TEXTS.location}
        {...location}
      />
      {/*$FlowIssue*/}
      <DOBSelector styleName="field row" {...{ year, month, day }} />
      {/*$FlowIssue*/}
      <Button
        text={TEXTS.NEXT}
        className={styles['button-next']}
        onClick={() => {
          const birthday =
            !!day.value && !!month.value && !!year.value
              ? moment(
                  `${day.value}-${month.value}-${year.value}`,
                  'DD-MMMM-YYYY',
                )
              : undefined;
          onNextClick({
            birthday: birthday ? birthday.toDate() : undefined,
            location: location.value,
            bio: bio.value,
          });
        }}
      />
    </Panel>
  ),
);
export default res;
