// @flow

import React from 'react';
import './index.less';

import { Row, Col } from 'react-flexbox-grid';

import SectionHeader from '../FrontPage/SectionHeader';
import editOrangeSvg from '../../../static/icons/edit_orange.svg';
import bookOrangeSvg from '../../../static/icons/icon_book_orange.svg';
import chefSvg from '../../../static/icons/icon_chef.svg';

const TITLE = 'Was ist chef.one?';

export default () => (
  <div className="how-it-works-container">
    <Row center="xs">
      <Col>
        <SectionHeader value={TITLE} />
      </Col>
    </Row>

    <Row className="how-it-works">
      <Col md={4} xs={12}>
        <img src={editOrangeSvg} className="center-block" />
        <h4 className="text-center text-uppercase">sign in</h4>
        <p className="text-muted">
          Wir von CHEF.ONE bringen euch und andere interessante Menschen an
          einem Esstisch Zuhause bei den besten Köchen eurer Stadt zusammen.
        </p>
      </Col>
      <Col md={4} xs={12}>
        <img src={bookOrangeSvg} className="center-block" />
        <h4 className="text-center text-uppercase">book</h4>
        <p className="text-muted">
          Mit einer Vorliebe für gutes gemeinsames Essen lasst ihr euch als Gast
          in den eigenen vier Wänden des Gastgebers verwöhnen.
        </p>
      </Col>
      <Col md={4} xs={12}>
        <img src={chefSvg} className="center-block" />
        <h4 className="text-center text-uppercase">or cook</h4>
        <p className="text-muted">
          Werdet selbst Gastgeber. Jeder passionierte (Hobby-) Koch kann
          teilnehmen. Die kulinarische Gestaltungsfreiheit liegt vollkommen bei
          euch.
        </p>
      </Col>
    </Row>
  </div>
);
