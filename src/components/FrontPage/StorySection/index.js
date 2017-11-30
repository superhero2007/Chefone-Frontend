import React from 'react';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import { Row } from 'react-flexbox-grid';
import image from '../../../../static/youtube-image.jpg';

const TITLE = 'DIE CHEF.ONE STORY';
const YouTube = fixedCSSModules(styles)(() => (
  <div styleName="youtube-embedded">
    <a
      href="https://www.youtube.com/watch?v=a5aFKuUd7zE"
      style={{ backgroundImage: `url(${image})` }}
      target="_blank"
    />
  </div>
));

export default fixedCSSModules(styles)(() => (
  <div>
    <h2 styleName="title">{TITLE}</h2>
    <Row center="xs">
      <YouTube />
    </Row>
  </div>
));
