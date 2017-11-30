// @flow

import React from 'react';
import { compose } from 'ramda';
import { toPlainObject } from '../../../decorators/ValidationDecorator';
import withSimpleState from '../../../utils/withSimpleState';
import { Button } from './components';
import DropdownPlus from '../../UIKit/Dropdown/DropdownPlus';
import type { Changeble } from '../../../utils/withSimpleState';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import dropdownTheme from './dropdown.theme.module.less';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const ui = {
  title: {
    main: 'Entdecke die Küchen			deiner Stadt',
    left: 'WERDE GAST',
    right: 'WERDE GASTGEBER',
  },
  where: 'Wo',
  guest: 'Gäste',
  selectCity: 'Wähle deine Stadt',
  button: 'Jetzt Entdecken',
  moreInfo: 'Warum Gastgeber werden?',
  moreInfo2: 'Jetzt loslegen',
};

const getStateToSave = props => ({
  city: props.selectedCity,
});
type SelectCitySectionProps = {
  city?: {
    city: string,
  },
  cities: Array<string>,
  onClick: Function,
};
type SelectCitySectionInnerProps = SelectCitySectionProps & {
  selectedCity: Changeble<string | null>,
};

//$FlowIssue
const SelectCitySection: (a: SelectCitySectionProps) => any = compose(
  withSimpleState('selectedCity', ({ city }) => {
    return city ? city.city : null;
  }),
  applyStyles,
)((props: SelectCitySectionInnerProps) => {
  const { selectedCity, cities, onClick } = props;
  return (
    <div styleName="event-creator">
      <div styleName="dropdown-block">
        <div styleName="dropdown-title">{ui.where}</div>
        {/*$FlowIssue*/}
        <DropdownPlus
          theme={dropdownTheme}
          options={cities}
          defaultValue={ui.selectCity}
          tabIndex={0}
          selected={selectedCity}
        />
      </div>
      <div styleName="line" />
      <div styleName="button-block">
        <Button
          text={ui.button}
          styleName="create-button"
          onClick={() => {
            const toSave = getStateToSave(props);
            const stateToSubmit = toPlainObject(toSave);
            onClick(stateToSubmit);
          }}
        />
      </div>
    </div>
  );
});
export type Props = {
  onSelectCity: Function,
  goToLandingChefs: Function,
  cities: Array<string>,
  city: Object,
};

export default applyStyles(
  ({ onSelectCity, goToLandingChefs, cities, city }: Props) => (
    <div styleName="component">
      <div styleName="component" />
      <Row center="xs">
        <h1 styleName="main">{ui.title.main}</h1>
      </Row>
      <Row styleName="row">
        <Col md={6} xs={12} styleName="select-city-column">
          <Row center="xs">
            <h2 styleName="secondary desktop">{ui.title.left}</h2>
          </Row>
          <Row styleName="join-see-more">
            <SelectCitySection
              city={city}
              cities={cities}
              onClick={onSelectCity}
            />
            <a styleName="see-more" onClick={goToLandingChefs}>
              {ui.moreInfo}
            </a>
          </Row>
        </Col>

        <Col md={6} xs={12} styleName="second-row">
          <Row center="xs">
            <h2 styleName="secondary">{ui.title.right}</h2>
          </Row>

          <Row center="xs">
            <button styleName="more-info">
              <Link to="landing-chefs">
                <span>{ui.moreInfo2}</span>
                <span>Jetzt loslegen</span>
              </Link>
            </button>
          </Row>
        </Col>
      </Row>
    </div>
  ),
);
