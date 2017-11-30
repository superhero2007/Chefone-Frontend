// @flow

import React from 'react';
import R from 'ramda';
import { ShouldRenderForClientDecorator } from '../../../decorators';
import withSimpleState from '../../../utils/withSimpleState';
import type { Changeble } from '../../../utils/withSimpleState';
import MenuDropdown from '../../MenuDropdown';
import { MenuIconCollection, MenuIcon } from '../MenuItem';
import { authPages } from '../../../redux/modules/modals';
import type { ParseCitiesInstance } from '../../../parseApi/api/Cities';
import { Row, Col } from 'react-flexbox-grid';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, {
  allowMultiple: true,
});

export type PropsT = {
  mainMenuOptions: any,
  username: string,
  firstName: string,
  lastName: string,
  avatar: string,
  openAuthPage: Function,
  goToCreateEvent: Function,
  goToHelp: Function,
  goToCity: Function,
  cities: Array<ParseCitiesInstance>,
  city: ParseCitiesInstance | null,
};

const SIGN_UP = 'Registrieren';
const CITIES = 'Stadt auswählen';
const CREATE_EVENT = 'Gastgeber werden';
const HELP = 'Hilfe';

const AuthMenu = R.compose(
  withSimpleState('dropdownHidden', () => false),
  applyStyles,
)((props: PropsT & { dropdownHidden: Changeble<boolean> }) => {
  const {
    mainMenuOptions,
    username,
    firstName,
    lastName,
    goToCreateEvent,
    goToHelp,
    avatar,
    openAuthPage,
    cities,
    goToCity,
  } = props;

  const dropdownTitle = firstName && lastName ? `${firstName}` : username;

  const trigger = (
    <MenuIcon
      leftIcon={
        !avatar ? (
          <div className="icon-profile" />
        ) : (
          <div
            className="icon-profile"
            style={{
              backgroundImage: `url(${avatar})`,
            }}
          />
        )
      }
      text={dropdownTitle}
    />
  );

  const help = (
    <MenuIcon text={HELP} className="help-link" onClick={() => goToHelp()} />
  );

  const createEvent = (
    <MenuIcon text={CREATE_EVENT} onClick={() => goToCreateEvent()} />
  );

  const menuCollectionElems = !username
    ? [
        help,
        createEvent,
        <MenuIcon
          text={SIGN_UP}
          onClick={() => openAuthPage(authPages.SIGN_UP)}
        />,
        <MenuIcon text="Login" onClick={() => openAuthPage(authPages.LOGIN)} />,
      ]
    : [
        help,
        createEvent,
        <MenuDropdown trigger={trigger} contentItems={mainMenuOptions} />,
      ];

  const iconText = CITIES;

  return (
    <Row between="xs">
      <MenuIconCollection
        value={[
          <MenuDropdown
            trigger={
              <MenuIcon
                text={iconText}
                leftIcon={<div className="icon-city" />}
              />
            }
            contentItems={cities.map(city => (
              <a onClick={() => goToCity(city)}>{city.city}</a>
            ))}
          />,
        ]}
      />
      <div
        style={{
          display: 'inline-flex',
          flex: '1 auto',
          flexDirection: 'column',
        }}
      >
        <Row
          style={{
            justifyContent: 'flex-end',
          }}
        >
          <Col styleName="usermenu-dropdown" className="no-hor-padding">
            <MenuIconCollection value={menuCollectionElems} />
          </Col>
        </Row>
      </div>
    </Row>
  );
});

// TODO can we remove that and render on server??
export default ShouldRenderForClientDecorator(
  (
    props: PropsT & {
      renderForClient: boolean,
    },
  ) => {
    const { renderForClient } = props;

    if (!renderForClient) {
      return <div />;
    }

    return (
      <div className={styles.component}>
        {/*$FlowIssue*/}
        <AuthMenu {...props} />
      </div>
    );
  },
);
