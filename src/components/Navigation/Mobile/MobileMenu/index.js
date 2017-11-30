// @flow

import React from 'react';
import CityMenu from './CityMenu';
import type { ParseCitiesInstance } from '../../../../parseApi/api/Cities';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { mobilePages } from '../../../../redux/modules/modals';
import type { MOBILE_PAGES } from '../../../../redux/modules/modals';

export type Props = {
  onClose: Function,
  mainMenuOptions: any,
  openMobilePage(a: MOBILE_PAGES): *,
  cities: Array<ParseCitiesInstance>,
  goToCity(a: string): *,
  page: string | null,
};

export default class MobileRouter extends React.Component<*, *> {
  props: Props;
  render() {
    const { goToCity, cities, mainMenuOptions, onClose } = this.props;

    const sharedProps = {
      goToCity: goToCity,
      cities: cities,
      onClose,
      mainMenuOptions,
    };

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="top-fadein"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.props.page === mobilePages.HOME && (
            <CityMenu
              {...sharedProps}
              citiesOpened={false}
              onCities={() => this.props.openMobilePage(mobilePages.CITIES)}
            />
          )}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName="left-fadein"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.props.page === mobilePages.CITIES && (
            <CityMenu
              {...sharedProps}
              citiesOpened={true}
              onCitiesBack={() => this.props.openMobilePage(mobilePages.HOME)}
            />
          )}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
