// @flow

import React from 'react';
// import { Link } from 'react-router';
export * as fixtures from './fixtures';
import R from 'ramda';
import OrdersSection from '../OrdersSection';
import ReviewsSection from '../ReviewsSection';
import MessagesSection from '../MessagesSection';
import DiscountsSection from '../DiscountsSection';
import Loader from '../../UIKit/Loader';
import { fixedCSSModules } from '../../../utils';
import withSimpleState from '../../../utils/withSimpleState';
import { Row, Col } from 'react-flexbox-grid';

import styles from './index.module.less';

export type PropsT = {
  onCopy: Function,
  onReviewIntentClick: Function,
  orders: Array<any>,
  ordersLoading: boolean,
  recentOrders: Array<any>,
  recentOrdersLoading: boolean,
  discounts: Array<any>,
  discountsLoading: boolean,
  reviews: Array<any>,
  reviewsLoading: boolean,
};

type InnerPropsT = {
  showFriendsSection?: Object,
} & PropsT;

const Section = fixedCSSModules(styles)(
  ({
    loading,
    props,
    title,
    Component,
  }: {
    loading: boolean,
    props: {
      values: Array<any>,
    },
    Component: any,
    title?: string,
  }) => (
    <div>
      {props.values.length ? (
        <div>
          {title && (
            <h1 styleName="section-header">
              {title} ({props.values.length})
            </h1>
          )}
          <Component {...props} />
        </div>
      ) : null}
      {loading && <Loader />}
    </div>
  ),
);

export default R.compose(
  withSimpleState('showFriendsSection', () => true),
  fixedCSSModules(styles),
)(
  ({
    onCopy,
    onReviewIntentClick,
    orders,
    ordersLoading,
    discounts,
    discountsLoading,
    recentOrders,
    recentOrdersLoading,
    reviews,
    reviewsLoading,
  }: InnerPropsT) => {
    const reviewsElem = (
      <Section
        props={{
          values: reviews,
          onReviewIntentClick,
        }}
        loading={reviewsLoading}
        Component={ReviewsSection}
        title="Reviews"
      />
    );

    const ordersElem = (
      <Section
        props={{ values: orders }}
        loading={ordersLoading}
        Component={OrdersSection}
        title="Deine Events"
      />
    );

    const InviteDiscountElem = (
      <Section
        props={{ values: discounts, onCopy }}
        loading={discountsLoading}
        Component={DiscountsSection}
        title="Dein Gutschein"
      />
    );

    const messagesSectionElem = (
      <Section
        props={{ values: recentOrders }}
        loading={recentOrdersLoading}
        Component={MessagesSection}
      />
    );
    return (
      <div styleName="chef-events-container">
        {/* <div styleName="invite-friends-row">
          <div className="container">
            <div styleName="present-icon" />
            <div styleName="text">
              <h2>Jetzt Freunde werben und Prämien sichern!</h2>
              <h3>CHEF.ONE empfehlen und bis zu 100 € erhalten.</h3>
            </div>
            <Link to="/invites">
              <button>Freunde Einladen</button>
            </Link>
          </div>
        </div> */}
        <div className="container hide-desktop">
          <Row>
            <Col xs={12}>{InviteDiscountElem}</Col>
            <Col xs={12}>{ordersElem}</Col>
          </Row>
          <Row>
            <Col xs={12}>{messagesSectionElem}</Col>
          </Row>
          <Row>
            <Col xs={12}>{reviewsElem}</Col>
          </Row>
        </div>

        <div className="container">
          <div styleName="tips">
            <h2>Tips für gute Events</h2>
            <ul styleName="tips-list">
              <li>
                <span styleName="name">Prüfe Reviews</span>
                <span styleName="text">
                  Schau dir Bewertungen von anderen Gästen an.
                </span>
              </li>
              <li>
                <span styleName="name">
                  Hinterlasse deinem Gastgeber eine Bewertung
                </span>
                <span styleName="text">
                  Lass anderen Gäste von deiner Erfahrung teilhaben.
                </span>
              </li>
            </ul>
            <hr />
            <Row className="row">
              <Col xs={12} className="hide-mobile">
                {messagesSectionElem}
              </Col>
            </Row>
          </div>
          <Row className="row">
            <Col xs={12} className="hide-mobile">
              {InviteDiscountElem}
            </Col>
            <Col xs={12} className="hide-mobile">
              {ordersElem}
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="hide-mobile">
              {reviewsElem}
            </Col>
          </Row>
        </div>
      </div>
    );
  },
);

{
  /* <div className={cx(styles['invite-friends-row'], {'hidden': !showFriendsSection.value})}>
        <a href="#" onClick={()=>showFriendsSection.onChange(false)} className={styles['close-btn']}>X</a>
        <div className="container">
          <div className={styles['present-icon']}></div>
          <div className={styles['text']}>
            <h2>Jetzt Freunde werben und Prämien sichern!</h2>
            <h3>CHEF.ONE empfehlen und bis zu 100 € erhalten.</h3>
          </div>
          <button>Freunde Einladen</button>
        </div>
      </div> */
}
