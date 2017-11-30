// @flow

import React from 'react';
import '../../../styles/index.less';
import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';
import Events from '../Events';

const OTHER_EVENTS_TITLE = 'Das könnte dir auch schmecken';
export default fixedCSSModules(styles)(
  ({
    onShowMoreClick,
    events,
  }: {
    onShowMoreClick: Function,
    events: Array<*>,
  }) => (
    <div className="row">
      <h2 styleName="other-events-title">{OTHER_EVENTS_TITLE}</h2>
      <Events events={events} />
      <div className="row">
        <div styleName="show-more-wrapper">
          <button styleName="show-more" onClick={onShowMoreClick}>
            Mehr
          </button>
        </div>
      </div>
    </div>
  ),
);
