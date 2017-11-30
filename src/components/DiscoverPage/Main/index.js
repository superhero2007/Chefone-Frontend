// @flow

import React from 'react';

export * as fixtures from './fixtures';

import Events from '../../Events';

import Loader from '../../UIKit/Loader';
import TextWithBackground from '../../TextWithBackground';
import NewsletterSignUp from '../NewsletterSignUp';

import { Row, Col } from 'react-flexbox-grid';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import { Link } from 'react-router';

export type PropsT = {
  signupMailchimp: Function,
  eventsLoading: boolean,
  events: Array<any>,
  canLoadMore: boolean,
  getMoreEvents: Function,
  passedEvents: Array<any>,
  passedEventsLoading: boolean,
  cityName: string,
  bg: string,
};

export default fixedCSSModules(styles, { allowMultiple: true })(
  class extends React.Component<*, *> {
    props: PropsT;
    render() {
      const {
        signupMailchimp,
        events,
        eventsLoading,
        canLoadMore,
        passedEvents,
        passedEventsLoading,
        cityName,
        bg,
      } = this.props;
      const shallRenderEvents = events.length || eventsLoading || null;

      return (
        <div styleName="container">
          <TextWithBackground bg={bg} withMapLabel>
            <span styleName="city-name">{cityName}</span>
          </TextWithBackground>

          <div styleName="content" className="container">
            {shallRenderEvents && (
              <h2
                styleName="section-header"
                className="text-center text-uppercase text-muted section-header"
              >
                Aktuelle Dinner
              </h2>
            )}
            {!shallRenderEvents && (
              <div styleName="without-events">
                <h1>HEY!</h1>
                <p>
                  Hast du Lust, selbst mal ein Event anzubieten? Du musst dafür
                  kein Profi-Koch sein - egal ob easy Pasta, ein klassisches
                  Schnitzelgericht oder ein einfacher Cocktailabend - bei uns
                  kann jeder weltoffene Mensch Gastgeber werden. Das Tolle
                  daran: Du empfängst fremde Menschen und lässt sie als Freunde
                  wieder gehen! Wir freuen uns auf dich!
                </p>
                <Link to="landing-chefs">
                  <button styleName="more-info">Mehr infos</button>
                </Link>
                <hr />
              </div>
            )}
            {shallRenderEvents && <Events events={events} />}
            {shallRenderEvents && (
              <Row center="xs">
                <Col styleName="more-btn-wrapper">
                  {canLoadMore ? (
                    <button
                      onClick={this.props.getMoreEvents}
                      styleName="more-btn"
                    >
                      Mehr
                      <span>&gt;</span>
                    </button>
                  ) : (
                    <Loader />
                  )}
                </Col>
              </Row>
            )}
            {shallRenderEvents && <hr />}
            <h2
              styleName="section-header"
              className="text-center text-uppercase text-muted section-header"
            >
              Frühere Dinner
            </h2>
            <Events
              events={passedEvents}
              loading={passedEventsLoading}
              passed
            />
            <hr styleName="newsletter-separator" />
            <NewsletterSignUp onSubmit={signupMailchimp} />
          </div>
        </div>
      );
    }
  }
);
