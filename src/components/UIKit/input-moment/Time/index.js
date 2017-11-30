// @flow

export * as fixtures from './fixtures';
import cx from 'classnames';
import React from 'react';
import R from 'ramda';
import { withState } from 'recompose';
import InputSlider from 'react-input-slider';
import WithSaveButton from '../WithSaveButton';
import type { Changeble } from '../../../../utils/withSimpleState';
import { fixedCSSModules } from '../../../../utils';
import styles from './index.module.less';

export type PropsT = {
  hour?: number,
  minute?: number,
  onSave: Function,
};

export type InnerPropsT = {
  hour: Changeble<number>,
  minute: Changeble<number>,
} & PropsT;

export default R.compose(
  withState('hour', 'onChangeHour', 0),
  withState('minute', 'onChangeMinute', 0),
  fixedCSSModules(styles),
)(
  class extends React.Component<*, *> {
    static displayName = 'Time';

    render() {
      const {
        moment: m,
        className,
        onChangeMinute,
        onChangeHour,
        onSave,
      } = this.props;

      return (
        <WithSaveButton onSave={() => onSave(m)}>
          {
            <div styleName={cx('m-time', className)}>
              <div styleName="showtime">
                <span styleName="time">{m.format('HH')}</span>
                <span styleName="separater">:</span>
                <span styleName="time">{m.format('mm')}</span>
              </div>

              <div styleName="sliders">
                <div styleName="time-text">Hours:</div>
                <InputSlider
                  className={styles['u-slider-time']}
                  xmin={0}
                  xmax={23}
                  x={m.hour()}
                  onChange={(pos: Object) => {
                    m.hours(parseInt(pos.x, 10));
                    onChangeHour(m);
                  }}
                />
                <div styleName="time-text">Minutes:</div>
                <InputSlider
                  className={styles['u-slider-time']}
                  xmin={0}
                  xmax={59}
                  x={m.minute()}
                  onChange={(pos: Object) => {
                    m.minutes(parseInt(pos.x, 10));
                    onChangeMinute(m);
                  }}
                />
              </div>
            </div>
          }
        </WithSaveButton>
      );
    }
  },
);
