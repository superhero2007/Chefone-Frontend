// @flow

export * as fixtures from './fixtures';
import React from 'react';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

import ValidationDecorator from '../../../decorators/ValidationDecorator';
import { ParseGeoPoint } from '../../../parseApi/src/runtime';
import GeoAutoComplete from '../../GeoAutoComplete';
import ReactTelInput from '../../PhoneInput';
import { Row, Col } from 'react-flexbox-grid';

const FormInput = ValidationDecorator()(props => <input {...props} />);
const FormGeoAutoComplete = ValidationDecorator()(props => (
  <GeoAutoComplete {...props} />
));

const TelInput = ValidationDecorator()(phoneNumber => (
  <ReactTelInput
    defaultCountry="de"
    className="tel-input"
    placeholder="+49 (0) 176 4234234"
    preferredCountries={['us', 'de', 'uk']}
    initialValue={phoneNumber.value.toString()}
    defaultValue={phoneNumber.value.toString()}
    onChange={phoneNumber.onChange}
    {...phoneNumber}
  />
));

export type PropsT = {
  locationDetails: Object,
  location: Object,
  phoneNumber: Object,
  address: Object,
};

export default applyStyles(
  ({ locationDetails, location, phoneNumber, address }: PropsT) => (
    <div styleName="component block">
      <Row>
        <Col xs={12}>
          <p>Telefonnummer</p>
          <TelInput {...phoneNumber} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <p>Adresse</p>
          <FormGeoAutoComplete
            errors={address.errors}
            value={address.value}
            inited={address.inited}
            submited={address.submited}
            onChange={({ label, location: newLocation }) => {
              location.onChange(
                ParseGeoPoint(newLocation.lat, newLocation.lng),
              );
              address.onChange(label);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <p>Adresszusatz</p>
          <FormInput type="text" {...locationDetails} />
        </Col>
      </Row>
    </div>
  ),
);
