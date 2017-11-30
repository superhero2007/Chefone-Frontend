// @flow

import React from 'react';

export default ({
  finalIcon,
  style,
  className,
  onClick,
}: {
  finalIcon: string,
  name?: string,
  style?: Object,
  key?: number,
  styleName?: string,
  className?: string,
  onClick?: Function,
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${finalIcon})`,
        ...style,
      }}
    />
  );
};
