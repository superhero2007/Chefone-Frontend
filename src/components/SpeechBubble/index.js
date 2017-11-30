// @flow

import React, { Component } from 'react';
import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

const PlainSpeechBubble = fixedCSSModules(styles, {
  allowMultiple: true,
})(
  ({
    top,
    left,
    show,
    title,
    text,
    invert,
    height,
  }: {
    top: number,
    left: number,
    show: boolean,
    title: string,
    text: string,
    invert: boolean,
    height: number,
  }) => (
    <div
      styleName={`speech-bubble ${invert ? 'invert' : ''}`}
      style={{ height, top, left, display: show ? 'block' : 'none' }}
    >
      <h6>{title}</h6>
      <p>{text}</p>
    </div>
  ),
);

type Props = {
  for: any,
  left?: number,
  top?: number,
  height?: number,
  text: string,
  title: string,
  show: boolean,
  fixed?: boolean,
};

class SpeechBubble extends Component<*, *> {
  props: Props;
  getRect() {
    const parentButton = document.getElementById(this.props.for);
    if (!parentButton) return {};
    const positionProps = parentButton.getBoundingClientRect();

    const { top, left } = positionProps;

    let height = this.props.height ? this.props.height : 100;
    let newTop = top - height - 40;
    const newLeft = left - 114;

    const invert = newTop < 0;
    if (invert) {
      newTop += height + 60;
    }

    return {
      top: newTop,
      left: newLeft,
      invert,
    };
  }
  render() {
    if (__SERVER__) {
      return null;
    }
    const { top, left, invert } = this.getRect();
    const { show, text, title, height } = this.props;
    if (!top) return null;
    return (
      <PlainSpeechBubble
        {...{ top, left, show, title, text, invert, height }}
      />
    );
  }
}

export default fixedCSSModules(styles)(SpeechBubble);
