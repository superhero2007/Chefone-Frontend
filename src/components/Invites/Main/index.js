// @flow

export * as fixtures from './fixtures';
import React from 'react';
import TitleSection from '../TitleSection';
import SendInviteSection from '../SendInviteSection';

// import InvitesSection from '../InvitesSection';

import { fixedCSSModules } from '../../../utils';
// import type { Invite } from '../types';
import styles from './index.module.less';

export type PropsT = {
  onEmailsSubmit: Function,
  onCopyLink: Function,
  objectId: string,
};

//  invites: Array<Invite>,

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

export default applyStyles(
  ({ onEmailsSubmit, onCopyLink, objectId }: PropsT) => {
    return (
      <div styleName="invites-container">
        <TitleSection />

        <div styleName="media-container">
          <SendInviteSection
            onEmailsSubmit={onEmailsSubmit}
            onCopyLink={onCopyLink}
            objectId={objectId}
          />
        </div>
      </div>
    );
  },
);

//  <InvitesSection invites={invites} />
