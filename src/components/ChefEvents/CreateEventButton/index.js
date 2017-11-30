// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

export default fixedCSSModules(styles)(({ onClick }: { onClick: Function }) => (
  <div styleName="create-event-button">
    <a onClick={onClick} className="btn btn-success">
      +
    </a>
  </div>
));
