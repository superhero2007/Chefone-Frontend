// @flow

import React from 'react';

const Loader = (props: { type?: string } | null) => {
  const type = props ? props.type : null;
  let className = 'text-center';
  if (type == 'full') {
    className += ' loader-bg';
  }
  return (
    <div className={className}>
      <div className="loader" />
    </div>
  );
};
export default Loader;
