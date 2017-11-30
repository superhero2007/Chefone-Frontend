// @flow

import React from 'react';
import EventStatus from '../../../../constants/EventStatus';
import { fixedCSSModules } from '../../../../utils';
import styles from './index.module.less';

export const statusMap = {
  pending: {
    translated: 'Anstehend',
    className: 'btn-success',
  },
  canceled: {
    translated: 'Abgelehnt',
    className: 'btn-danger',
  },
  done: {
    translated: 'Beendet',
    className: 'btn-default btn-done',
  },
  verification: {
    translated: 'Wird geprüft',
    className: 'btn-gray btn-verification',
  },
  initial: {
    translated: 'initial',
    className: 'btn-info',
  },
};
export type PropsT = {
  value?: $Keys<typeof statusMap>,
};
export default fixedCSSModules(styles)(
  ({ value = EventStatus.initial }: PropsT) => {
    const { translated, className } = statusMap[value];
    return <button className={`btn ${className}`}>{translated}</button>;
  },
);
