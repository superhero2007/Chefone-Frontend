//@flow

import * as _fixtures from './fixtures';
export const fixtures = _fixtures;

import React from 'react';
import R from 'ramda';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import type { Changeble } from '../../../utils/withSimpleState';
import ReactTelInput from '../../PhoneInput';
import ValidationDecorator from '../../../decorators/ValidationDecorator';

const FormReactTelInput = ValidationDecorator()(props => (
  <ReactTelInput {...props} />
));
import { Element } from 'react-scroll';

const WRITE_MESSAGE = 'Hier Nachricht eingeben';
const LEAVE_MESSAGE_EXPLAINED =
  'Sende deinem Gastgeber eine Nachricht. Beispiele: Allergien, spezielle Ernährungswünsche, Vorlieben, usw.';

const ADD_YOUR_CONTACT_INFO = 'Deine Telefonnummer';
export type PropsT = {
  phoneChangeble: Changeble<string>,
  chefMessageChangeble: Changeble<string>,
};
export default R.compose(fixedCSSModules(styles, { allowMultiple: true }))(
  ({ phoneChangeble, chefMessageChangeble }: PropsT) => {
    return (
      <div styleName="component" className="contaier">
        <div className="row">
          <section styleName="phone" className="col-xs-12 col-lg-6">
            <label>{ADD_YOUR_CONTACT_INFO}</label>
            <div styleName="body">
              <Element name="phoneAnchor">
                <FormReactTelInput
                  defaultCountry="de"
                  styleName={`order-phone tel-input ${
                    phoneChangeble.errors && phoneChangeble.errors.length
                      ? 'error'
                      : ''
                  }`}
                  placeholder="+49 (0) 176 4234234"
                  preferredCountries={['us', 'de', 'uk']}
                  {...phoneChangeble}
                />
              </Element>
            </div>
          </section>
        </div>
        <div className="row">
          <section styleName="chef-message" className="col-md-12">
            <label>{LEAVE_MESSAGE_EXPLAINED}</label>
            <textarea
              styleName="body"
              placeholder={WRITE_MESSAGE}
              {...chefMessageChangeble}
            />
          </section>
        </div>
      </div>
    );
  },
);
