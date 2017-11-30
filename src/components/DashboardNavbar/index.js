// @flow

import React from 'react';
import { Link } from 'react-router';

import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

export default fixedCSSModules(styles)(
  class DashboardNavbar extends React.Component<*, *> {
    render() {
      return (
        <div styleName="dashboard-bar">
          <div className="container">
            <Link to="/inbox">Inbox</Link>
            <Link to="/events">Meine Events</Link>
          </div>
        </div>
      );
    }
  },
);
