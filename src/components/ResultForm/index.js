// @flow

import React from 'react';
import classNames from 'classnames';

import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';
import loading from '../../../static/loading.gif';

export const ResultType = {
  pending: 'pending',
  success: 'success',
  fail: 'fail',
};

export type PropsT = {
  type: $Keys<typeof ResultType>,
  onClick?: Function,
  successLink: string,
  failLink?: string,
  loadedOrder?: Object,
  textsMap: {
    [$Keys<typeof ResultType>]: {
      buttonText: string,
      message?: string,
      header?: string,
      text1?: string,
      text2?: string,
    },
  },
};

const ResultForm = fixedCSSModules(styles, {
  allowMultiple: true,
})(
  (
    {
      type,
      onClick,
      failLink = 'https://chefone.zendesk.com/hc/en-us/requests/new',
      successLink,
      loadedOrder,
      textsMap,
    }: PropsT,
    context,
  ) => {
    const { message, header, buttonText, text1, text2 } = textsMap[type];
    const buttonClassName = classNames('btn');

    let status, messageElem;
    const pending = type === 'pending';
    const success = type === 'success';
    const fail = type === 'fail';

    const processLink = link => {
      if (link.startsWith('http')) {
        window.open(link);
      } else {
        context.router.push(link);
      }
    };

    if (!pending) {
      status = (
        <div
          styleName={classNames('image', {
            'image-success': type !== 'fail',
            'image-fail': type === 'fail',
          })}
        />
      );
      if (success) {
        messageElem = (
          <span>
            {message ? message.replace('Support.', '') : ''}{' '}
            <a href="https://chefone.zendesk.com/hc/de" target="_blank">
              Support
            </a>
            .
          </span>
        );
      }
      if (fail) {
        messageElem = (
          <span>
            {`${message || ''}${loadedOrder ? loadedOrder.systemMsg : ''}`}
          </span>
        );
      }
    } else {
      status = (
        <div styleName="loader">
          <img src={loading} alt="" />
          <p styleName="text1">{text1}</p>
          <p styleName="text2">{text2}</p>
        </div>
      );
    }

    return (
      <div styleName="result-form">
        {pending ? (
          <span>{status}</span>
        ) : (
          <div>
            {status}
            <h2>{header}</h2>
            <p styleName={fail ? 'fail' : ''}>{messageElem}</p>
            <hr />
            <button
              styleName={buttonClassName}
              className="btn-success btn-sm center-block"
              onClick={() => {
                if (type === 'fail') {
                  processLink(failLink);
                  return;
                }
                processLink(successLink);
                onClick && onClick();
              }}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    );
  },
);

ResultForm.contextTypes = {
  router: React.PropTypes.object,
};

export default ResultForm;
