// @flow

//
import React from 'react';
import R from 'ramda';
// import Event from '../components/Event';
import moment from 'moment';
import cx from 'classnames';
import AvatarImage from '../UIKit/AvatarImage';
import './index.less';
import { LoaderDecorator } from '../../decorators';
import withSimpleState from '../../utils/withSimpleState';
import type { Changeble } from '../../utils/withSimpleState';
import Rating from '../UIKit/Rating';
import DashboardNavbar from '../DashboardNavbar';
import { Row, Col } from 'react-flexbox-grid';

const PureBookingDetails = ({
  session,
  order,
  event,
  price,
  attendees,
  messages,
  message,
  createMessage,
}: {
  session: any,
  order: any,
  event: any,
  price: any,
  attendees: any,
  messages: any,
  createMessage: Function,
  message: Changeble<string>,
}) => {
  const sendMessage = () => {
    const isChefMessage = event.chefUserId === session.objectId;
    const chef = isChefMessage ? event.chef : null;

    if (!message.value.trim().length) {
      return;
    }

    createMessage({
      text: message.value,
      orderId: order.objectId,
      userId: session.objectId,
      chefId: chef && chef.objectId,
    });

    message.onChange('');
  };
  return (
    <div className="booking-details row">
      <DashboardNavbar />
      <div className="details-block">
        <div className="container">
          <Row center="xs">
            <Col xs={12} md={6} lg={5} className="image-container">
              <img className="food-image" src={event.foodImage} alt="" />
            </Col>
            <Col xs={12} md={6} lg={7} className="info-block">
              <div className="">
                <table className="info-table">
                  <tr>
                    <td className="table-title">Dein Chef</td>
                    <td className="table-title">Adresse</td>
                  </tr>
                  <tr>
                    <td>{event.chefName}</td>
                    <td>
                      {event.firstName} {event.lastName}
                    </td>
                  </tr>
                  {order.finalized ? (
                    <tr>
                      <td>{event.cityName}</td>
                      <td>Phone: +{event.phone}</td>
                    </tr>
                  ) : null}
                  <tr>
                    <td className="rating">
                      <Rating
                        {...{
                          toggledClassName: 'fa fa-heart fa-2x',
                          untoggledClassName: 'fa fa-heart-o fa-2x',
                          halfClassName: 'fa fa-heart fa-2x',
                          color: '#CE5100',
                          defaultRating: event.rating,
                          viewOnly: true,
                        }}
                      />
                    </td>
                    {order.finalized ? <td>{event.address}</td> : null}
                  </tr>
                </table>
                <hr />
                <table className="info-table">
                  <tr>
                    <td className="table-title">Dein dinner</td>
                    <td className="table-title" />
                  </tr>
                  <tr>
                    <td>Dinner</td>
                    <td>{event.title}</td>
                  </tr>
                  <tr>
                    <td>Datum</td>
                    <td>{moment(event.eventStart).format('DD MMMM YYYY')}</td>
                  </tr>
                  <tr>
                    <td>Uhrzeit</td>
                    <td>{event.time} Uhr</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>
                      {price} {event.currency && event.currency.symbol}
                    </td>
                  </tr>
                </table>
                <hr />
                <table className="info-table">
                  <tr>
                    <td className="table-title">Weitere Gäste</td>
                    <td className="table-title" />
                  </tr>
                  <tr>
                    <td colSpan="2" className="attendees-block">
                      <div className="center-block">
                        {attendees.map((attendee, index) => (
                          <div className="attendee" key={index}>
                            <AvatarImage
                              placeholderStroke="orange"
                              src={attendee.avatar}
                              diam={65}
                              className="img-circle"
                            />
                            <p>{attendee.firstName}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <h1>Nachrichten</h1>
      <div className="container messages-block">
        <div className="messages">
          {event.chefUserId &&
            messages.map((msg, index) => {
              let formattedDate = moment(msg.date).format(
                'DD MMMM YYYY | HH:mm',
              );
              let chefMessage = msg.user.objectId == event.chefUserId;
              return (
                <Row center="xs" key={index} className="message">
                  {chefMessage ? (
                    <Col xs={0} md={2}>
                      <div className="sender">
                        <AvatarImage
                          placeholderStroke="orange"
                          src={msg.user.avatar}
                          diam={65}
                          className="img-circle"
                        />
                        <p>{msg.user.name}</p>
                      </div>
                    </Col>
                  ) : null}
                  <Col md={10}>
                    <div
                      className={cx('message-text', {
                        'chef-message': chefMessage,
                      })}
                    >
                      {msg.text}
                    </div>
                    <div className="message-date">{formattedDate} Uhr </div>
                  </Col>
                  {!chefMessage ? (
                    <Col xs={0} md={2}>
                      <div className="sender">
                        <AvatarImage
                          placeholderStroke="gray"
                          src={msg.user.avatar}
                          diam={65}
                          className="img-circle"
                        />
                        <p>{msg.user.name}</p>
                      </div>
                    </Col>
                  ) : null}
                </Row>
              );
            })}
        </div>
        <div className="message-input">
          <span
            className="right-arrow"
            style={{
              backgroundImage: 'url(../../static/icons/right_arrow.svg)',
            }}
            onClick={sendMessage}
          />
          <textarea placeholder="deine Nachricht" rows="2" {...message} />
        </div>
      </div>
    </div>
  );
};
export default R.compose(
  withSimpleState('message', () => ''),
  LoaderDecorator({
    condition: ({ loading }) => !loading,
    isOnlyLoader: true,
  }),
)(PureBookingDetails);
