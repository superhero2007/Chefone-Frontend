//@flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './components.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const defOnClick = () => {};

export const Button = applyStyles(
  ({
    text,
    onClick = defOnClick,
    disable = false,
    ...props
  }: {
    text: string,
    onClick?: Function,
    disable?: boolean,
    props?: Object,
  }) => (
    <button styleName="button" onClick={onClick} disable={disable} {...props}>
      {text}
    </button>
  ),
);
