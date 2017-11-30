// @flow

import React, { Component } from 'react';
import Circle from '../Circle';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

export default fixedCSSModules(styles)(
  class Amount extends Component<*, *> {
    handleEditAmount(type: string) {
      let { value } = this.props;
      switch (type) {
        case '+':
          if (!this.props.max || value < this.props.max) {
            value++;
          }
          break;
        case '-':
          if (value > 1) {
            value--;
          }
          break;
      }
      this.props.onChange(value);
    }

    render() {
      const alignCenterStyle = { display: 'inline-block', textAlign: 'center' };
      return (
        <div styleName="amount-counter">
          <div style={alignCenterStyle}>
            <Circle
              style={{ cursor: 'pointer' }}
              onClick={() => this.handleEditAmount('-')}
              mode="outline"
              text="-"
              color="orange"
            />
          </div>
          <div style={alignCenterStyle}>
            <Circle mode="fill" text={this.props.value} color="orange" />
          </div>
          <div style={alignCenterStyle}>
            <Circle
              style={{ cursor: 'pointer' }}
              onClick={() => this.handleEditAmount('+')}
              mode="outline"
              text="+"
              color="orange"
            />
          </div>
        </div>
      );
    }
  },
);
