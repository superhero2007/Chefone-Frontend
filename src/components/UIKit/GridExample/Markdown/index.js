//@flow

import React from 'react';
import style from './style.module.less';

export default (props: { html: * }) => {
  const className = style.markdown;
  const html = {
    __html: props.html,
  };

  return <article className={className} dangerouslySetInnerHTML={html} />;
};
