// @flow

import React from 'react';
import cx from 'classnames';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const ui = {
  blocks: [
    {
      className: 'chef',
      icon: require('../../../../static/icons/chef.svg'),
      head: 'Du bist flexibel,',
      text:
        'Du bist CHEF und bestimmst das Menü, den Preis sowie die Anzahl an Gästen, die bei dir zu Hause Platz finden.',
    },
    {
      className: 'guest',
      icon: require('../../../../static/icons/guest.svg'),
      head: 'triffst neue Leute',
      text:
        'Du lernst tolle Leute kennen, die du an deinem Esstisch zusammenbringst.',
    },
    {
      className: 'money',
      icon: require('../../../../static/icons/money.svg'),
      head: 'und verdienst dir etwas dazu',
      text:
        'An einem Abend kannst du 500 Euro einnehmen und dein Taschengeld aufbessern.',
    },
  ],
};
const IconBlock = applyStyles(({ className, icon, head, text }) => (
  <div styleName="icon-block">
    <div styleName="wrap">
      <div
        styleName={cx('icon', className)}
        style={{
          backgroundImage: `url(${icon})`,
        }}
      />
    </div>
    <div styleName="block-head">{head}</div>
    <div styleName="text">{text}</div>
  </div>
));
const IconsRow = applyStyles(() => (
  <div styleName="component">{ui.blocks.map(IconBlock)}</div>
));
export default IconsRow;
