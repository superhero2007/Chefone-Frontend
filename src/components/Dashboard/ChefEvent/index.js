// @flow

import React from 'react';
export * as fixtures from './fixtures';
import TextSeeMore from '../../TextSeeMore';
import StatusButton, { statusMap } from './StatusButton';
import { Link } from 'react-router';

import { Row, Col } from 'react-flexbox-grid';

export type PropsT = {
  hasOrders: boolean,
  active: boolean,
  objectId: string,
  status: $Keys<typeof statusMap>,
  image: string,
  title: string,
  date: string,
  address: string,
  time: string,
  description: string,
  attendeesNum: number,
  attendeesMax: number,
  currencySymbol: string,
  price: string,
  onEditClick: Function,
  onDeleteClick: Function,
};

export default ({
  hasOrders,
  active,
  objectId,
  status,
  image,
  title,
  date,
  address,
  time,
  description,
  attendeesNum,
  attendeesMax,
  currencySymbol,
  price,
  onEditClick,
  onDeleteClick,
}: PropsT) => (
  <div className="chef-event">
    <Row>
      <Col xs={4} md={4} lg={4}>
        <Link to={`event/${objectId}`}>
          <img
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        </Link>
      </Col>
      <Col md={8} lg={8} xs={8} className="chef-event-info">
        <Row>
          <Col md={8} xs={6}>
            <Link to={`event/${objectId}`}>
              <h3 className="text-left">{title}</h3>
            </Link>
          </Col>
          <Col md={4} xs={6}>
            <p className="text-right chef-event-date">{date}</p>
          </Col>
        </Row>
        <Row>
          <p className="col-md-8 col-xs-6 text-left">{address}</p>
          <p className="col-md-4 col-xs-6 text-right">{time}</p>
        </Row>
        <hr />
        <TextSeeMore>{description}</TextSeeMore>
        <hr />
        <Row>
          <p className="col-md-6 col-xs-6 text-left">Gäste</p>
          <p className="col-md-6 col-xs-6 text-right">
            {attendeesNum ? attendeesNum : 0}/{attendeesMax}
          </p>
        </Row>
        <Row>
          <p className="col-md-6 col-xs-6 text-left">Preis</p>
          <p className="col-md-6 col-xs-6 text-right">
            {currencySymbol}
            {price}
          </p>
        </Row>
        <hr />
        <Row>
          <Col md={8} xs={8}>
            <StatusButton value={status} />
          </Col>
          <Col md={4} xs={4}>
            {!active &&
              onDeleteClick && (
                <a className="remove-event-btn" onClick={onDeleteClick} />
              )}
            {!active &&
              !hasOrders &&
              onEditClick && (
                <a className="edit-event-btn" onClick={onEditClick} />
              )}
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);
