// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './less/input-moment.module.less';

export default fixedCSSModules(styles, {
  allowMultiple: true,
})(({ children, onSave }: { children?: any, onSave: Function }) => (
  <div>
    {children}
    <button
      type="button"
      styleName="im-btn btn-save"
      onClick={(e: Object) => {
        e.preventDefault();
        if (onSave) {
          onSave();
        }
      }}
    >
      <i className="fa fa-check" />
      Save
    </button>
  </div>
));
