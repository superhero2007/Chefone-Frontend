// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import chefPhoto from '../../../../static/landing-chefs/chef-photo.png';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const ui = {
  quote:
    '“Ich freue mich, mit CHEF.ONE fremde Menschen an einem Tisch versammeln zu können und hoffe, dasss diese als Freunde wieder gehen! Und das gelingt am besten mit leckerem Essen, tollen Drinks und einer entspannten und lockeren Atmosphäre!”',
  chef: 'Michael',
  about: 'Gastgeber aus Hamburg seit 2016',
};
const Quote = applyStyles(() => (
  <div styleName="component">
    <div styleName="panel">
      <div styleName="quote">{ui.quote}</div>
      <div styleName="chef-info">
        <img src={chefPhoto} styleName="avatar" />
        <div styleName="texts">
          <div styleName="name">{ui.chef}</div>
          <div styleName="about">{ui.about}</div>
        </div>
      </div>
    </div>
  </div>
));
export default Quote;
