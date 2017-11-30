// @flow

import React from 'react';

import SectionHeader from '../SectionHeader';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import { Row, Col } from 'react-flexbox-grid';

export type CityType = {
  image: string,
  name: string,
};

const CityLink = fixedCSSModules(styles)(
  ({ name, onClick }: { image: string, name: string, onClick: Function }) => (
    <div styleName="city-link" onClick={onClick}>
      <div styleName="city-link-vertical-wrapper">
        <span styleName="city-name">{name}</span>
      </div>
    </div>
  ),
);

const TITLE = 'Städte';
type CitiesSectionT = {
  value: Array<CityType>,
  goToCity: Function,
};
export default fixedCSSModules(styles)(
  ({ value, goToCity }: CitiesSectionT) => {
    const CityLinkWithOnClick = (props: CityType) => (
      <CityLink {...props} onClick={() => goToCity(props.name)} />
    );
    return (
      <div styleName="component">
        <SectionHeader value={TITLE} />
        <div className="hide-mobile" styleName="column">
          <Row>
            {value.map(item => {
              return (
                <Col sm={4} md={3}>
                  <CityLinkWithOnClick {...item} />
                </Col>
              );
            })}
          </Row>
        </div>

        <div className="hide-desktop" styleName="column">
          {value.map(item => {
            return <CityLinkWithOnClick {...item} />;
          })}
        </div>
      </div>
    );
  },
);
