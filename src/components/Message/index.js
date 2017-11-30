// @flow

import React from 'react';
import moment from 'moment';
import AvatarImage from '../UIKit/AvatarImage';
import cx from 'classnames';
import { Row, Col } from 'react-flexbox-grid';
import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

export default applyStyles(
  ({
    msgData: { isNew, date, avatar, title, name, text },
    onClick,
  }: {
    msgData: {
      isNew: boolean,
      date: Date,
      avatar: string,
      title: string,
      name: string,
      text: string,
    },
    onClick: Function,
  }) => {
    const msgStyle = cx('message', {
      'msg-unread': isNew,
      'msg-read': !isNew,
    });

    const formatDate = moment(date).format('DD.MM.YYYY | HH:mm');

    return (
      <div styleName={msgStyle} onClick={onClick}>
        <Row>
          <Col lg={2} sm={3} xs={5} style={{ position: 'relative' }}>
            {isNew ? <div styleName="new-badge" /> : null}
            <div styleName="avatar">
              <AvatarImage
                src={avatar}
                diam="100%"
                placeholderStroke="orange"
              />
            </div>
          </Col>
          <Col lg={10} sm={9} xs={7} styleName="message-details">
            <h3>{title}</h3>
            <div styleName="date">{`${name} | ${formatDate}`}</div>
            <hr className="hide-mobile" />
            <div className="hide-mobile" styleName="description ">
              {text}
            </div>
          </Col>
        </Row>
      </div>
    );
  },
);
