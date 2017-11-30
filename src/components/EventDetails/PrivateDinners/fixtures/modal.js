// @flow

import React from 'react';
import styles from './simple.module.less';

import RawComponent from '../';
import Modal from '../../../Modal';

import props from './simple';

export default () => {
  return (
    <Modal className={styles.component}>
      {/*$FlowIssue*/}
      <RawComponent {...props} />
    </Modal>
  );
};
