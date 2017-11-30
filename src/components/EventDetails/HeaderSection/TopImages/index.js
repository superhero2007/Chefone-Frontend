// @flow

import React, { Component } from 'react';
import { AutoHeightImage } from './Image';
import '../../../../../styles/index.less';
import ArrowCarousel from '../../../UIKit/ArrowCarousel';
import { IsMobileDecorator } from '../../../../decorators';
import DynamicContainer from './DynamicContainer';

import styles from './index.module.less';

export default IsMobileDecorator()(
  class extends Component<*, *> {
    render() {
      let { images, isMobile, filterColor } = this.props;

      const filterStyles = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: filterColor,
        zIndex: '2',
        opacity: '0.4',
      };

      images = images.filter(id => id);

      const ContainerData = isMobile
        ? {
            Container: ArrowCarousel,
            containterProps: {
              speed: 500,
              infinite: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              options: {
                autoplaySpeed: 2000,
                autoplay: true,
                prevArrow: null,
                nextArrow: null,
              },
            },
          }
        : {
            Container: ({ children, className, ...rest }) => {
              return (
                <div
                  {...rest}
                  className={`${className} ${
                    styles['top-images-background-container']
                  }`}
                >
                  {children}
                </div>
              );
            },
            containterProps: {
              className: styles['top-images'],
              style: { width: '100%' },
            },
          };

      const factor = isMobile ? 1 : images.length / 4;

      return (
        <DynamicContainer {...ContainerData}>
          {images.map((image, key) => (
            <div
              key={key}
              style={{
                position: 'relative',
                width: `${100 / images.length}%`,
              }}
            >
              <AutoHeightImage
                mode="fill"
                filterStyles={filterStyles}
                factor={factor}
                aspectRatio={1}
                src={image}
              />
            </div>
          ))}
        </DynamicContainer>
      );
    }
  },
);
