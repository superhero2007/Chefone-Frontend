// @flow

import React from 'react';
import ChefEvent from './ChefEvent';
import DashboardNavbar from '../DashboardNavbar';
// import CreateEventButton from './CreateEventButton';
import Modal from '../Modal';
import withSimpleState from '../../utils/withSimpleState';
import R from 'ramda';
import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';
import { Row } from 'react-flexbox-grid';

export default R.compose(
  withSimpleState('pendingDeleteEvent', () => null),
  fixedCSSModules(styles),
)(
  ({
    pendingDeleteEvent,
    events,
    onNextClick,
    onEditEvent,
    onDeleteEvent,
  }: {
    pendingDeleteEvent: Object,
    events: Array<any>,
    onEditEvent: Function,
    onDeleteEvent: Function,
    onNextClick: Function,
  }) => {
    return (
      <div styleName="chef-events-container">
        <DashboardNavbar />

        <div styleName="chef-event-list" className=" container">
          {!!pendingDeleteEvent.value && (
            <Modal
              onCloseClick={() => {
                pendingDeleteEvent.onChange(null);
              }}
              className="small-modal"
            >
              <div className="text-center">
                <h1>Are you sure?</h1>
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    await onDeleteEvent(pendingDeleteEvent.value);
                    pendingDeleteEvent.onChange(null);
                  }}
                >
                  Yes, delete this event
                </button>
              </div>
            </Modal>
          )}
          <h1>Meine Events</h1>
          {events &&
            events.map((eventData, i) => (
              <ChefEvent
                key={i}
                {...eventData}
                onDeleteClick={() =>
                  pendingDeleteEvent.onChange(eventData.objectId)
                }
                onEditClick={async () => {
                  await onEditEvent(eventData.objectId);
                }}
              />
            ))}
          {(!events || events.length === 0) && (
            <Row center="xs">
              <div className="row text-center">
                <button
                  onClick={onNextClick}
                  className="btn-success"
                  style={{ padding: 12 }}
                >
                  Erstelle ein Dinner
                </button>
              </div>
            </Row>
          )}
        </div>
        {/* <CreateEventButton onClick={onNextClick} /> */}
      </div>
    );
  },
);
