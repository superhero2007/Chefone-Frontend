// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import Button from '../../UIKit/Button';
import confirmLogo from '../../../../static/chef_one-confirm_logo.png';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const TEXTS = {
  DONE_TEXT:
    'Du bist nun bereit für kulinarische Abenteuer in den Küchen deiner Stadt.',
  FINISH_BUTTON: 'Los gehts!',
};
export type Props = {
  onFinishClick: Function,
};
export default applyStyles(({ onFinishClick }: Props) => (
  <div styleName="panel-finish">
    <div styleName="banner">
      <img styleName="logo" src={confirmLogo} />
    </div>
    <div styleName="done-text">{TEXTS.DONE_TEXT}</div>
    <Button
      styleName="button-finish"
      mode="turquoise"
      text={TEXTS.FINISH_BUTTON}
      onClick={onFinishClick}
    />
  </div>
));
