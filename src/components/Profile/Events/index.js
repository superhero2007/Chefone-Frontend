// @flow

import React from 'react';
import { defaultTo, pipe, take, map, addIndex } from 'ramda';

import type { PropsT as EventsProps, EventT as EventProps } from '../../Events';
import { EventElement } from '../../Events';
import { fixedCSSModules } from '../../../utils';

import styles from './index.module.less';
import theme from './theme.module.less';

const attended = 'Besuchte Events',
  offered = 'Angebotene Events';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const mapEvents = (event: EventProps, index: number) => (
  <EventElement key={`${event.title} ${index}`} {...event} theme={theme} />
);

//$FlowIssue
const renderEvents = pipe(defaultTo([]), take(3), addIndex(map)(mapEvents));

const EventsRow = (header: string) =>
  applyStyles(({ events }: EventsProps) => (
    <div styleName="container">
      <div styleName="header">{header}</div>
      <div styleName="events">{renderEvents(events)}</div>
    </div>
  ));

export const EventsAttended = EventsRow(attended);

export const EventsOffered = EventsRow(offered);

export default EventsRow;
