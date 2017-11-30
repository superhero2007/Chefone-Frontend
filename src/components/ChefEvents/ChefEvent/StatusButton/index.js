// @flow

import React from 'react';
import EventStatus from '../../../../constants/EventStatus';

import { fixedCSSModules } from '../../../../utils';
import styles from './index.module.less';

const statusMap = {
  [EventStatus.pending]: {
    translated: 'Anstehend',
    className: 'btn-success',
  },
  [EventStatus.canceled]: {
    translated: 'Abgelehnt',
    className: 'btn-danger',
  },
  [EventStatus.done]: {
    translated: 'Beendet',
    className: 'btn-default btn-done',
  },
  [EventStatus.verification]: {
    translated: 'Wird geprüft',
    className: 'btn-gray btn-verification',
  },
  [EventStatus.initial]: {
    translated: 'initial',
    className: 'btn-info',
  },
};
export default fixedCSSModules(styles, {
  allowMultiple: true,
})(({ value = EventStatus.initial }: { value?: string }) => {
  const { translated, className } = statusMap[value];
  return <button styleName={`btn ${className}`}>{translated}</button>;
});
