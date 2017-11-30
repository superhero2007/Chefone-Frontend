// @flow

export * as fixtures from './fixtures';

import React from 'react';
import ResultForm from '../ResultForm';
import { ResultType } from '../ResultForm';
import { loc } from '../../localization';

export type PropsT = {
  type: $Keys<typeof ResultType>,
};

export default ({ type }: PropsT) => (
  <ResultForm
    {...{
      type,
      textsMap: loc.privateDinnerResult,
      successLink: '/',
    }}
  />
);
