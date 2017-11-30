// @flow
import React from 'react';
import './index.less';
import success from '../../../static/icons/success.svg';

export const STATE = {
  LOADING: 'loading',
  DISABLED: 'disabled',
  SUCCESS: 'success',
  ERROR: 'error',
  NOTHING: '',
};

const ProgressButton = React.createClass({
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    className: React.PropTypes.string,
    classNamespace: React.PropTypes.string,
    form: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onError: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    state: React.PropTypes.oneOf(Object.keys(STATE).map(k => STATE[k])),
    type: React.PropTypes.string,
    shouldAllowClickOnLoading: React.PropTypes.bool,
  },
  getDefaultProps() {
    return {
      classNamespace: 'pb-',
      durationError: 1200,
      durationSuccess: 500,
      onClick() {},
      onError() {},
      onSuccess() {},
      shouldAllowClickOnLoading: false,
    };
  },
  getInitialState() {
    return {
      currentState: this.props.state || STATE.NOTHING,
    };
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.state === this.props.state) {
      return;
    }
    this.setState({
      currentState: nextProps.state,
    });
  },
  render() {
    let {
      className = '',
      classNamespace,
      children,
      type,
      form,
      ...containerProps
    } = this.props;
    classNamespace = classNamespace || '';

    //$FlowIssue
    containerProps.className =
      classNamespace + 'container ' + this.state.currentState + ' ' + className;
    containerProps.onClick = this.handleClick;
    return (
      <div {...containerProps}>
        <button type={type} form={form} className={classNamespace + 'button'}>
          <span>{children}</span>
          <svg
            className={classNamespace + 'progress-circle'}
            viewBox="0 0 41 41"
          >
            <path d="M38,20.5 C38,30.1685093 30.1685093,38 20.5,38" />
          </svg>
          <svg className={classNamespace + 'checkmark'} viewBox="0 0 70 70">
            <path d="m31.5,46.5l15.3,-23.2" />
            <path d="m31.5,46.5l-8.5,-7.1" />
          </svg>
          <svg className={classNamespace + 'cross'} viewBox="0 0 70 70">
            <path d="m35,35l-9.3,-9.3" />
            <path d="m35,35l9.3,9.3" />
            <path d="m35,35l-9.3,9.3" />
            <path d="m35,35l9.3,-9.3" />
          </svg>
        </button>
      </div>
    );
  },
  handleClick(e) {
    if (
      (this.props.shouldAllowClickOnLoading ||
        this.state.currentState !== 'loading') &&
      this.state.currentState !== 'disabled'
    ) {
      if (this.props.onClick) {
        this.props.onClick(e);
      }
    } else {
      e.preventDefault();
    }
  },
});

export default (props: Object) => {
  const { small, buttonState, children } = props;

  if (small) {
    return (
      <div>
        <ProgressButton
          {...props}
          className={`small-pb ${props.className}`}
          state={buttonState}
        >
          <img
            style={{
              width: 26,
              height: 26,
              marginTop: -3,
              marginLeft: -1,
            }}
            src={success}
          />
        </ProgressButton>
      </div>
    );
  }

  return (
    <ProgressButton {...props} state={buttonState}>
      {children}
    </ProgressButton>
  );
};
