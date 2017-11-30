// @flow

import React from 'react';

import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

import { DefaultViewRating } from '../UIKit/Rating';

export type Props = {
  avatar?: string,
  name: string,
  address: string,
  rating: number,
};

export default fixedCSSModules(styles)(
  ({ avatar, name, address, rating }: Props) => (
    <div styleName="component">
      <div
        styleName="chef-avatar"
        style={
          avatar
            ? {
                backgroundImage: `url(${avatar})`,
              }
            : {}
        }
      />
      <div styleName="chef-event-data">
        <div styleName="chef-name">{name}</div>
        <div styleName="geo-location">{address}</div>
        <DefaultViewRating value={rating} />
      </div>
    </div>
  ),
);
