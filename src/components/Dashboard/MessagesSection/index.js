// @flow

import React from 'react';
export * as fixtures from './fixtures';
import cx from 'classnames';
import { Link } from 'react-router';
import moment from 'moment';
import { fixedCSSModules } from '../../../utils';

import styles from './index.module.less';

type OrderT = {
  date: Date,
  isNew: boolean,
  objectId: string,
  chefAvatar: string,
  chefName: string,
  city: {
    city: string,
  },
  foodDescription: string,
};

export type PropsT = {
  values: Array<OrderT>,
};

export default fixedCSSModules(styles, {
  allowMultiple: true,
})(({ values }: PropsT) => {
  return (
    <div className={styles['messages-section']}>
      <h2>Messages</h2>
      <div className={styles['messages-container']}>
        {values.map((order, key) => {
          const {
            date,
            isNew,
            objectId,
            chefAvatar,
            chefName,
            city: { city },
            foodDescription,
          } = order;
          const formattedDate = moment(date).format('DD MMM');
          return (
            <Link key={key} to={`/booking-details/${objectId}`}>
              <div
                className={cx('row', styles['message'], {
                  [styles['new']]: isNew,
                })}
              >
                <div className="col-md-4 col-sm-4">
                  <div
                    className={styles['chef-avatar']}
                    style={{ backgroundImage: `url('${chefAvatar}')` }}
                  />
                  <div className={styles['chef-details']}>
                    <div className={styles['chef-name']}>{chefName}</div>
                    <div className={styles['city']}>{city}</div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-5 hide-mobile">
                  <div className={styles['order-description']}>
                    {foodDescription}
                  </div>
                </div>
                <div className="col-md-2 col-sm-3">
                  <div className={styles['order-date']}>{formattedDate}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Link className={styles['inbox-link']} to="/inbox">
        View All Messages
      </Link>
    </div>
  );
});
