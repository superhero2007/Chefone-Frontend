//@flow

import React, { PropTypes } from 'react';

import { greatPlaceStyle } from './GreatPlaceWithHoverStyles';

const MyGreatPlaceWithStick = ({ zIndex, $hover }) => {
  const style = {
    ...greatPlaceStyle,
    zIndex: $hover ? 1000 : zIndex,
  };

  // const circleStyle = $hover ? greatPlaceCircleStyleHover : greatPlaceCircleStyle;
  // const stickStyle = $hover ? greatPlaceStickStyleHover : greatPlaceStickStyle;

  return (
    <div style={style}>
      <img src={require('../../../../static/icons/place.svg')} />
    </div>
  );
};

// <div style={style}>
//         <div style={greatPlaceStickStyleShadow} />
//         <div style={circleStyle}>
//           {text}
//         </div>
//         <div style={stickStyle} />
//      </div>

MyGreatPlaceWithStick.propTypes = {
  // GoogleMap pass $hover props to hovered components
  // to detect hover it uses internal mechanism, explained in x_distance_hover example
  $hover: PropTypes.bool,
  text: PropTypes.string,
  zIndex: PropTypes.number,
};

MyGreatPlaceWithStick.defaultProps = {};

export default MyGreatPlaceWithStick;
