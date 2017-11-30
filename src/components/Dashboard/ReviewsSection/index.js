// @flow

import React from 'react';
export * as fixtures from './fixtures';
import { fixedCSSModules } from '../../../utils';
import AvatarImage from '../../UIKit/AvatarImage';
import Rating from '../../UIKit/Rating';
import { Row, Col } from 'react-flexbox-grid';
import Button from '../../UIKit/Button';

import styles from './index.module.less';

type ReviewT = {
  orderId?: string,
  avatar: string,
  name: string,
  text: string,
  rating?: number,
};

const ReviewElement = fixedCSSModules(styles, {
  allowMultiple: true,
})(
  ({
    onReviewIntentClick,
    orderId,
    avatar,
    name,
    text,
    rating,
  }: ReviewT & { onReviewIntentClick: Function }) => {
    return (
      <div styleName="card">
        <div styleName="user">
          <AvatarImage
            diam={100}
            round={true}
            src={avatar && avatar.replace('http://', 'https://')}
            placeholderStroke="orange"
          />
          <div styleName="name">{rating ? `${name} rated you:` : name}</div>
        </div>
        {rating === undefined ? (
          <div>
            <div styleName="text">Hinterlasse {name} eine Bewertung.</div>

            <div styleName="button">
              <Button
                mode="hibiscus"
                text="Berwerte Jetzt"
                onClick={() => {
                  onReviewIntentClick(orderId);
                }}
              />
            </div>
          </div>
        ) : (
          <div>
            <div styleName="rating">
              <Rating
                {...{
                  toggledClassName: 'fa fa-star',
                  untoggledClassName: 'fa fa-star-o',
                  halfClassName: 'fa fa-star',
                  color: '#CE5100',
                  defaultRating: rating,
                  viewOnly: true,
                }}
              />
            </div>
            <div styleName="reviewTextWrapper">
              <div styleName="reviewText">{text}</div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

export type PropsT = {
  values: Array<ReviewT>,
  onReviewIntentClick: Function,
};

export default ({ values, onReviewIntentClick }: PropsT) => (
  <Row>
    {values &&
      values.map((item, index) => (
        <Col xs={12} md={4}>
          <ReviewElement
            {...item}
            onReviewIntentClick={onReviewIntentClick}
            key={index}
          />
        </Col>
      ))}
  </Row>
);
