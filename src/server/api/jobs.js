// @flow

import { Jobs } from '../../parseApi/api';

export const getJobs = () => Jobs.Get({ equalTo: [Jobs.Field.active(true)] });
