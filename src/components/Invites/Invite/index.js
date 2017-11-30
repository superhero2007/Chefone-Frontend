// @flow

import React from 'react';
import { fixedCSSModules } from '../../../utils';
import type { InviteProps } from '../types';

import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

export default applyStyles(({ index, id, email, status }: InviteProps) => (
  <div key={`${id} ${index}`}>
    {index === 0 && <div className={styles['splitter']} />}

    <div className={styles['invite']}>
      <div className={styles['email']} title={email}>
        {email}
      </div>

      <div styleName="status">{status}</div>
    </div>

    <div className={styles['splitter']} />
  </div>
));
