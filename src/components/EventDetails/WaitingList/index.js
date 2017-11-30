// @flow

export * as fixtures from './fixtures';
import React from 'react';
import { Link } from 'react-router';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import EventCard from '../../SmallEventCard';
import Loader from '../../UIKit/Loader';
import type { PropsT as EventType } from '../../SmallEventCard';
const TITLE = 'Du bist jetzt auf der Warteliste!';

const TEXT = `Wir haben dich jetzt auf die Warteliste gesetzt. Sobald ein neues Dinner online gestellt wird, oder bei deinem gewünschten Dinner ein Platz frei wird, werden wir dich umgehend informieren und zugleich deinen Platz reservieren. Den Betrag ziehen wir dir natürlich erst ab, wenn du uns die erneute Zusage erteilst.

Schau dich doch ruhig noch bei den anderen Events in deiner Stadt um. Wir haben für jeden eine leckere Alternative dabei.`;

const FUTURE_EVENTS = 'WEITERE EVENTS';

export type PropsT = {
  events: Array<EventType>,
  eventsLoading: boolean,
};

export default fixedCSSModules(styles)(({ events, eventsLoading }: PropsT) => {
  return (
    <div styleName="component">
      <div styleName="title">{TITLE}</div>
      <div styleName="text">{TEXT}</div>
      <hr />
      <div styleName="future_events_text">{FUTURE_EVENTS}</div>

      <div styleName="future_events">
        {eventsLoading ? (
          <Loader />
        ) : (
          events.map((event, key) => (
            <div styleName="future_event_wrapper">
              <Link to={`/event/${event.objectId}`} key={key}>
                <EventCard {...event} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
});
