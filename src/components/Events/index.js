// @flow

import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import cx from 'classnames';
import { compose, defaultTo } from 'ramda';
import AvatarImage from '../UIKit/AvatarImage';
import SpeechBubble_ from '../SpeechBubble';
import Rating from '../UIKit/Rating';
import { LoaderDecorator } from '../../decorators';
import { Row, Col } from 'react-flexbox-grid';
import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';
import defTheme from './theme.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const OPEN_TABLE = 'Open Table';
const HOUSE_TEXT = 'Jeder kann an diesem Dinner teilnehmen';
const VEGGI_TITLE = 'Vegetarisch';
const VEGGI_TEXT =
  'Dieses Dinner kann auch als Vegetarisch oder Vegan gebucht werden';
const SOLD_OUT = 'Ausgebucht';

const PEOPLE_ALREADY_BOOKED = (n: number) => {
  if (n === 1) {
    return 'Person nimmt teil';
  }
  return 'Personen nehmen teil';
};

export type EventT = {
  objectId: string,
  linkTo: string,
  price: number,
  currency: {
    symbol: string,
  },
  image1: string,
  title: string,
  city: string,
  chef: {
    name: string,
    rating_average: number,
  },
  chefAvatar: string,
  soldOut: boolean,
  servingsSold: number,
  servings: number,
  passed?: boolean,
  vegetarian?: boolean,
  vegan?: boolean,
  eventStart: string,
};

const SpeechBubble = (props: Object) => (
  <SpeechBubble_ {...props} left={19} top={24} />
);

const backImageStyle = (imageUrl: string) => ({
  backgroundImage: `url(${imageUrl})`,
});

const PeopleAmount = applyStyles(({ servingsSold }) => (
  <div styleName="people-amount">
    {servingsSold !== 0 ? (
      `${servingsSold} ${PEOPLE_ALREADY_BOOKED(servingsSold)}`
    ) : (
      <div />
    )}
  </div>
));

const EventDate = applyStyles(({ month, day, theme }) => (
  <div styleName="event-date" className={theme['event-date']}>
    <div styleName="month">{month}</div>
    <div styleName="day">{day}</div>
  </div>
));

const CardBlock = applyStyles(
  ({ day, month, title, time, city, servingsSold, theme }) => (
    <Col
      className={cx('card-block', theme['card-block'])}
      styleName="event-info"
    >
      <Row className={theme['card-row']}>
        <Col xs={3}>
          <EventDate month={month} day={day} theme={theme} />
        </Col>
        <Col
          xs={9}
          styleName="event-details"
          className={theme['event-details']}
        >
          <h5
            styleName="title"
            className={cx('text-muted', theme.title)}
            itemProp="name"
          >
            {title}
          </h5>
          <div styleName="time-and-city" className={theme['time-and-city']}>
            <span itemProp="date">{`${time} Uhr`}</span>
            <span itemProp="city">
              {' '}
              {'\u2022'} {city}
            </span>
          </div>
          <PeopleAmount servingsSold={servingsSold} />
        </Col>
      </Row>
    </Col>
  ),
);

const getTheme = defaultTo(defTheme);

