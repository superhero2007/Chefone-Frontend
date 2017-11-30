// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const ui = {
  head: 'Fragen?',
  mess: 'Messenger',
  whatsapp: 'WhatsApp',
};

const Button = applyStyles(({ text, icon, ...props }) => (
  <button {...props}>
    <div
      styleName="icon"
      style={{
        backgroundImage: `url(../static/icons/${icon}.svg)`,
      }}
    />
    <div styleName="text">{text}</div>
  </button>
));

const Contacts = applyStyles(() => (
  <div styleName="component">
    <div styleName="head">{ui.head}</div>
    <div styleName="block">
      <Button styleName="messenger" icon="messenger" text={ui.mess} />
      <Button styleName="whatsapp" icon="whatsapp" text={ui.whatsapp} />
    </div>
  </div>
));

export default Contacts;
