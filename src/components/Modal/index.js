// @flow

import React from 'react';
import cx from 'classnames';
import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';
import defTheme from './theme.module.less';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../animations.css';

const TRANSITION_TIME = 500;

export type ModalProps = {
  className?: string,
  theme?: Object,
};

class Modal extends React.Component<*, *> {
  state: {
    showed: boolean,
  };
  onClick: Function;

  constructor() {
    super();
    this.state = {
      showed: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  componentWillUnmount() {
    //$FlowIssue
    document.documentElement.style.overflowY = 'auto';
  }

  componentDidMount() {
    //$FlowIssue
    document.documentElement.style.overflowY = 'hidden';
    this.setState({ showed: true });
  }

  onClick() {
    this.setState({ showed: false });
    const { router }: { router: Object } = this.context;
    const {
      returnTo,
      onCloseClick,
    }: { returnTo?: string, onCloseClick?: Function } = this.props;

    const onClick = () => {
      //$FlowIssue
      document.documentElement.style.overflowY = 'auto';
      (onCloseClick || (() => router.replace(returnTo)))();
    };
    setTimeout(onClick, TRANSITION_TIME);
  }

  render() {
    const { className, theme = defTheme }: ModalProps = this.props;

    return (
      <div styleName="chef-modal">
        <ReactCSSTransitionGroup
          transitionName="anim-fadein"
          transitionEnterTimeout={TRANSITION_TIME}
          transitionLeaveTimeout={TRANSITION_TIME}
        >
          {this.state.showed && (
            <div styleName="chef-modal__dark" onClick={this.onClick} />
          )}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="anim-top"
          transitionEnterTimeout={TRANSITION_TIME}
          transitionLeaveTimeout={TRANSITION_TIME}
        >
          {this.state.showed && (
            <div
              styleName="chef-modal__content"
              className={cx(className ? className : '', theme['modal-content'])}
            >
              <div styleName="chef-modal__content__wrapper">
                {this.props.children}
              </div>
              <a styleName="close-btn" onClick={this.onClick} />
            </div>
          )}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Modal.contextTypes = {
  router: React.PropTypes.object,
};

export default fixedCSSModules(styles)(Modal);