class Event extends Component<*, *> {
  props: EventT & {
    theme?: Object,
  };
  state = {
    showHouse: false,
    showVeggi: false,
  };
  handleVeggiIconMouseOver = e => {
    e.preventDefault();
    this.setState({ showVeggi: true });
  };
  handleVeggiIconMouseOut = e => {
    e.preventDefault();
    this.setState({ showVeggi: false });
  };
  handleHouseIconMouseOver = e => {
    e.preventDefault();
    this.setState({ showHouse: true });
  };
  handleHouseIconMouseOut = e => {
    e.preventDefault();
    this.setState({ showHouse: false });
  };
  makeId = id => {
    let res = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      res += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return res + id;
  };
  render() {
    const {
      linkTo,
      chefAvatar,
      price,
      currency,
      image1,
      title,
      city,
      chef,
      objectId,
      soldOut,
      servings,
      servingsSold,
      eventStart,
      passed,
      vegetarian,
      vegan,
      theme = null,
    } = this.props;

    const generatedId = this.makeId(objectId);
    const seatsLeft = servings - servingsSold;
    const timestamp = moment(eventStart);
    const month = timestamp.format('MMM').toUpperCase();
    const day = timestamp.format('D');
    const time = timestamp.format('ddd HH:mm');
    const themed = getTheme(theme);
    return (
      <Link
        to={linkTo}
        title={title}
        className={themed['events-col-blocks']}
        styleName="events-col-blocks"
        itemProp="url"
      >
        <div className={themed.block}>
          <div styleName="card" className={cx('bg-faded', themed.card)}>
            <div
              className={themed['image-container']}
              styleName="image-container"
              style={backImageStyle(image1)}
            >
              {!passed && seatsLeft > 0 && seatsLeft <= 2 ? (
                <div styleName="seats-left">
                  {`Noch ${seatsLeft} ${seatsLeft === 2 ? 'Plätze' : 'Platz'}`}
                </div>
              ) : null}
              {!passed ? (
                <div styleName="price">
                  <div styleName="price-overlay" />
                  <div styleName="price-text">
                    {soldOut ? <p>{SOLD_OUT}</p> : `${price}${currency.symbol}`}
                  </div>
                </div>
              ) : null}
            </div>
            <div styleName="author-info">
              <AvatarImage
                diam={46}
                round={true}
                src={chefAvatar && chefAvatar.replace('http://', 'https://')}
                placeholderStroke="orange"
              />
              <div styleName="author-details">
                <h6 styleName="author-name">{chef.name}</h6>
                <div styleName="author-rating">
                  <Rating
                    {...{
                      toggledClassName: 'star toggled-star',
                      untoggledClassName: 'star untoggled-star',
                      halfClassName: 'star toggled-star',
                      color: '#CE5100',
                      defaultRating: chef.rating_average,
                      viewOnly: true,
                    }}
                  />
                </div>
              </div>
              <div
                styleName="action-buttons"
                className={themed['action-buttons']}
              >
                <button
                  styleName="house"
                  id={`house-${generatedId}`}
                  onMouseOver={this.handleHouseIconMouseOver}
                  onTouchStart={this.handleHouseIconMouseOver}
                  onMouseOut={this.handleHouseIconMouseOut}
                  onTouchEnd={this.handleHouseIconMouseOut}
                >
                  <SpeechBubble
                    for={`house-${generatedId}`}
                    show={this.state.showHouse}
                    title={OPEN_TABLE}
                    text={HOUSE_TEXT}
                  />
                </button>
                {vegan || vegetarian ? (
                  <button
                    styleName="veggi"
                    id={`veggi-${generatedId}`}
                    onMouseOver={this.handleVeggiIconMouseOver}
                    onTouchStart={this.handleVeggiIconMouseOver}
                    onMouseOut={this.handleVeggiIconMouseOut}
                    onTouchEnd={this.handleVeggiIconMouseOut}
                  >
                    <SpeechBubble
                      for={`veggi-${generatedId}`}
                      show={this.state.showVeggi}
                      title={VEGGI_TITLE}
                      text={VEGGI_TEXT}
                    />
                  </button>
                ) : null}
              </div>
            </div>
            <CardBlock
              day={day}
              month={month}
              title={title}
              time={time}
              city={city}
              servingsSold={servingsSold}
              theme={themed}
            />
          </div>
        </div>
      </Link>
    );
  }
}
export const EventElement = applyStyles(Event);
export type PropsT = {
  events: Array<EventT>,
};
export default compose(
  LoaderDecorator({
    condition: ({ loading }) => !loading,
  }),
  applyStyles,
)((props: PropsT) => (
  <Row start="xs">
    {props.events &&
      props.events.map((event: EventT, index) => {
        return (
          <Col xs={12} sm={4} md={4}>
            <EventElement {...event} key={index} />
          </Col>
        );
      })}
  </Row>
));
