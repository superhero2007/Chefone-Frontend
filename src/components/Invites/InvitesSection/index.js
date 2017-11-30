// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';

import Invite from '../Invite';

import styles from './index.module.less';

const ui = {
  yourInvites: 'Your Invites:',
};

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

export default applyStyles(({ invites }) => (
  <div styleName="send-invite-section">
    <div className={styles['invites-section-header']}>{ui.yourInvites}</div>

    {invites.map((fields, index) => <Invite index={index} {...fields} />)}
  </div>
));
