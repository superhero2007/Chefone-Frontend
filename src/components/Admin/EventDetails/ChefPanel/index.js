// @flow

import React from 'react';
import R from 'ramda';
import styles from './index.module.less';
import SvgIcon from '../../../SvgIcon';
import { fixedCSSModules } from '../../../../utils';
import type { ChefPanel } from '../../../../server/api/admin';

export default R.compose(fixedCSSModules(styles))(
  ({
    firstName,
    lastName,
    avatar,
    email,
    phone,
    userId,
    chefId,
    foodId,
  }: ChefPanel) => {
    return (
      <div styleName="container">
        <div>
          <img src={avatar} />
          <span styleName="chef-name">
            {firstName} {lastName}
          </span>
        </div>
        <hr styleName="first-divider" />
        <div>
          <SvgIcon
            styleName="message_icon"
            finalIcon={require('../../../../../static/icons/message_gray.svg')}
          />
          {email}
        </div>
        <div styleName="message">
          <SvgIcon
            styleName="phone_call_icon"
            finalIcon={require('../../../../../static/icons/phone_call_gray.svg')}
          />
          {phone}
        </div>
        <hr styleName="second-divider" />
        <div styleName="info">
          <div>
            <span styleName="left-col">Chef:</span>
            <span>{firstName}</span>
          </div>
          <div>
            <span styleName="left-col">UserID:</span>
            <span>{userId}</span>
          </div>
          <div>
            <span styleName="left-col">ChefID:</span>
            <span>{chefId}</span>
          </div>
          <div>
            <span styleName="left-col">FoodID:</span>
            <span>{foodId}</span>
          </div>
        </div>
      </div>
    );
  },
);
