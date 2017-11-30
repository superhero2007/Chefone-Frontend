import React from 'react';
import './index.less';

export default ({ children, className, ...props }) => (
  <div className={`my-card ${className}`} {...props}>
    {children}
  </div>
);
