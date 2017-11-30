// @flow

import React from 'react';
import R from 'ramda';
import { withState } from 'recompose';
import Time from '../../UIKit/input-moment/Time';
import moment from 'moment';

export default R.compose(withState('value', 'onSave', ({ value }) => value))(
  ({
    value,
    onSave,
    isEditable,
    setEditMode,
    onChange,
  }: {
    value: Object,
    onSave: Function,
    isEditable: boolean,
    setEditMode: Function,
    onChange: Function,
  }) => (
    <div>
      {!isEditable && (
        <input
          onClick={() => {
            setEditMode(true);
          }}
          style={{ width: '100%', textAlign: 'center' }}
          value={value ? value.format('HH:mm') : null}
        />
      )}
      {isEditable && (
        <Time
          moment={value ? value.clone() : moment()}
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
