// @flow

import React from 'react';
import { Link } from 'react-router';
import SectionHeader from '../SectionHeader';
import Button from '../../UIKit/Button';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import { Row, Col } from 'react-flexbox-grid';

const BUTTON_TEXT = 'Jetzt Gastgeber werden';

import image1 from '../../../../static/articles/Image1.jpg';
import image2 from '../../../../static/articles/Image2.jpg';
import image3 from '../../../../static/articles/Image3.jpg';

const ChefStory = fixedCSSModules(styles)(
  ({
    to,
    src,
    title,
    name,
    className,
  }: {
    to: string,
    src: string,
    title: string,
    name: string,
    className?: string,
  }) => (
    <Link to={to} className={className} target="_blank" styleName="card">
      <div
        styleName="avatar"
        style={{
          backgroundImage: `url(${src})`,
        }}
      />
      <p styleName="article-author">{name}</p>
      <p styleName="article-title">{title}</p>
    </Link>
  ),
);

const MICHAEL_TITLE =
  'Was für unseren CHEF.ONE-Koch gutes Essen in geselliger Atmosphäre bedeutet – Michael aus Hamburg im Portrait';
const MARC_TITLE =
  'In der Mission “Social Dining” haben wir die einen oder anderen “dinner with strangers” kreiert und haben glückliche Gesichter sowohl bei den Gästen als auch bei dem Team selbst gezaubert.';
const JENS_TITLE =
  'Koch, Fußballprofi und ein Heiratsantrag mit einer Stunde Verzögerung!';
const TITLE = 'Chef geschichten. In ihren worten.';
export default fixedCSSModules(styles)(({ goToLandingChefs }) => (
  <div styleName="component">
    <SectionHeader value={TITLE} />
    <Row center="xs">
      <Col md={4} xs={12}>
        <ChefStory
          to="https://blog.chef.one/2016/10/06/chefone-koch-michael-portrait/"
          src={image1}
          title={MICHAEL_TITLE}
          name="Michael"
        />
      </Col>
      <Col md={4} xs={12}>
        <ChefStory
          to="https://blog.chef.one/2016/02/29/social-dining-in-hamburg/"
          src={image2}
          title={MARC_TITLE}
          name="Marc"
        />
      </Col>
      <Col md={4} xs={12}>
        <ChefStory
          styleName="chef-3"
          to="https://blog.chef.one/2017/05/22/koch-fusballprofi-und-heiratsantrag/"
          src={image3}
          title={JENS_TITLE}
          name="Gabrijel"
        />
      </Col>
    </Row>
    <Row center="xs" styleName="chef-button-row">
      <Col>
        <Button
          mode="turquoise"
          styleName="chef-button"
          onClick={goToLandingChefs}
          text={BUTTON_TEXT}
        />
      </Col>
    </Row>
  </div>
));
