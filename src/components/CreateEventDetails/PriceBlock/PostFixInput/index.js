//@flow

import React from 'react';
import ReactDOM from 'react-dom';

// this all hard porn below is to make input with postFix currencySymbol - 12$

var ContentEditable = React.createClass({
  render: function() {
    return (
      <div
        className={this.props.className}
        style={this.props.style}
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{ __html: this.props.html }}
      />
    );
  },
  shouldComponentUpdate: function(nextProps) {
    //$FlowIssue
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  },
  emitChange: function() {
    //$FlowIssue
    var html = ReactDOM.findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html,
        },
      });
    }
    //$FlowIssue
    this.lastHtml = html;
  },
});

export default ({
  className,
  style,
  value,
  onChange,
  postfixName = 'dollar',
  postfixValue = '$',
}: {
  className: string,
  style: Object,
  value: *,
  onChange: *,
  postfixName?: string,
  postfixValue?: string,
}) => (
  <div style={style}>
    <style
      dangerouslySetInnerHTML={{
        __html: `.input-with-postfix-${postfixName}:after {
      content: " ${postfixValue}";
      display: inline;
    }`,
      }}
    />
    <ContentEditable
      className={`${className ? className : ''} input-with-postfix-${
        postfixName
      }`}
      style={{
        position: 'relative',
      }}
      html={value}
      onChange={onChange}
    />
  </div>
);
