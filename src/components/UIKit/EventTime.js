import React from 'react';
import moment from 'moment';

export default ({ eventStart, ...props }) => {
  const dateStart = moment(eventStart).format('DD.MMM YYYY');
  const timeStart = moment(eventStart).format('HH:mm');

  return (
    <time style={{ color: '#666' }} {...props} date={dateStart} itemProp="date">
      {`${dateStart} | ${timeStart} Uhr`}
    </time>
  );
};
