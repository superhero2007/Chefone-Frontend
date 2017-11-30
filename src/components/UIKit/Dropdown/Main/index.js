//@flow

import React from 'react';
export * as fixtures from './fixtures';
import R from 'ramda';

import { fixedCSSModules } from '../../../../utils';
import styles from './index.module.less';

import withSimpleState from '../../../../utils/withSimpleState';
import type { Changeble } from '../../../../utils/withSimpleState';

export type PropsT<T> = {
  options: Array<T>,
  value?: T,
  defaultValue?: T,
  onChange: Function,
};

type MyComponentT<T> = Component$<PropsT<T>, *>;

//$FlowIssue
const res: MyComponentT<*> = R.compose(
  withSimpleState('selected', ({ value }) => value || null),
  fixedCSSModules(styles),
)(
  ({
    options,
    onChange,
    defaultValue,
    selected,
    ...rest
  }: PropsT<*> & { selected: Changeble<?number> }) => {
    return (
      <select
        styleName="component"
        {...rest}
        value={selected.value}
        onChange={({ target: { value } }) => {
          selected.onChange(value);
          onChange(value);
        }}
      >
        {/*$FlowIssue*/}
        {defaultValue && (
          <option value="" disabled selected>
            {defaultValue}
          </option>
        )}
        {options.map((value, key) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>
    );
  },
);

export default res;
