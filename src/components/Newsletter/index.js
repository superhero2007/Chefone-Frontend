// @flow

export * as fixtures from './fixtures';
import React from 'react';
import R from 'ramda';

import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

import FormSubmit, { submittedProps } from '../FormSubmit';
import Spinner from '../UIKit/Spinner';

import withSimpleState from '../../utils/withSimpleState';
import type { Changeble } from '../../utils/withSimpleState';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const HEADER = 'LUST AUF EINEN LECKERBISSEN?';
const TEXT =
  'Dann melde dich jetzt für unseren Newsletter an. Über diesen benachrichtigen wir dich über bevorstehende Dinner, neue Städte und alle anderen Neuigkeiten!';
const BTN_TEXT = 'Abonnieren';
const EMAIL_PLACEHOLDER = 'Email';
const CITY_PLACEHOLDER = 'Deine Stadt';
type BtnState = 'error' | 'success' | 'pending' | 'initial';
const Form = R.compose(
  withSimpleState('email', () => ''),
  withSimpleState('cityName', () => ''),
  submittedProps(({ email, cityName }) => ({
    email: email.value,
    cityName: cityName.value,
  })),
  FormSubmit(),
  applyStyles,
)((props: *) => {
  const {
    email,
    cityName,
    submitButtonState,
    formSubmit,
  }: {
    email: Changeble<string>,
    cityName: Changeble<string>,
    submitButtonState: Changeble<BtnState>,
    formSubmit: Function,
  } = props;
  return (
    <form styleName="form" onSubmit={formSubmit}>
      <div styleName="header">{HEADER}</div>
      <div styleName="text">{TEXT}</div>
      <input
        styleName="icon-message_gray"
        required
        type="email"
        placeholder={EMAIL_PLACEHOLDER}
        {...email}
      />
      <input
        styleName="icon-home_gray"
        required
        placeholder={CITY_PLACEHOLDER}
        {...cityName}
      />
      <button>
        <span>{BTN_TEXT}</span>

        <Spinner observe={submitButtonState} />
      </button>
    </form>
  );
});

export type PropsT = { onSubmit: Function };
export default applyStyles(({ onSubmit }: PropsT) => {
  return (
    <div styleName="component">
      <div styleName="image-col" />
      <div styleName="form-col">
        <Form onSubmit={onSubmit} />
      </div>
    </div>
  );
});
