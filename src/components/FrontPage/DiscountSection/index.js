// @flow

import React from 'react';

import { compose } from 'ramda';

import { fixedCSSModules } from '../../../utils';

import styles from './index.module.less';
import FormSubmit, { submittedProps } from '../../FormSubmit';
import withSimpleState from '../../../utils/withSimpleState';
import type { Changeble } from '../../../utils/withSimpleState';
import Spinner from '../../UIKit/Spinner';
// const GIFT_TITLE = 'VERSCHENKE EINEN GUTSCHEIN'
// const GIFT_TITLE_COMMENT = 'Denn zusammen isst man einfach besser.'
// const GIFT_BUTTON_TEXT = 'JETZT KAUFEN'

const SUBSCRIBE_TITLE = 'CHEF.ONE-Newsletter:';
const SUBSCRIBE_DETAILS =
  'Jetzt anmelden und 1 von 5 Gratis-Dinnern im Monat gewinnen';
const SUBSCRIBE_INPUT_PLACEHOLDER = 'eMail-Adresse eingeben';
const SUBSCRIBE_BUTTON_TEXT = 'Jetzt anmelden';
type BtnState = 'error' | 'success' | 'pending' | 'initial';
export default compose(
  withSimpleState('email', () => ''),
  submittedProps(({ email }) => ({
    email: email.value,
    cityName: '',
  })),
  FormSubmit(),
  fixedCSSModules(styles, {
    allowMultiple: true,
  }),
)(
  ({
    email,
    formSubmit,
    submitButtonState,
  }: {
    email: Changeble<string>,
    submitButtonState: Changeble<BtnState>,
    formSubmit: Function,
  }) => (
    <div styleName="container">
      <div className="container">
        <form onSubmit={formSubmit} styleName="column subscribe">
          <h2>{SUBSCRIBE_TITLE}</h2>
          <p>{SUBSCRIBE_DETAILS}</p>
          <input
            placeholder={SUBSCRIBE_INPUT_PLACEHOLDER}
            type="email"
            name="EMAIL"
            required
            {...email}
          />
          <input type="hidden" name="u" value="73c5f8eeee57306525b4e358d" />
          <input type="hidden" name="id" value="87e816e974" />
          <button type="submit">
            {SUBSCRIBE_BUTTON_TEXT}
            <Spinner observe={submitButtonState} />
          </button>
        </form>
      </div>
    </div>
  ),
);
