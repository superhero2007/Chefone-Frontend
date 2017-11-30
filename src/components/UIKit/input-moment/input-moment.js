// @flow

import cx from 'classnames';
import React from 'react';
import Calendar from './calendar';
import Time from './time';

import { fixedCSSModules } from '../../../utils';
import styles from './less/input-moment.module.less';

export default fixedCSSModules(styles)(
  class extends React.Component<*, *> {
    state: {
      tab: number,
    };

    state = {
      tab: 0,
    };

    render() {
      const { tab } = this.state;
      const { moment: m, onChange, prevMonthIcon, nextMonthIcon } = this.props;

      return (
        <div styleName="m-input-moment">
          <div styleName="options">
            <button
              type="button"
              styleName={cx('ion-calendar im-btn', { 'is-active': tab === 0 })}
              onClick={this.handleClickTab.bind(null, 0)}
            >
              Date
            </button>
            <button
              type="button"
              styleName={cx('ion-clock im-btn', { 'is-active': tab === 1 })}
              onClick={this.handleClickTab.bind(null, 1)}
            >
              Time
            </button>
          </div>

          <div styleName="tabs">
            {tab === 0 && (
              <Calendar
                moment={m}
                onChange={onChange}
                prevMonthIcon={prevMonthIcon}
                nextMonthIcon={nextMonthIcon}
              />
            )}
            {tab === 1 && <Time moment={m} onChange={onChange} />}
          </div>
        </div>
      );
    }

    handleClickTab = (tab: number, e: Object) => {
      e.preventDefault();
      this.setState({ tab });
    };
  },
);
