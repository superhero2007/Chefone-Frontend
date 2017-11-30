// @flow

import React from 'react';

import Button from '../../UIKit/Button';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const ui = {
  head: 'Werde Gastgeber auf CHEF.ONE',
  subhead:
    'Verdiene Geld für deine kulinarische Leidenschaft und bringe Menschen für ein Dinner bei dir zu Hause zusammen.',
  buttonText: 'Jetzt Dinner hosten',
};
const Header = applyStyles(
  ({ goToCreateEvent }: { goToCreateEvent: Function }) => (
    <div styleName="component">
      <div styleName="text-block">
        <div styleName="head">{ui.head}</div>
        <div styleName="subhead">{ui.subhead}</div>
      </div>
      <Button
        styleName="begin-button"
        mode="turquoise"
        onClick={() => goToCreateEvent()}
        text={ui.buttonText}
      />
    </div>
  ),
);
export default Header;
