// @flow

import React from 'react';
import styleGlobals from '../../../config/styles';

const colors = {
  green: styleGlobals.BRAND_GREEN,
  orange: styleGlobals.BRAND_PRIMARY,
};

export default (props: Object) => {
  const size = 60;
  const defaultStyle = {
    display: 'inline-block',
    margin: '0 0.7rem',
    width: size + 'px',
    height: size + 'px',
    borderRadius: '50%',
  };
  const textStyle = {
    lineHeight: size + 'px',
    fontSize: size / 3 + 'px',
  };
  let color = props.mode ? colors[props.color] : colors.orange;
  const modes = {
    outline: {
      border: '1px solid ' + color,
      color: color,
    },
    fill: {
      backgroundColor: color,
      color: 'white',
    },
  };
  let circleStyle = {
    ...defaultStyle,
    ...props.style,
    ...(props.mode ? modes[props.mode] : modes.fill),
  };
  return (
    <div style={circleStyle} onClick={props.onClick}>
      <span className="no-selection" style={textStyle}>
        {props.text}
      </span>
    </div>
  );
};
