// @flow

import React from 'react';

import TextSeeMore from '../TextSeeMore';
import { DefaultViewRating } from '../UIKit/Rating';
import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles);

const ui = {
  header: 'Reviews',
  readMore: 'Mehr',
};

export type PropsT = {
  avatar: string,
  name: string,
  rating: number,
  text: string,
  createdAtMonthAndYear: string,
};

const Review = applyStyles(
  ({ avatar, name, rating, text, createdAtMonthAndYear }: PropsT) => (
    <div styleName="review">
      <div styleName="chef">
        <div
          styleName="avatar"
          style={
            avatar
              ? {
                  backgroundImage: `url(${avatar})`,
                }
              : {}
          }
        />
        <div styleName="chef-info">
          <div>
            <span styleName="name">{name}</span>
            <span styleName="date">{createdAtMonthAndYear}</span>
          </div>
          <DefaultViewRating value={rating} />
        </div>
      </div>
      <TextSeeMore maxHeight={56} styleName="text" seeMoreText={ui.readMore}>
        {text}
      </TextSeeMore>
    </div>
  ),
);

const mapReview = (value: PropsT) => <Review key={value.text} {...value} />;

export type ReviewsProps = {
  values: Array<PropsT>,
  onFetchMore: Function,
};

const Reviews = applyStyles(({ values, onFetchMore }: ReviewsProps) => (
  <div styleName="component">
    <div styleName="title">{ui.header}</div>
    {values.map(mapReview)}
    <div styleName="view-all">
      <a onClick={onFetchMore}>{ui.readMore}</a>
    </div>
  </div>
));

export default Reviews;
