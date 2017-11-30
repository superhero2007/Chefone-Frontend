// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

const EMAIL_MSG = (url: string) => `Hey,
schau mal, was ich gerade gefunden habe.
${url}
Wenn du Zeit und Lust auf ein gemeinsames Dinner hast, lass uns doch gerne zusammen hingehen!
`;
const EmailButton = ({
  url,
  foodTitle,
}: {
  url: string,
  foodTitle: string,
}) => {
  const emailSubject = `Social Dinner "${foodTitle}"`;
  const emailMessage = EMAIL_MSG(url);

  return (
    <div
      className="icon-social-email"
      onClick={() => {
        if (__CLIENT__) {
          window.open(
            `mailto:?subject=${encodeURIComponent(
              emailSubject,
            )}&body=${encodeURIComponent(emailMessage)}`,
            '_self',
          );
        }
      }}
    />
  );
};

const FbShareButton = ({ url }: { url: string, message: string }) => {
  return (
    <div
      className="icon-social-fb"
      onClick={() => {
        FB.ui({
          method: 'share',
          href: url,
        });
      }}
    />
  );
};

const FbShareMsgButton = ({ url }: { url: string, message: string }) => {
  return (
    <div
      className="icon-social-fb-msg"
      onClick={() => {
        FB.ui({
          method: 'send',
          link: url,
        });
      }}
    />
  );
};

const WhatsApp = ({ message }: { message: string }) => {
  return (
    <div
      className="icon-social-whats-up"
      onClick={() => {
        if (__CLIENT__) {
          window.open(`whatsapp://send?text=${message}`);
        }
      }}
    />
  );
};

export default fixedCSSModules(styles)(
  ({ foodTitle }: { foodTitle: string }) => {
    let url = '';
    let message = '';

    if (__CLIENT__) {
      url = url || window.location.href;
    }

    if (!url) {
      url = '';
    }

    return (
      <div styleName="component">
        <EmailButton url={url} foodTitle={foodTitle} />
        <FbShareButton url={url} message={message} />
        <FbShareMsgButton url={url} message={message} />
        <WhatsApp message={url} />
      </div>
    );
  },
);
