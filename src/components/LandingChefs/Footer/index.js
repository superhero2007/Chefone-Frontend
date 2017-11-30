// @flow

import React from 'react';
import { compose, pipe, map, add } from 'ramda';

import DropdownPlus from '../../UIKit/Dropdown/DropdownPlus';
import Button from '../../UIKit/Button';

import { toPlainObject } from '../../../decorators/ValidationDecorator';
import { listFromNumber } from '../../../utils';
import withSimpleState from '../../../utils/withSimpleState';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import dropdownTheme from './dropdown.theme.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const ui = {
  title: {
    bold: 'BEKOCHE DIE FOODIES DEINER STADT',
    sub: 'Deine Küche, deine Kochkünste, unsere Gäste!',
  },
  where: 'Wo',
  guest: 'Gäste',
  selectCity: 'Wähle deine Stadt',
  becomeButton: 'Jetzt Dinner Hosten',
  moreInfo: 'Warum Gastgeber werden?',
};
const wordFormSelector = (singular, plural) => amount =>
  amount > 1 ? plural : singular;
const guestForm = wordFormSelector('Gast', 'Gäste');
const printGuests = amount => `${amount} ${guestForm(amount)}`;
const Title = applyStyles(() => (
  <div styleName="title">
    <div styleName="bold">{ui.title.bold}</div>
    <div styleName="sub">{ui.title.sub}</div>
  </div>
));
const mapSelectGuests = pipe(listFromNumber, map(add(1)));
const getStateToSave = props => ({
  //$FlowIssue
  guestsNumber: props.guestsNumber,
  city: props.city,
});
const CreateEvent = compose(
  withSimpleState('guestsNumber', () => 1),
  withSimpleState('city', ({ city }) => {
    return city ? city.city : null;
  }),
  applyStyles,
)(props => {
  //$FlowIssue
  const { guestsNumber, maxGuests, city, cities, onClick } = props;
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
          selected={city}
        />
      </div>
      <div styleName="line" />
      <div styleName="dropdown-block">
        <div styleName="dropdown-title">{ui.guest}</div>
        <DropdownPlus
          theme={dropdownTheme}
          options={mapSelectGuests(maxGuests)}
          defaultIndex={0}
          printWith={printGuests}
          tabIndex={1}
          selected={guestsNumber}
        />
      </div>
      <div styleName="line" />
      <Button
        mode="turquoise"
        text={ui.becomeButton}
        styleName="create-button"
        onClick={() => {
          const toSave = getStateToSave(props);
          const stateToSubmit = toPlainObject(toSave);
          onClick(stateToSubmit);
        }}
      />
    </div>
  );
});
export default applyStyles(({ goToCreateEvent, cities, city }) => (
  <div styleName="component">
    <div styleName="container-row">
      <Title />
      <div styleName="join-see-more">
        <CreateEvent
          city={city}
          maxGuests={30}
          cities={cities}
          onClick={goToCreateEvent}
        />
        {/*<a styleName='see-more'>{ui.moreInfo}</a>*/}
      </div>
    </div>
  </div>
));
