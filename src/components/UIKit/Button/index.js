// @flow

import React from 'react';
export * as fixtures from './fixtures';

import styles from './index.module.less';
import { fixedCSSModules } from '../../../utils';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

export const Modes = {
  primary: 'primary',
  link: 'link',
  fb: 'fb',
  outlined: 'outlined',
  green: 'green',
  hibiscus: 'hibiscus',
  turquoise: 'turquoise',
};

export const Sizes = {
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs',
};

export type PropsT = {
  onFocus?: Function,
  onBlur?: Function,
  text: string | React$Element<*>,
  theme?: Object,
  pressed?: boolean,
  type?: string,
  width?: string,
  mode?: $Keys<typeof Modes>,
  size?: $Keys<typeof Sizes>,
  onClick?: Function,
  disabled?: boolean,
  styleName?: string,
  className?: string,
  key?: string | number,
};

export default applyStyles(
  ({
    onFocus,
    onBlur,
    theme = {},
    text,
    type,
    pressed,
    mode = Modes.primary,
    size = Sizes.md,
    width,
    className,
    onClick,
    disabled,
  }: PropsT) => (
    <button
      type={type}
      onFocus={onFocus}
      onBlur={onBlur}
      styleName={`button-mode-${mode} button-size-${size} ${
        pressed ? 'button-pressed' : ''
      } ${disabled ? 'button-disabled' : ''}`}
      className={`${className ? className : ''} ${
        theme['component'] ? theme['component'] : ''
      }`}
      style={{ ...(width ? { width } : {}) }}
      onClick={event => {
        if (disabled || !onClick) {
          return;
        }
        onClick(event);
      }}
    >
      {text}
    </button>
  ),
);
