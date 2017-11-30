//@flow

import React from 'react';
import { Link } from 'react-router';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

import ChefInfo from '../../ChefInfo';
import SectionHeader from '../SectionHeader';
import EventCard from '../../SmallEventCard';
import type { PropsT as EventType } from '../../SmallEventCard';
import { Row, Col } from 'react-flexbox-grid';

const TitleColumn = fixedCSSModules(styles)(({ title, value }) => (
  <div>
    <SectionHeader value={title} />
    {value}
  </div>
));

const BestEventCard = fixedCSSModules(styles)(
  ({ value }: { value: EventType }) => {
    if (!value) {
      return <div />;
    }
    const { chef, ...eventCard } = value;
    return (
      <Link to={`/event/${eventCard.objectId}`}>
        <div styleName="best-event-card">
          <div styleName="chef-event-row">
            <ChefInfo
              {...{
                ...chef,
                ...eventCard,
              }}
            />
          </div>
          <div styleName="chef-bio-container">
            <div styleName="chef-bio">
              <span className="hide-mobile">
                {chef && chef.bio ? chef.bio.slice(0, 140) : ''}
              </span>
              <span className="hide-desktop">{chef && chef.bio}</span>
              <Link
                to={`/event/${eventCard.objectId}`}
                style={{
                  display: 'inline',
                }}
                className="hide-mobile"
              >
                {' '}
                ...mehr
              </Link>
            </div>
            <Link to={`/event/${eventCard.objectId}`} className="hide-desktop">
              ...mehr
            </Link>
          </div>
          <hr />
          <Link to={`/event/${eventCard.objectId}`}>
            <EventCard {...eventCard} />
          </Link>
        </div>
      </Link>
    );
  },
);
const EVENTS_TITLE = 'KOMMENDE EVENTS';
const BEST_CHEF_TITLE = 'LIMITIERT: 50€ LÖWEN-GUTSCHEIN';
export default fixedCSSModules(styles)(
  ({
    events,
    bestEvent,
  }: {
    events: Array<EventType>,
    bestEvent: EventType,
  }) => {
    return (
      <Row styleName="component">
        <Col xs={12} md={12} lg={6}>
          <TitleColumn
            title={BEST_CHEF_TITLE}
            value={<BestEventCard value={bestEvent} />}
          />
        </Col>
        <Col xs={12} md={12} lg={6}>
          <TitleColumn
            title={EVENTS_TITLE}
            value={
              <div styleName="events-wrapper">
                {events.map((params, key) => (
                  <Link to={`/event/${params.objectId}`} key={key}>
                    <EventCard {...params} />
                  </Link>
                ))}
              </div>
            }
          />
        </Col>
      </Row>
    );
  },
);
