// @flow

import React from 'react';
export * as fixtures from './fixtures';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

export type PropsT = {
  onFocus?: Function,
  onBlur?: Function,
  theme?: Object,
  value: string,
  onChange?: Function,
  placeholder?: string,
  LeftIcon?: Component$<*, *>,
  RightIcon?: Component$<*, *>,
  className?: string,
  styleName?: string,
};

export default applyStyles(
  ({
    value,
    onFocus,
    onBlur,
    placeholder,
    onChange,
    className,
    LeftIcon,
    RightIcon,
    theme = {},
  }: PropsT) => (
    <div
      onFocus={onFocus}
      onBlur={onBlur}
      styleName="component"
      className={`${className ? className : ''} ${
        theme['component'] ? theme['component'] : ''
      }`}
    >
      {LeftIcon && <LeftIcon />}
      <input
        styleName="input"
        className={` ${theme['input'] ? theme['input'] : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {RightIcon && <RightIcon />}
    </div>
  ),
);
