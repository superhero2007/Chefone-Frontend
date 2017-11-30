// @flow

import React, { Component } from 'react';
import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

class TextSeeMore extends Component<*, *> {
  defaultProps = {
    maxHeight: 20,
  };
  state: {
    hasMore: boolean,
    showAll: boolean,
  };

  constructor() {
    super();
    this.state = { hasMore: false, showAll: false };
  }

  componentDidMount() {
    if (
      this.refs.text.offsetHeight > this.props.maxHeight &&
      !this.state.hasMore
    ) {
      // eslint-disable-next-line
      this.setState({ hasMore: true });
    }
  }

  componentDidUpdate() {
    if (
      this.refs.text.offsetHeight > this.props.maxHeight &&
      !this.state.hasMore
    ) {
      // eslint-disable-next-line
      this.setState({ hasMore: true });
    }
  }

  render() {
    const { showAll, hasMore } = this.state;
    const { className, textClassName } = this.props;

    return (
      <div className={className}>
        <div
          styleName={showAll ? 'show-all' : 'more_hide'}
          style={{
            height: showAll ? 'auto' : this.props.maxHeight,
          }}
        >
          <p ref="text" styleName="text-wrapper" className={textClassName}>
            {this.props.children}
          </p>
        </div>
        {hasMore &&
          !showAll && (
            <a
              onClick={() => this.setState({ showAll: true })}
              styleName="text-see-more-see-more"
            >
              {this.props.seeMoreText || 'Mehr'}
            </a>
          )}
      </div>
    );
  }
}

export default fixedCSSModules(styles)(TextSeeMore);
