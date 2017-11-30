// @flow

import React from 'react';
import Input from 'react-bootstrap/lib/Input';

export const TextInputField = ({
  value,
  ...props
}: {
  value: Object,
  props?: Object,
}) => (
  <Input
    className="center-block"
    bsStyle={value.touched && value.error ? 'error' : null}
    help={value.touched ? value.error : ''}
    {...value}
    {...props}
  />
);

export const EmailInputField = ({ value }: { value: Object }) => (
  <TextInputField type="text" name="email" placeholder="Email" value={value} />
);

export const PasswordInputField = ({ value }: { value: Object }) => (
  <TextInputField
    type="password"
    name="password"
    placeholder="Password"
    value={value}
  />
);
