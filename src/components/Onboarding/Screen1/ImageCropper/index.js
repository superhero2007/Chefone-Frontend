// @flow

import React, { Component } from 'react';
import type { ChildrenArray } from 'react';
import R from 'ramda';

import withSimpleState from '../../../../utils/withSimpleState';
import type { Changeble } from '../../../../utils/withSimpleState';
import UploadButton from './UploadButton';

import { fixedCSSModules } from '../../../../utils';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

let AvatarCropper;

type RemoveButtonComponentT =
  | React$Component<*, *, *>
  | ((a: any) => React$Element<*>);
export type Props = {
  styleName?: string,
  className?: string,
  img?: string,
  children?: ChildrenArray<*>,
  PreviewComponent: React$Component<*, *> | ((a: any) => React$Element<*>),
  RemoveButtonComponent: RemoveButtonComponentT,
  onUpload: Function,
  uploadButton: any,
};

type InnerProps = Props & {
  img: Changeble<string>,
  croppedImg: Changeble<string>,
  cropperOpen: Changeble<boolean>,
};

//$FlowIssue
const res: (props: Props) => React$Element<*> = R.compose(
  withSimpleState('cropperOpen', () => false),
  withSimpleState('croppedImg', ({ img }) => img),
  withSimpleState('img', ({ img }) => img),
  applyStyles,
)(
  class extends Component<*, *> {
    props: InnerProps;
    componentDidMount() {
      AvatarCropper = require('react-avatar-cropper');
    }

    render() {
      const {
        uploadButton,
        croppedImg,
        img,
        className,
        cropperOpen,
        onUpload,
        //$FlowIssue
        PreviewComponent,
        //$FlowIssue
        RemoveButtonComponent,
      } = this.props;

      console.log(this.props);

      return (
        <div styleName="image-cropper" className={className}>
          <PreviewComponent src={croppedImg.value} />
          {croppedImg.value && (
            <RemoveButtonComponent
              onClick={() => {
                if (onUpload) {
                  onUpload(null);
                }
                croppedImg.onChange(null);
              }}
            />
          )}
          {!croppedImg.value && (
            <UploadButton
              handleFileChange={dataURI => {
                console.log('uploaded');
                img.onChange(dataURI);
                cropperOpen.onChange(true);
              }}
              uploadButton={uploadButton}
            />
          )}
          {cropperOpen.value && (
            <AvatarCropper
              onRequestHide={() => cropperOpen.onChange(false)}
              cropperOpen={cropperOpen.value}
              onCrop={dataURI => {
                console.log('cropped');
                cropperOpen.onChange(false);
                croppedImg.onChange(dataURI);
                img.onChange(null);
                if (onUpload) {
                  onUpload({ base64: dataURI });
                }
              }}
              image={img.value}
            />
          )}
        </div>
      );
    }
  },
);

export default res;
