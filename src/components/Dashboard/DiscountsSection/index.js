// @flow

import React from 'react';
export * as fixtures from './fixtures';
import { fixedCSSModules } from '../../../utils';
import CopyToClipboard from 'react-copy-to-clipboard';
import cx from 'classnames';
import styles from './index.module.less';
import { Row, Col } from 'react-flexbox-grid';

const ui = {
  copyLink: 'Copy',
};

type DiscountT = {
  cash: number,
  currency: string,
  code: string,
};
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const Input = applyStyles(
  ({ type = 'text', ...props }: { type?: string, props?: Object }) => (
    <input
      type={type}
      className={cx('form-control')}
      styleName="input"
      {...props}
    />
  ),
);

const CopyLink = applyStyles(
  ({ onCopy, url }: { onCopy: Function, url: string }) => {
    return (
      <CopyToClipboard text={url} onCopy={onCopy}>
        <Row between="xs">
          <Col xs={8} style={{ paddingRight: 0 }}>
            <Input value={url} />
          </Col>
          <Col xs={4} style={{ paddingLeft: 0 }}>
            <button styleName="copy-link-button">{ui.copyLink}</button>
          </Col>
        </Row>
      </CopyToClipboard>
    );
  },
);

const DiscountElement = applyStyles(
  ({
    code,
    onCopy,
    cash,
    currency,
  }: DiscountT & {
    onCopy: Function,
  }) => {
    return (
      <Row styleName="item" middle="xs">
        <Col xs={2} styleName="discount-value-text">
          {cash}
          {currency} discount
        </Col>
        <Col xs={10}>
          <CopyLink url={code} onCopy={onCopy} />
        </Col>
      </Row>
    );
  },
);

export type PropsT = {
  values: Array<DiscountT>,
  onCopy: Function,
};

export default ({ values, onCopy }: PropsT) => (
  <div>
    {values &&
      values.map((item, index) => (
        <DiscountElement {...item} currency={'€'} onCopy={onCopy} key={index} />
      ))}
  </div>
);
