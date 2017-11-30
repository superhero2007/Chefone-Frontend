import React from 'react';
import './index.less';
import WizardFooter from '../WizardFooter';

export default ({
  style,
  className,
  styleName,
  children,
  ...rest
}: {
  style: Object,
  className: string,
  styleName: string,
  children: any,
  rest: any,
}) => {
  return (
    <div
      className={`footer-wizard-layout ${className}`}
      styleName={styleName}
      style={style}
    >
      {children}
      <div style={{ height: 40 }} />
      <WizardFooter {...rest} />
    </div>
  );
};
