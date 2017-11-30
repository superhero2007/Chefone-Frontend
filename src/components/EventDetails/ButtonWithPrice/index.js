// @flow

export * as fixtures from './fixtures';
import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

export type PropsT = {
  disabled?: boolean,
  onClick: Function,
  text: string | React$Element<*>,
  priceText?: string,
};

export default fixedCSSModules(styles, {
  allowMultiple: true,
})(({ disabled, onClick, text, priceText }: PropsT) => {
  return (
    <button
      disabled={disabled}
      styleName={`component ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
    >
      <span
        styleName={`price-button-text ${disabled ? 'disabled' : ''} ${
          !priceText ? 'full' : ''
        }`}
      >
        {text}
      </span>
      {!!priceText && <span styleName="priceText">{priceText}</span>}
    </button>
  );
});
