// @flow

import React, { Component } from 'react';

import { fixedCSSModules } from '../../../../../utils';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

export type Props = {
  handleFileChange: Function,
  uploadButton: React$Element<*>,
};

export default applyStyles(
  class extends Component<*, *> {
    props: Props;
    render() {
      const { uploadButton, handleFileChange } = this.props;

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
                handleFileChange(img.target.result);
              };
              reader.readAsDataURL(file);
            }}
          />
          {uploadButton}
        </div>
      );
    }
  },
);
