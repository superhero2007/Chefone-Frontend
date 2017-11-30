// @flow

import React from 'react';
import '../../../styles/index.less';
import './index.less';

const SCREEN_SM = 576;

export default ({
  price,
  currency,
  style,
}: {
  price: number,
  currency: Object,
  style?: Object,
}) => {
  const numberOfDigits = price.toString().length;
  let fontSize = 27;

  if (window.innerWidth < SCREEN_SM) {
    fontSize = 27;
  }

  if (numberOfDigits > 2) {
    fontSize -= numberOfDigits;
  }

  return (
    <div className="row row-event text-center">
      <div className="event-price" style={style}>
        <span
          className="event-price-text"
          style={{ fontSize }}
          itemProp="price"
        >
          {currency.symbol}&nbsp;{price}
        </span>
      </div>
    </div>
  );
};
