//@flow

import React from 'react';

import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

export default fixedCSSModules(styles)(
  class TextWithBackground extends React.Component<*, *> {
    render() {
      const { withMapLabel, bg, children, theme = {} } = this.props;
      return (
        <div
          styleName="text-with-bg-container"
          className={theme['text-with-bg-container']}
          style={{ backgroundImage: 'url(' + bg + ')' }}
        >
          {withMapLabel ? <div styleName="map-label" /> : null}
          <h2 className="center-block text-center text-uppercase">
            {children}
          </h2>
        </div>
      );
    }
  },
);
