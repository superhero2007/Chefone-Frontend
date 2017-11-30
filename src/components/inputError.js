import React from 'react';

const errorStyle = {
  textTransform: 'none',
  position: 'relative',
  top: '-10px',
  //Bootstrap error color, TODO: review and abstract
  color: '#a94442',
  textAlign: 'left',
};

export default props => (
  <div style={errorStyle}>
    <span>{props.message}</span>
  </div>
);
