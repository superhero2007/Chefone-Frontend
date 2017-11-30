import React from 'react';
import { compose } from 'ramda';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import low from '../../../../static/low.jpg';
import withSimpleState from '../../../utils/withSimpleState';
import FormSubmit, { submittedProps } from '../../FormSubmit';
import Spinner from '../../UIKit/Spinner';

export default compose(
  withSimpleState('email', () => ''),
  withSimpleState('cityName', () => ''),
  submittedProps(({ email, cityName }) => ({
    email: email.value,
    cityName: cityName.value,
  })),
  FormSubmit(),
  fixedCSSModules(styles, {
    allowMultiple: true,
  })
)(({ email, cityName, formSubmit, submitButtonState }) => (
  <div styleName="margin">
    <div styleName="container">
      <div styleName="cover" style={{ backgroundImage: `url(${low})` }} />
      <div styleName="description">
        <h1>Das Löwen-Special</h1>
        <h2>Jetzt mitmachen und gewinnnen!</h2>
        <p>
          <strong>E-Mail</strong> und <strong>Stadt</strong> eintragen und ein
          unvergessliches Dinner für dich und <strong>3 Freunde</strong>{' '}
          gewinnen - gratis!
        </p>
        <p>
          Außerdem verlosen wir unter allen Teilnehmern 10x 30% und 15x 20%
          Gutscheine. <a href="https://chefone.zendesk.com/hc/de/articles/115003662013-Teilnahmebedingungen-Gewinnspiel">Teilnahmebedingungen</a>
        </p>
      </div>
      <form onSubmit={formSubmit} styleName="form">
        <input
          type="email"
          name="EMAIL"
          required
          placeholder="Deine E-Mail"
          {...email}
        />
        <input
          type="cityName"
          name="CITYNAME"
          required
          placeholder="Deine Stadt"
          {...cityName}
        />
        <input type="hidden" name="u" value="73c5f8eeee57306525b4e358d" />
        <input type="hidden" name="id" value="87e816e974" />
        <button type="submit" styleName="submit">
          Jetzt anmelden
          <Spinner observe={submitButtonState} />
        </button>
      </form>
    </div>
  </div>
));
