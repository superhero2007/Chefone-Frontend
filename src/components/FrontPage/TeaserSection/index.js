// @flow

import React from 'react';

import SectionHeader from '../SectionHeader';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

export default fixedCSSModules(styles)(() => (
  <div styleName="video-container">
    <SectionHeader value="Die Story von CHEF.ONE" />

    <iframe
      src="https://www.youtube.com/embed/a5aFKuUd7zE?rel=0&amp;controls=0&amp;showinfo=0"
      frameBorder="0"
      styleName="video"
      allowFullScreen
    />
  </div>
));
