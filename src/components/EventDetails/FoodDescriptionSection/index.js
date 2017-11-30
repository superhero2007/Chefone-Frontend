// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

import TextSeeMore from '../../TextSeeMore';

export type AttendeeT = {
  avatar: string,
  firstName: string,
};

export type PropsT = {
  text: string,
  attendees: Array<AttendeeT>,
};

const ATTENDEES_TITLE = 'Teilnehmer';

export default fixedCSSModules(styles)(({ text, attendees }: PropsT) => (
  <div styleName="component">
    {attendees.length ? (
      <div styleName="attendees-section">
        <h2>{ATTENDEES_TITLE}</h2>
        <div styleName="attendees-list">
          {attendees.map(({ avatar, firstName }) => (
            <div styleName="attendee">
              <div
                styleName="avatar"
                style={
                  avatar
                    ? {
                        backgroundImage: `url(${avatar})`,
                      }
                    : {}
                }
              />
              <div styleName="name">{firstName}</div>
            </div>
          ))}
        </div>
      </div>
    ) : null}
    <div styleName="menu">MENU</div>
    <hr styleName="hr-separator" />
    <TextSeeMore maxHeight={336} styleName="text" seeMoreText="Mehr">
      {text}
    </TextSeeMore>
  </div>
));
