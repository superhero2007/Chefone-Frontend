// @flow

import React from 'react';
import username from '../../../static/icons/username.svg';
import usernameOrange from '../../../static/icons/username_orange.svg';
import usernameGray from '../../../static/icons/username_gray.svg';

export default ({
  diam,
  src,
  className,
  round,
  style,
  onClick,
  placeholderStroke,
  borderRadius,
}: {
  diam: number | string,
  src: string,
  className?: string,
  round?: boolean,
  style?: Object,
  onClick?: Function,
  placeholderStroke?: string,
  borderRadius?: number,
}) => {
  const iconStyle = { width: diam, height: diam, ...style };

  const map = {
    orange: usernameOrange,
    gray: usernameGray,
  };
  let placeholderIcon = placeholderStroke ? map[placeholderStroke] : username;

  if (borderRadius) {
    iconStyle.borderRadius = borderRadius;
  } else if (round && typeof diam === 'number') {
    iconStyle.borderRadius = diam / 2;
  }

  return (
    <img
      onClick={onClick}
      src={src || placeholderIcon}
      style={{
        ...iconStyle,
      }}
      className={className}
    />
  );
};
