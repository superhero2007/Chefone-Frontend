// @flow

import React from 'react';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const ui = {
  title: {
    top: 'TEILE DEINE LIEBE ZUM ESSEN!',
    sub:
      'Schenke deinen Freunden 15€ für ihr nächstes Dinner. Du kriegst 15€, wenn sie ihren Gutschein einlösen und nochmal 100€, wenn deine Freunde selber ein Dinner anbieten.',
  },
};

export default applyStyles(() => (
  <div styleName="component">
    <div styleName="container-row">
      <div styleName="title">
        <div styleName="top">{ui.title.top}</div>
        <div styleName="sub">{ui.title.sub}</div>
      </div>
    </div>
  </div>
));
