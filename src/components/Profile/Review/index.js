// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from '../index.module.less';

import Reviews from '../../Review';

const applyStyles = fixedCSSModules(styles);

const ReviewsBlock = applyStyles(({ review }) => (
  <div styleName="panel">
    <Reviews values={review.reviews} onFetchMore={review.onFetchMore} />
  </div>
));
export default ReviewsBlock;
