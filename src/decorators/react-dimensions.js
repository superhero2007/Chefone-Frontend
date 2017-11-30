const React = require('react');
const onElementResize = require('element-resize-event');

const defaultContainerStyle = {
  width: '100%',
  height: '100%',
  padding: 0,
  border: 0,
};

const defaultGetWidth = container => {
  if (container && container.clientWidth) {
    return container.clientWidth;
  }
};
const defaultGetHeight = container => {
  if (container && container.clientHeight) {
    return container.clientHeight;
  }
};

/**
 *
 * @example
 * // ES2015
 * import React from 'react'
 * import Dimensions from 'react-dimensions'
 *
 * class MyComponent extends React.Component<*, *> {
 *   render() (
 *     <div
 *       containerWidth={this.props.containerWidth}
 *       containerHeight={this.props.containerHeight}
 *     >
 *     </div>
 *   )
 * }
 *
 *
 */

const awaitValueChange = (acceptFunc, func, timeout) =>
  new Promise(resolve => {
    const interval = setInterval(() => {
      const val = func();
      if (acceptFunc(val)) {
        clearInterval(interval);
        resolve(val);
      }
    }, timeout);
  });

module.exports = function Dimensions(
  {
    getHeight = defaultGetHeight,
    getWidth = defaultGetWidth,
    containerStyle = defaultContainerStyle,
    elementResize = false,
  } = {},
) {
  return ComposedComponent => {
    return class DimensionsHOC extends React.Component<*, *> {
      state = {};
      // Using arrow functions and ES7 Class properties to autobind
      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#arrow-functions;
      // ES7 Class properties
      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers;;;;
      updateDimensions = () => {
        const container = this.refs.container;
        const containerWidth = getWidth(container);
        const containerHeight = getHeight(container);

        if (
          containerWidth !== this.state.containerWidth ||
          containerHeight !== this.state.containerHeight
        ) {
          this.setState({ containerWidth, containerHeight });
        }
      };
      onResize = () => {
        if (this.rqf) return;
        this.rqf = this.getWindow().requestAnimationFrame(() => {
          this.rqf = null;
          this.updateDimensions();
        });
      };
      // If the component is mounted in a different window to the javascript
      // context, as with https://github.com/JakeGinnivan/react-popout
      // then the `window` global will be different from the `window` that
      // contains the component.
      // Depends on `defaultView` which is not supported <IE9;;;;;
      getWindow() {
        return this.refs.container
          ? this.refs.container.ownerDocument.defaultView || window
          : window;
      }

      componentDidMount() {
        if (!this.refs.container) {
          throw new Error('Cannot find container div');
        }

        const container = this.refs.container;

        // setInterval(()=>console.log(defaultGetWidth(this.refs.container)), 20)
        this.updateDimensions();

        const containerWidth = getWidth(container);

        if (!containerWidth) {
          awaitValueChange(
            val => val !== 0,
            () => defaultGetWidth(container),
            200,
          ).then(() => this.updateDimensions());
        }

        if (elementResize) {
          // Experimental: `element-resize-event` fires when an element resizes.
          // It attaches its own window resize listener and also uses
          // requestAnimationFrame, so we can just call `this.updateDimensions`.
          onElementResize(container, this.updateDimensions);
        } else {
          this.getWindow().addEventListener('resize', this.onResize, false);
        }
      }

      componentWillUnmount() {
        this.getWindow().removeEventListener('resize', this.onResize);
      }

      render() {
        return (
          <div style={containerStyle} ref="container">
            {(this.state.containerWidth || this.state.containerHeight) && (
              <ComposedComponent
                {...this.state}
                {...this.props}
                updateDimensions={this.updateDimensions}
              />
            )}
          </div>
        );
      }
    };
  };
};
