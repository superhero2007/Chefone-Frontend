// @flow

import React from 'react';
import { withState } from 'recompose';
import SvgIcon from '../SvgIcon';

export default withState(
  'value',
  'onSave',
  ({ optionDefault }) => optionDefault,
)(
  ({
    options,
    value,
    itemClassName,
    className,
    onChange,
    onSave,
  }: {
    options: Array<{
      name: string,
      label: string,
      checkedIcon: string,
      uncheckedIcon: string,
    }>,
    value: string,
    itemClassName: string,
    className: string,
    onChange: Function,
    onSave: Function,
  }) => (
    <div className={className}>
      {options.map(({ name, label, checkedIcon, uncheckedIcon }, key) => (
        <div
          key={key}
          onClick={() => {
            if (onChange) {
              onChange(name);
            }
            onSave(name);
          }}
        >
          <p
            style={{
              textAlign: 'center',
              width: '75px',
              color: value === name ? '#CE5100' : '',
            }}
          >
            {label}
          </p>
          <SvgIcon
            finalIcon={value === name ? checkedIcon : uncheckedIcon}
            className={itemClassName}
            key={key}
          />
        </div>
      ))}
    </div>
  ),
);
