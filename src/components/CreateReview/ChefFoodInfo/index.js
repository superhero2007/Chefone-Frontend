// @flow

import React from 'react';
import Card from '../../UIKit/Card';
import AvatarImage from '../../UIKit/AvatarImage';
import TextSeeMore from '../../TextSeeMore';
import styles from './index.module.less';
import { fixedCSSModules } from '../../../utils';

export default fixedCSSModules(styles)(
  ({
    chefName,
    avatar,
    cityName,
    title,
    foodDescription,
    className,
  }: {
    chefName: string,
    avatar: string,
    cityName: string,
    title: string,
    foodDescription: string,
    className?: string,
  }) => {
    return (
      <Card className={className} styleName="card">
        <div styleName="avatar-wrapper" className="text-center">
          <AvatarImage src={avatar} round diam="100%" borderRadius={3000} />
        </div>
        <div styleName="food-title">{title}</div>
        <p styleName="food-description">
          <TextSeeMore>{foodDescription}</TextSeeMore>
        </p>
        <hr />
        <div styleName="chef-name">{chefName}</div>
        <div styleName="city-name">{cityName}</div>
      </Card>
    );
  },
);
