// @flow

import React from 'react';
import TextSeeMore from '../../TextSeeMore';
import StatusButton from './StatusButton';
import { Link } from 'react-router';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import { Row, Col } from 'react-flexbox-grid';

export default fixedCSSModules(styles)(
  ({
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
  }: {
    hasOrders: boolean,
    active: boolean,
    objectId: string,
    status: string,
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
  }) => (
    <div styleName="chef-event">
      <Row center="xs">
        <Col md={6} lg={4} xs={12}>
          <Link to={`event/${objectId}`}>
            <img src={image} alt="" />
          </Link>
        </Col>
        <Col md={6} lg={8} xs={12} styleName="chef-event-info">
          <Row>
            <Link to={`event/${objectId}`}>
              <h3 className="col-md-8 col-xs-6 text-left">{title}</h3>
            </Link>
            <p
              styleName="chef-event-date"
              className="col-md-4 col-xs-6 text-right"
            >
              {date}
            </p>
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
          <Row styleName="btn-row" className="row ">
            <div className="col-md-8 col-xs-8">
              <StatusButton value={status} />
            </div>
            <div className="col-md-4 col-xs-4">
              {!active &&
                onDeleteClick && (
                  <a styleName="remove-event-btn" onClick={onDeleteClick} />
                )}
              {!active &&
                !hasOrders &&
                onEditClick && (
                  <a styleName="edit-event-btn" onClick={onEditClick} />
                )}
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  ),
);
