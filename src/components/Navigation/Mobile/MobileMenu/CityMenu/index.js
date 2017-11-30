// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { fixedCSSModules } from '../../../../../utils';
import styles from './index.module.less';
import type { ParseCitiesInstance } from '../../../../../parseApi/api/Cities';
import Separator from '../../../Separator';
import MenuLayout from '../../MenuLayout';
import { MenuIcon } from '../../../MenuItem';
import MenuOptions from '../../../MenuOptions';

const CITIES = 'Städte';

const CityToggle = fixedCSSModules(styles, {
  allowMultiple: true,
})(({ open, onCities, onCitiesBack }) => (
  <div styleName={`city-toggle ${open ? 'open' : ''}`}>
    {open ? (
      <MenuIcon
        text={CITIES}
        onClick={onCitiesBack}
        leftIcon={<div className="icon-arrow-left" />}
      />
    ) : (
      <MenuIcon
        text={CITIES}
        onClick={onCities}
        leftIcon={<div className="icon-home-orange" />}
        rightIcon={<div className="icon-arrow-right" />}
      />
    )}
  </div>
));
export type PropsT = {
  mainMenuOptions: any,
  goToCity: Function,
  cities: Array<ParseCitiesInstance>,
  citiesOpened: boolean,
  onClose: Function,
  onCities?: Function,
  onCitiesBack?: Function,
};
class CityMenu extends React.Component<*, *> {
  props: PropsT;
  state = {
    isActive: false,
  };
  componentDidMount() {
    if (!__SERVER__) {
      //$FlowIssue
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }
  componentWillUnmount() {
    if (!__SERVER__) {
      //$FlowIssue
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }
  handleClickOutside = e => {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(e.target)) {
      this.props.onClose();
    }
  };
  render() {
    const {
      goToCity,
      cities,
      mainMenuOptions,
      citiesOpened,
      onClose,
      onCities,
      onCitiesBack,
    } = this.props;

    const cityMenuOptions = (
      <MenuOptions>
        {cities.map((city, key) => (
          <MenuIcon
            key={key}
            onClick={() => goToCity(city)}
            text={city.city || ''}
          />
        ))}
      </MenuOptions>
    );

    return (
      <div>
        {/*$FlowIssue*/}
        <MenuLayout onClose={onClose}>
          <CityToggle
            open={citiesOpened}
            onCities={onCities}
            onCitiesBack={onCitiesBack}
          />
          <Separator />
          {citiesOpened ? cityMenuOptions : mainMenuOptions}
        </MenuLayout>
      </div>
    );
  }
}
export default fixedCSSModules(styles)(CityMenu);
