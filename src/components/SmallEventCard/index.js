//@flow

import React from 'react';

import { fixedCSSModules } from '../../utils';
export * as fixtures from './fixtures';
import styles from './index.module.less';
import { DefaultViewRating } from '../UIKit/Rating';

const ImageWithPriceColumn = fixedCSSModules(styles)(
  ({ price, src }: { price: string, src: string }) => {
    return (
      <div styleName="image-with-price">
        <div
          styleName="image"
          style={{
            backgroundImage: `url(${src})`,
          }}
        />
        <div styleName="price">
          <span>{price}</span>
        </div>
      </div>
    );
  },
);

const TimeColumn = fixedCSSModules(styles)(
  ({ month, date }: { month: string, date: number }) => (
    <div styleName="month-day-column">
      <div styleName="month-day-wrapper">
        <div>
          <span styleName="month-text">{month}</span>
        </div>
        <div>
          <span styleName="day-text">{date}</span>
        </div>
      </div>
    </div>
  ),
);

const ChefColumn = fixedCSSModules(styles)(
  ({ avatar, name, rating }: EventCardChefType) => {
    return (
      <div styleName="chef-column">
        <div styleName="chef-wrapper">
          <div
            styleName="avatar"
            style={
              avatar
                ? {
                    backgroundImage: `url(${avatar})`,
                  }
                : {}
            }
          />
          <div styleName="name">{name}</div>
          <DefaultViewRating value={rating} />
        </div>
      </div>
    );
  },
);

const PEOPLE_ALREADY_BOOKED = (n: number) => {
  if (n === 1) {
    return 'Person nimmt teil';
  }
  return 'Personen nehmen teil';
};

const PlaceDetailsColumn = fixedCSSModules(styles)(
  ({
    title,
    time,
    address,
    numberOfGuestsBooked,
  }: {
    title: *,
    time: *,
    address: *,
    numberOfGuestsBooked: *,
  }) => (
    <div styleName="place-details-column">
      <div styleName="place-details-wrapper">
        <div styleName="title">{title}</div>
        <div styleName="time-location">
          {time} • {address}
        </div>
        {numberOfGuestsBooked !== 0 ? (
          <div className="hide-mobile" styleName="number-of-guests-booked">
            {numberOfGuestsBooked} {PEOPLE_ALREADY_BOOKED(numberOfGuestsBooked)}
          </div>
        ) : null}
      </div>
    </div>
  ),
);

export type EventCardChefType = {
  avatar: string,
  name: string,
  rating: number,
  bio: ?string,
};

export type PropsT = {
  objectId: string,
  price: number,
  currency: string,
  foodImage: string,
  month: string,
  date: number,
  time: string,
  title: string,
  address: string,
  numberOfGuestsBooked: number,
  chef?: EventCardChefType,
};

export default fixedCSSModules(styles)(
  ({
    chef,
    price,
    currency,
    foodImage,
    month,
    date,
    title,
    time,
    address,
    numberOfGuestsBooked,
  }: PropsT) => (
    <div styleName="event-card">
      <ImageWithPriceColumn price={`${price}${currency}`} src={foodImage} />
      <TimeColumn month={month} date={date} />
      <PlaceDetailsColumn
        title={title}
        time={time}
        address={address}
        numberOfGuestsBooked={numberOfGuestsBooked}
      />
      <div className="hide-mobile hide-md">
        {chef && <ChefColumn {...chef} />}
      </div>
    </div>
  ),
);
