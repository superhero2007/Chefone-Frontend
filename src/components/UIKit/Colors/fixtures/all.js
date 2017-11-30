// @flow

import React from 'react';
import styles from './index.module.less';
import { fixedCSSModules } from '../../../../utils';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

import colors from '../';

export default applyStyles(() => {
  return (
    <div styleName="component">
      {Object.keys(colors).map(color => {
        return (
          <div styleName="item">
            <div styleName="color-elem">
              <div styleName={`color-circle ${color}`} />
              <div styleName="color-details">
                <span>{color}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
