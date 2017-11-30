// @flow

import React from 'react';
import SvgIcon from '../../SvgIcon';
import styles from './index.module.less';
import { fixedCSSModules } from '../../../utils';

export const SuccessFailIcon = fixedCSSModules(styles)(
  ({ value }: { value: boolean }) => (
    <div>
      {value ? (
        <div styleName="success_check">&#x2713;</div>
      ) : (
        <div styleName="fail_check">&#x2014;</div>
      )}
    </div>
  ),
);

export const MessageIcon = fixedCSSModules(styles)(
  ({ onClick }: { onClick: Function }) => (
    <SvgIcon
      onClick={onClick}
      styleName="message"
      finalIcon={require('../../../../static/icons/message-orange.svg')}
    />
  ),
);

export const Modal = fixedCSSModules(styles)(
  ({
    header,
    body,
    onClose,
  }: {
    header: any,
    body: any,
    onClose: Function,
  }) => {
    return (
      <div styleName="modal" onClick={onClose}>
        <div styleName="modal-content" onClick={e => e.stopPropagation()}>
          <div styleName="header">
            <div styleName="cross" onClick={onClose}>
              &#x2715;
            </div>
            {header}
          </div>
          <hr />
          <div>{body}</div>
        </div>
      </div>
    );
  },
);
