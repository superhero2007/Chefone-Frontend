// @flow

import React from 'react';
import R from 'ramda';
import withSimpleState from '../../../../utils/withSimpleState';
import type { Changeble } from '../../../../utils/withSimpleState';
import Calendar from '../../../UIKit/input-moment/Calendar';
import moment from 'moment';
import { fixedCSSModules } from '../../../../utils';
import styles from './index.module.less';

export type PropsT = {
  selectedDate: Changeble<Object>,
  onChange: Function,
  notEarlierThan?: moment$Moment,
  isEditable: Changeble<boolean>,
  defaultText?: string,
};

export default R.compose(
  withSimpleState('selectedDate', s => {
    return s.value;
  }),
  withSimpleState('isEditable', () => false),
  fixedCSSModules(styles),
)(
  ({
    selectedDate,
    isEditable,
    onChange,
    defaultText,
    notEarlierThan,
  }: PropsT) => {
    return (
      <div>
        {!isEditable.value && (
          <input
            onClick={() => isEditable.onChange(true)}
            styleName="input"
            placeholder={defaultText}
            value={
              selectedDate.value ? selectedDate.value.format('DD/MM/YYYY') : ''
            }
          />
        )}
        {isEditable.value && (
          <Calendar
            notEarlierThan={notEarlierThan}
            moment={
              (selectedDate.value && selectedDate.value.clone()) || moment()
            }
            onSave={m => {
              isEditable.onChange(false);
              selectedDate.onChange(m);
              if (onChange) {
                onChange(m);
              }
            }}
          />
        )}
      </div>
    );
  },
);
