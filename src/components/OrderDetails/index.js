// @flow

import React from 'react';
import R from 'ramda';
import moment from 'moment';
import { fixedCSSModules } from '../../utils';
import { GMapCenteredOnPlace } from '../UIKit/GMap';
import { Row, Col } from 'react-flexbox-grid';

import styles from './index.module.less';

const InfoRow = R.compose(fixedCSSModules(styles))(({ title, details }) => (
  <Row styleName="info-row">
    <div styleName="title" xs={6} md={4}>
      {title}
    </div>
    <div styleName="details" xs={6} md={8}>
      {details}
    </div>
  </Row>
));

export default R.compose(fixedCSSModules(styles))(({ order }: *) => {
  const orderDate = moment(order.date);
  const date = orderDate && orderDate.format('MMM DD. YYYY');
  const time =
    orderDate &&
    orderDate.format('HH:mm') +
      orderDate.add(3, 'hours').format(' - HH:mm ') +
      'Uhr';
  const chef = order.event.chefUser;
  const avatar = chef.avatar && chef.avatar.url;

  const guestsStr = order.amount === 1 ? 'Gast' : 'Gäste';
  const priceStr = `${order.event.currencySymbol}${order.foodPriceTotal /
    order.amount} x ${order.amount} ${guestsStr}`;
  const currencySymbol = order.event.currencySymbol;

  return (
    <div styleName="order-details-container">
      <div className="container">
        <h1>{order.event.title}</h1>
        <Row>
          <Col xs={12} md={7}>
            <div styleName="info-section">
              <div
                styleName="image"
                style={{ backgroundImage: `url("${order.event.image}")` }}
              />
              <div styleName="details-section">
                <InfoRow title="Teilnehmer" details={order.amount} />
                <InfoRow title="Datum" details={date} />
                <InfoRow title="Uhrzeit" details={time} />
                <InfoRow
                  title="Adresse"
                  details={order.event.locationAddress}
                />
                <InfoRow
                  title="Details"
                  details={order.event.locationDetails}
                />
                <Row styleName="payment-row">
                  <Col xs={4} styleName="title">
                    Bezahlung
                  </Col>
                  <Col xs={8}>
                    <Row>
                      <Col xs={8} styleName="details">
                        {priceStr}
                      </Col>
                      <Col xs={4} styleName="details">
                        {`${currencySymbol}${order.foodPriceTotal}`}
                      </Col>
                    </Row>
                    {order.discountPrice ? (
                      <Row>
                        <Col xs={8} styleName="details">
                          Gutschein
                        </Col>
                        <Col xs={4} styleName="details">
                          {`-${currencySymbol}${order.discountPrice}`}
                        </Col>
                      </Row>
                    ) : null}
                    <Row styleName="total-row">
                      <Col xs={8} styleName="details">
                        Gesamt
                      </Col>
                      <Col xs={4} styleName="details">
                        {`${currencySymbol}${order.foodPriceTotal}`}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col xs={12} md={5}>
            <div styleName="author-section">
              <div
                styleName="chef-avatar"
                style={
                  avatar
                    ? {
                        backgroundImage: `url(${avatar})`,
                      }
                    : {}
                }
              />
              <div styleName="chef-name">
                {`${chef.firstName} ${chef.lastName}`}
              </div>
              <div styleName="chef-phone">{`+${chef.phone}`}</div>
              <a href={`tel:+${chef.phone}`} styleName="btn">
                Kontaktieren
              </a>
            </div>
            <div styleName="map-section">
              <GMapCenteredOnPlace
                zoom={13}
                placeCoords={order.event.location}
              />
            </div>
          </Col>
        </Row>
        <div className="container">
          <Row>
            <Col xs={12} md={7} styleName="contact-section">
              <Row>
                <Col xs={12} md={6} styleName="contact">
                  Fragen?{' '}
                  <a href="https://chefone.zendesk.com/hc/">Kontaktiere uns</a>
                </Col>
                <Col xs={12} md={6} styleName="book">
                  <a href="https://chefone.zendesk.com/hc/de/requests/new">
                    Buchung stonieren?
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
});
