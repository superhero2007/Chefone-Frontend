// @flow

import React from 'react';
export * as fixtures from './fixtures';
import { Link } from 'react-router';
import moment from 'moment';
import { fixedCSSModules } from '../../../utils';
import AvatarImage from '../../UIKit/AvatarImage';
import { Row, Col } from 'react-flexbox-grid';
import styles from './index.module.less';

type OrderT = {
  objectId: string,
  event: {
    chefAvatar: string,
    image1: string,
    title: string,
    city: string,
    country: string,
    chefUser: {
      firstName: string,
      lastName: string,
    },
    eventStart: Date,
  },
};

const OrderElement = fixedCSSModules(styles, {
  allowMultiple: true,
})(
  ({
    objectId: orderId,
    event: {
      chefAvatar,
      image1,
      title,
      city,
      country,
      chefUser: { firstName, lastName },
      eventStart,
    },
  }: OrderT) => {
    const timestamp = moment(eventStart);

    const link = `/dashboard/${orderId}`;

    const date = timestamp.format('MMMM DD, YYYY');
    const time = timestamp.format('HH:mm');

    return (
      <div styleName="card" className="bg-faded">
        <div
          styleName="image-container"
          style={{ backgroundImage: `url(${image1})` }}
        />
        <div styleName="author-info">
          <AvatarImage
            diam={46}
            round={true}
            src={chefAvatar && chefAvatar.replace('http://', 'https://')}
            placeholderStroke="orange"
          />
          <div styleName="author-details">
            <h6 styleName="author-name">{`${firstName} ${lastName}`}</h6>
            <h6 styleName="city">{`${city}, ${country}`}</h6>
          </div>
        </div>
        <div className="card-block col-md-12" styleName="event-info">
          <div styleName="event-details">
            <h5 styleName="title" className="text-muted" itemProp="name">
              {title}
            </h5>
            <div styleName="time-and-date">
              <span styleName="calendar-icon" />
              <span styleName="date" itemProp="date">
                {date}
              </span>
              <span styleName="time" itemProp="time">{`${time} Uhr`}</span>
            </div>
          </div>
          <hr />
          <Link to={link} title={title} styleName="event-link" itemProp="url">
            Event Details
          </Link>
        </div>
      </div>
    );
  },
);

export type PropsT = {
  values: Array<OrderT>,
};

export default ({ values }: PropsT) => (
  <Row between="xs">
    {values &&
      values.map((order, index) => {
        return (
          <Col xs={12} md={4}>
            <OrderElement {...order} key={index} />
          </Col>
        );
      })}
  </Row>
);
