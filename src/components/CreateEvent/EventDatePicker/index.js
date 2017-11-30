// @flow

import React from 'react';
import R from 'ramda';
import { withState } from 'recompose';
import Calendar from '../../UIKit/input-moment/Calendar';
import moment from 'moment';

export default R.compose(
  withState('selectedDate', 'onSave', ({ value }) => value),
)(
  ({
    selectedDate,
    onSave,
    isEditable,
    setEditMode,
    onChange,
    dateError,
  }: {
    selectedDate: Object,
    onSave: Function,
    isEditable: boolean,
    setEditMode: Function,
    onChange: Function,
    dateError: Object,
  }) => (
    <div>
      {!isEditable && (
        <input
          onClick={() => setEditMode(true)}
          style={{ width: '100%', textAlign: 'center' }}
          value={selectedDate ? selectedDate.format('DD/MM/YYYY') : ''}
        />
      )}
      {isEditable && (
        <Calendar
          dateError={dateError}
          moment={
            selectedDate ? selectedDate.clone() : moment().add(1, 'weeks')
          }
          notEarlierThan={moment().add(1, 'weeks')}
          onSave={m => {
            setEditMode(false);
            onSave(m);
            if (onChange) {
              onChange(m);
            }
          }}
        />
      )}
    </div>
  ),
);
