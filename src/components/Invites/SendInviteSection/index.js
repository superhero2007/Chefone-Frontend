// @flow

import React from 'react';
import R from 'ramda';
import cx from 'classnames';
import { Row, Col } from 'react-flexbox-grid';
import { fixedCSSModules } from '../../../utils';
import CopyToClipboard from 'react-copy-to-clipboard';
import styles from './index.module.less';
import withSimpleState from '../../../utils/withSimpleState';
import type { Changeble } from '../../../utils/withSimpleState';
import type {
  InputProps,
  ButtonProps,
  MultiLineInputProps,
  // GlyphProps,
  SocialButtonProps,
} from '../types';

const getDomain = () => {
  if (!__CLIENT__) {
    return '';
  }
  const { host, protocol } = window.location;

  return `${protocol}//${host}`;
};

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const ui = {
  emailPlaceholder: 'E-Mail Addresse',
  linkPlaceholder: 'NOTEXT_PENDING',
  shareLink: 'Teile deinen Code',
  sendInvites: 'Einladen',
  copyLink: 'Kopieren',
};

const CopyLink = applyStyles(
  ({ onCopy, url }: { onCopy: Function, url: string }) => {
    return (
      <CopyToClipboard text={url} onCopy={onCopy}>
        <Row between="xs">
          <Col xs={8} style={{ paddingRight: 0 }}>
            <Input placeholder={ui.linkPlaceholder} value={url} />
          </Col>
          <Col xs={4} style={{ paddingLeft: 0 }}>
            <Button text={ui.copyLink} styleName="copy-link-button" />
          </Col>
        </Row>
      </CopyToClipboard>
    );
  },
);

const defOnClick = () => {};

const Input = applyStyles(
  ({ className = '', type = 'text', ...props }: InputProps) => (
    <input
      type={type}
      className={cx('form-control', className)}
      styleName="input"
      {...props}
    />
  ),
);

const MultiLineInput = applyStyles(
  ({ className = '', ...props }: MultiLineInputProps) => (
    <textarea className={cx('form-control', className)} {...props} />
  ),
);

const Button = applyStyles(
  ({
    text,
    pressed = false,
    onClick = defOnClick,
    disable = false,
    ...props
  }: ButtonProps) => (
    <button
      styleName={cx('button', {
        'button-pressed': pressed,
      })}
      onClick={onClick}
      disable={disable}
      {...props}
    >
      {text}
    </button>
  ),
);

const MessengerButton = applyStyles(
  ({ url, pressed = false, disable = false, ...props }: SocialButtonProps) => {
    return (
      <button
        styleName={cx('messenger-button', {
          'messenger-button-pressed': pressed,
        })}
        onClick={() => {
          FB.ui({
            method: 'send',
            link: url,
          });
        }}
        disable={disable}
        {...props}
      >
        <div styleName="centered-content">
          <div styleName="messenger-glyph" />
          Messenger
        </div>
      </button>
    );
  },
);

const FacebookButton = applyStyles(
  ({ url, pressed = false, disable = false, ...props }: SocialButtonProps) => {
    return (
      <button
        styleName={cx('facebook-button', {
          'facebook-button-pressed': pressed,
        })}
        onClick={() => {
          FB.ui({
            method: 'share',
            href: url,
          });
        }}
        disable={disable}
        {...props}
      >
        <div styleName="centered-content">
          <div styleName="facebook-glyph" />
          Facebook
        </div>
      </button>
    );
  },
);

const TwitterButton = applyStyles(
  ({
    pressed = false,
    onClick = defOnClick,
    disable = false,
    ...props
  }: SocialButtonProps) => {
    return (
      <button
        styleName={cx('twitter-button', {
          'twitter-button-pressed': pressed,
        })}
        onClick={onClick}
        disable={disable}
        {...props}
      >
        <div styleName="centered-content">
          <div styleName="twitter-glyph" />
          Twitter
        </div>
      </button>
    );
  },
);

export type PropsT = {
  onEmailsSubmit: Function,
  onCopyLink: Function,
  objectId: string,
};

export type InnerPropsT = PropsT & {
  emails: Changeble<string>,
  progress: Changeble<string>,
};

//$FlowIssue
const res: Component$<PropsT, *> = R.compose(
  withSimpleState('progress', () => 'init'),
  withSimpleState('emails', () => ''),
  applyStyles,
)(({ onEmailsSubmit, onCopyLink, objectId, emails, progress }: InnerPropsT) => {
  const loadingSpinner =
    progress.value === 'loading' ? (
      <i className="fa fa-spinner fa-spin" />
    ) : null;
  const url = `${getDomain()}/i/${objectId}`;
  return (
    <div styleName="send-invite-section">
      <Row>
        <Col xs={12} md={10}>
          <MultiLineInput
            styleName="email-field"
            placeholder={ui.emailPlaceholder}
            {...emails}
          />
        </Col>
        <Col xs={12} md={2}>
          {/*$FlowIssue*/}
          <Button
            text={
              <span>
                {ui.sendInvites} {loadingSpinner}
              </span>
            }
            styleName="send-invite"
            onClick={async () => {
              if (onEmailsSubmit) {
                try {
                  progress.onChange('loading');
                  await onEmailsSubmit(emails.value.split('\n'));
                  emails.onChange('');
                  progress.onChange('loaded');
                } catch (err) {
                  progress.onChange('error');
                  throw err;
                }
              }
            }}
          />
        </Col>
      </Row>

      <Row center="xs" middle="xs" styleName="divider-block">
        <Col xs={5.5} around="xs">
          <div styleName="divider" />
        </Col>
        <Col xs={1}>
          <div styleName="or-divider">oder</div>
        </Col>
        <Col xs={5.5} around="xs">
          <div styleName="divider" />
        </Col>
      </Row>

      <Row>
        <div styleName="invites-section-header">{ui.shareLink}</div>
      </Row>

      <Row between="xs">
        <Col xs={12} md={6}>
          <CopyLink url={url} onCopy={onCopyLink} />
        </Col>

        <Col xs={12} md={6}>
          <Row between="xs">
            <Col xs={12} md={6}>
              {/*$FlowIssue*/}
              <MessengerButton url={url} />
            </Col>
            <Col xs={12} md={6}>
              {/*$FlowIssue*/}
              <FacebookButton url={url} />
            </Col>
            {false && (
              <Col xs={12} md={4}>
                {/*$FlowIssue*/}
                <TwitterButton />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
});

export default res;
