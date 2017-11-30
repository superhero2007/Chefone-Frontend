// @flow

import React, { Component } from 'react';
import AvatarImage from '../AvatarImage';
import 'slick-carousel/slick/slick.css';
import Slider from './react-slick';
import leftArrow from '../../../../static/icons/left_arrow.svg';
import rightArrow from '../../../../static/icons/right_arrow.svg';

class PrevArrow extends Component<*, *> {
  render() {
    return (
      <AvatarImage
        onClick={this.props.onClick}
        className={this.props.className}
        style={{ ...this.props.style, top: 20, left: -75, marginTop: 0 }}
        diam={51}
        src={leftArrow}
      />
    );
  }
}

class NextArrow extends Component<*, *> {
  render() {
    return (
      <AvatarImage
        onClick={this.props.onClick}
        className={this.props.className}
        style={{ ...this.props.style, top: 20, right: -75, marginTop: 0 }}
        diam={51}
        src={rightArrow}
      />
    );
  }
}

export default ({
  className,
  options,
  children,
}: {
  className: string,
  options: Object,
  children?: Object,
}) => (
  <Slider
    className={className}
    {...{
      prevArrow: PrevArrow,
      nextArrow: NextArrow,
      ...options,
    }}
  >
    {children}
  </Slider>
);
