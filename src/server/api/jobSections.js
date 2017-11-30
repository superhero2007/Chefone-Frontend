// @flow

import { JobSection } from '../../parseApi/api';

export const getJobSections = () =>
  JobSection.Get({ equalTo: [JobSection.Field.active(true)] });
