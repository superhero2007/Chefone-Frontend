// @flow

export * as fixtures from './fixtures';
import React from 'react';
import ImageCropper from '../../ImageCropper';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

import { Row, Col } from 'react-flexbox-grid';

export type PropsT = {
  value: Array<string>,
  style: Object,
  onRemoveImage: Function,
  onUploadImage: Function,
};

export default applyStyles(
  ({ value, style, onRemoveImage, onUploadImage }: PropsT) => (
    <div styleName="block">
      <Row styleName="row">
        <Col xs={12} styleName="column">
          <p>Lade drei Bilder deines Dinners hoch</p>
          <Row styleName="create-event-images">
            {value.map((img, key) => (
              <Col xs={4} styleName="image" style={style}>
                <ImageCropper
                  width="100%"
                  height="100%"
                  key={key}
                  img={img}
                  onRemove={() => onRemoveImage({ index: key })}
                  onUpload={img => onUploadImage({ index: key, img })}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  ),
);
