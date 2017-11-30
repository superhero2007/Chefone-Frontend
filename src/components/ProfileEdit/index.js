export * as fixtures from './fixtures';
import React from 'react';
import type { ChildrenArray } from 'react';
import cx from 'classnames';
import { isEmpty, complement } from 'ramda';

import Dropdown from '../UIKit/Dropdown';

import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const ui = {
  private: {
    head: 'Private Informationen',
    subhead: 'Diese Informationen werden nicht öffentlich angezeigt.',
    email: 'eMail-Adresse',
    changePass: 'Passwort ändern',
    phone: 'Telefonnummer',
    dob: 'Geburtsdatum',
    deleteAcc: 'Account löschen',
  },
  public: {
    head: 'Öffentliches Profil',
    subhead: 'Diese Informationen werden anderen angezeigt.',
    upload: 'Hochladen',
    name: 'Vorname',
    lastname: 'Nachname',
    city: 'In welcher Stadt wohnst du?',
    dish: 'Was ist dein Leibgericht?',
    about: 'Über mich',
    occupation: 'Beruf',
    langs: 'Sprachen',
    diet: 'Ernährungsform',
    dietDropdown: {
      options: ['Ich esse alles', 'Vegetarier', 'Veganer'],
    },
  },
  update: 'Profil aktualisieren',
};
type ButtonProps = {
  text: string,
  disable?: boolean,
  pressed?: boolean,
  onClick?: Function,
};
type FormHeadProps = {
  head: string,
  subhead?: string,
};
type InputProps = {
  className?: string,
  type?: string,
};
type TextareaProps = {
  className?: string,
};
type InputFieldProps = {
  label: string,
  className?: string,
};
type FormFieldProps = {
  label: string,
  children?: ChildrenArray<*>,
};
type FormFieldsRowProps = {
  children?: ChildrenArray<*>,
};
type PublicInfoProps = {
  avatar: string,
  name: string,
  lastname: string,
  city?: string,
  dish?: string,
  about?: string,
  occupation?: string,
};
type PrivateInfoProps = {
  email: string,
};
const defOnClick = () => {};
const Button = applyStyles(
  ({
    text,
    pressed = false,
    onClick = defOnClick,
    disable = false,
    ...props
  }: ButtonProps) => (
    <button
      styleName={cx('button', {
        'button-pressed': pressed,
      })}
      onClick={onClick}
      disable={disable}
      {...props}
    >
      {text}
    </button>
  ),
);
const Input = applyStyles(
  ({ className = '', type = 'text', ...props }: InputProps) => (
    <input
      type={type}
      className={cx('form-control', className)}
      styleName="input"
      {...props}
    />
  ),
);
const Textarea = applyStyles(({ className = '', ...props }: TextareaProps) => (
  <textarea
    className={cx('form-control', className)}
    styleName="input"
    {...props}
  />
));
const notEmpty = complement(isEmpty);
const FormHead = applyStyles(
  ({ head, subhead = '', ...props }: FormHeadProps) => (
    <div styleName="head" {...props}>
      <div styleName="header">{head}</div>
      {notEmpty(subhead) && <div styleName="subheader">{subhead}</div>}
    </div>
  ),
);
const FormField = applyStyles(
  ({ label, children, ...props }: FormFieldProps) => (
    <div styleName="form-field" {...props}>
      <div styleName="label">{label}</div>
      {children}
    </div>
  ),
);
const InputField = ({ label, className = '', ...props }: InputFieldProps) => (
  <FormField className={className} label={label}>
    <Input {...props} />
  </FormField>
);
const FormFieldsRow = applyStyles(
  ({ children, ...props }: FormFieldsRowProps) => (
    <div styleName="two-cols" {...props}>
      {children}
    </div>
  ),
);
const PublicInfo = applyStyles(
  ({
    avatar,
    name,
    lastname,
    city = '',
    dish = '',
    about = '',
    occupation = '',
  }: PublicInfoProps) => (
    <div styleName="public">
      <FormHead head={ui.public.head} subhead={ui.public.subhead} />
      <div styleName="upload-row">
        <img styleName="avatar" src={avatar} />
        <Button styleName="upload" text={ui.public.upload} />
      </div>
      <FormFieldsRow>
        <InputField label={ui.public.name} value={name} />
        <InputField label={ui.public.lastname} value={lastname} />
      </FormFieldsRow>
      <FormFieldsRow>
        <InputField label={ui.public.city} value={city} />
        <InputField label={ui.public.dish} value={dish} />
      </FormFieldsRow>
      <FormField label={ui.public.about}>
        <Textarea value={about} />
      </FormField>
      <FormFieldsRow>
        <InputField label={ui.public.occupation} value={occupation} />
        <FormField label={ui.public.langs}>
          <span />
        </FormField>
      </FormFieldsRow>
      <FormField label={ui.public.diet} styleName="diet">
        <Dropdown
          styleName="diet-dropdown input"
          options={ui.public.dietDropdown.options}
        />
      </FormField>
    </div>
  ),
);
const PrivateInfo = applyStyles(({ email }: PrivateInfoProps) => (
  <div styleName="private">
    <FormHead head={ui.private.head} subhead={ui.private.subhead} />
    <InputField label={ui.private.email} type="email" disabled value={email} />
    <Button text={ui.private.changePass} styleName="change-pass" />
    <div styleName="row-pad" />
    <FormField label={ui.private.phone}>
      <span />
    </FormField>
    <FormField label={ui.private.dob}>
      <span />
    </FormField>
    <Button text={ui.private.deleteAcc} styleName="delete-acc" />
  </div>
));

export type PropsT = {};

const ProfileEdit = applyStyles(() => (
  <div styleName="layout">
    <div styleName="forms">
      <PublicInfo
        avatar="/static/about/avatar1.jpg"
        name="Eddi"
        lastname="Alim"
        city="Hamburg, Germany"
      />
      <PrivateInfo email="eddi.alim@chef.one" />
    </div>
    <div styleName="update">
      <Button text={ui.update} styleName="update-button" />
    </div>
  </div>
));
export default ProfileEdit;
