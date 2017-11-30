// @flow

import React, { Component } from 'react';
import dimensions from '../../../../decorators/react-dimensions';

class Image extends Component<*, *> {
  render() {
    let {
      mode,
      src,
      height,
      width,
      style,
      filterStyles,
      ...props
    } = this.props;
    let modes = {
      fill: 'cover',
      fit: 'contain',
    };
    let size = modes[mode] || 'contain';

    let defaults = {
      height: height || 100,
      width: width || 100,
    };

    let important = {
      backgroundImage: `url("${src}")`,
      backgroundSize: size,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    };

    return (
      <div>
        {filterStyles && <div style={filterStyles} />}
        <div {...props} style={{ ...defaults, ...style, ...important }} />
      </div>
    );
  }
}

@dimensions({ elementResize: true, containerStyle: {} })
export class AutoHeightImage extends Component<*, *> {
  render() {
    let { containerWidth, aspectRatio, factor, ...rest } = this.props;

    const height = containerWidth / aspectRatio;
    return <Image {...rest} height={height * factor} width={containerWidth} />;
  }
}

@dimensions({ containerStyle: {} })
export class AutoWidthImage extends Component<*, *> {
  render() {
    let { containerHeight, aspectRatio, factor, ...rest } = this.props;

    const width = containerHeight * aspectRatio;
    return <Image {...rest} height={containerHeight} width={width * factor} />;
  }
}

export default Image;
