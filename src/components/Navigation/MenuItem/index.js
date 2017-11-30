// @flow

import React from 'react';
import Separator from '../Separator';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

export const MenuIconCollection = fixedCSSModules(styles)(
  ({ value }: { value: Array<any> }) => {
    return (
      <div>
        {value.map((item, i) => (
          <div styleName="icon-wrapper" key={i} className="icon-wrapper">
            {i === 0 && <Separator vertical styleName="separator" />}
            {item}
            <Separator vertical styleName="separator-right" />
          </div>
        ))}
      </div>
    );
  },
);

export const MenuIcon = fixedCSSModules(styles, {
  allowMultiple: true,
})(
  ({
    noMargin,
    onClick,
    leftIcon,
    rightIcon,
    text,
    className,
    theme = {},
  }: {
    noMargin?: boolean,
    onClick?: Function,
    leftIcon?: any,
    rightIcon?: any,
    className?: string,
    text: string,
    theme?: Object,
  }) => {
    return (
      <div
        styleName="menu-item"
        className={`${theme['menu-item']} ${className ? className : ''}`}
        onClick={onClick}
      >
        {leftIcon && (
          <div styleName="icon_left" className={theme['icon_left']}>
            {leftIcon}
          </div>
        )}
        <span
          styleName={`text ${noMargin ? 'no-margin' : ''}`}
          className={theme['text']}
        >
          {text}
        </span>
        {rightIcon && (
          <div styleName="icon_right" className={theme['icon_right']}>
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);
