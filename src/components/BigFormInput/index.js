import React from 'react';

import Input from 'react-bootstrap/lib/Input';

import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

export default fixedCSSModules(styles)((props: Object) => (
  <Input
    styleName="input"
    bsStyle={props.touched && props.error ? 'error' : null}
    help={props.touched ? props.error : ''}
    {...props}
  />
));
