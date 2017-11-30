// @flow

import React from 'react';

import R from 'ramda';
import withSimpleState from '../../utils/withSimpleState';
import SvgIcon from '../SvgIcon';

import styles from './index.module.less';
import { fixedCSSModules } from '../../utils';
const applyStyles = fixedCSSModules(styles);

const FileUpload = applyStyles(
  class extends React.Component<*, *> {
    render() {
      return (
        <div styleName="file-upload-container">
          <input
            styleName="file-upload"
            ref="in"
            type="file"
            accept="image/*"
            onChange={e => {
              const reader = new FileReader();
              const file = e.target.files[0];

              if (!file) {
                return;
              }

              reader.onload = img => {
                this.refs.in.value = '';
                this.props.handleFileChange(img.target.result);
              };
              reader.readAsDataURL(file);
            }}
          />
        </div>
      );
    }
  },
);

let AvatarCropper;

export default R.compose(
  withSimpleState('cropperOpen', () => false),
  withSimpleState('croppedImg', ({ img }) => img),
  withSimpleState('img', ({ img }) => img),
  applyStyles,
)(
  class ImageCropper extends React.Component<*, *> {
    componentDidMount() {
      AvatarCropper = require('react-avatar-cropper');
    }

    render() {
      const {
        title,
        croppedImg,
        img,
        width,
        height,
        style,
        cropperOpen,
        className,
        onRemove,
        onUpload,
      } = this.props;
      return (
        <div
          styleName="component"
          style={{ width, height, position: 'relative' }}
        >
          <div className={`${className}`} style={{ width, height, ...style }}>
            <div styleName="avatar-edit" className="avatar-edit">
              <span>{title}</span>
            </div>
            <div
              styleName="preview"
              style={{ backgroundImage: `url(${croppedImg.value})` }}
            />
          </div>

          {croppedImg.value ? (
            <SvgIcon
              finalIcon={require('../../../static/icons/remove_orange.svg')}
              onClick={() => {
                if (onRemove) {
                  onRemove();
                }
                croppedImg.onChange(null);
              }}
            />
          ) : (
            <a styleName="upload-btn">
              upload
              <FileUpload
                handleFileChange={dataURI => {
                  img.onChange(dataURI);
                  cropperOpen.onChange(true);
                }}
              />
            </a>
          )}

          {cropperOpen.value && (
            <AvatarCropper
              onRequestHide={() => cropperOpen.onChange(false)}
              cropperOpen={cropperOpen.value}
              onCrop={dataURI => {
                cropperOpen.onChange(false);
                croppedImg.onChange(dataURI);
                img.onChange(null);
                if (onUpload) {
                  onUpload(dataURI);
                }
              }}
              image={img.value}
              style={{ width, height }}
            />
          )}
        </div>
      );
    }
  },
);
