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
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  },
  emitChange: function() {
    var html = ReactDOM.findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html,
        },
      });
    }
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
}) => (
  <div className={className} style={style}>
    <style
      dangerouslySetInnerHTML={{
        __html: `.input-with-postfix-${postfixName}:after {
      content: "${postfixValue}";
      display: inline;
    }`,
      }}
    />
    <ContentEditable
      className={`${className} input-with-postfix-${postfixName}`}
      style={{
        position: 'relative',
      }}
      html={value}
      onChange={onChange}
    />
  </div>
);
