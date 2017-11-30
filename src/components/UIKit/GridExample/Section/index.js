//@flow

import React from 'react';
import style from './style.module.less';

export default (props: {
  title: string,
  description: string,
  children?: *,
}) => {
  return (
    <section className={style.section}>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      {props.children}
    </section>
  );
};
