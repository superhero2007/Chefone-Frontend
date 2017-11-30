// @flow

import React, { Component, PropTypes } from 'react';
import ReactNotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
// import './index.less';
import styles from './styles';

class Notifications extends Component<*, *> {
  componentWillUpdate(nextProps) {
    if (!nextProps.notification.level) {
      return;
    }
    this.refs.notifications.addNotification(nextProps.notification);
  }

  render() {
    return <ReactNotificationSystem ref="notifications" style={styles} />;
  }
}

Notifications.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default connect(({ notification }) => ({ notification }))(Notifications);
