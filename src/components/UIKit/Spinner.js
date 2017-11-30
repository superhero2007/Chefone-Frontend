// @flow

import React from 'react';
import { propEq } from 'ramda';

import type { Changeble } from '../../utils/withSimpleState';

const isLoading = propEq('value', 'loading');

const Spinner = <T>({ observe, ...props }: { observe: Changeble<T> }) =>
  isLoading(observe) ? (
    <i className="fa fa-spinner fa-spin" {...props} />
  ) : (
    <span />
  );

export default Spinner;
