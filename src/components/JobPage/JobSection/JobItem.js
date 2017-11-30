// @flow

import React from 'react';
import { Link } from 'react-router';
import { fixedCSSModules } from '../../../utils';
import styles from '../index.module.less';

// TODO: Why <Link /> component is not linking correctly, when I refresh it works ok? @lapanoid

type PropsT = { objectId: string, jobItem: Object };

export default fixedCSSModules(styles)(({ objectId, jobItem }: PropsT) => {
  return (
    <li key={objectId}>
      <Link to={`/jobs/${objectId}`}>{jobItem.jobTitle}</Link>
    </li>
  );
});
