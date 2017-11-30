// @flow

import React from 'react';
import R from 'ramda';

import ImageCropper from './ImageCropper';
// import UploadButton from './ImageCropper/UploadButton';

import withSimpleState from '../../../utils/withSimpleState';
import type { Changeble } from '../../../utils/withSimpleState';
import { Panel } from '../Share';
import Button from '../../UIKit/Button';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const TEXTS = {
  HEADER: '1. Lade dein Profilbild hoch',
  DETAILS:
    'Unsere Community freut sich, wenn sie über dein Foto einen ersten guten Eindruck von dir bekommt.',
  UPLOAD: 'Profilbild hochladen',
  REMOVE: 'remove',
  CONTINUE: 'Weiter',
};
export type Props = {
  onSkipClick: Function,
  onNextClick: Function,
  stage: Changeble<number>,
}; // '/static/icons/profile_oval.svg'

type InnerProps = Props & {
  avatar: Changeble<string>,
};
export default R.compose(
  withSimpleState(
    'avatar',
    ({ data: { avatar } }) =>
      avatar && avatar.base64 ? avatar.base64 : avatar,
  ),
  applyStyles,
)(({ onSkipClick, stage, avatar, onNextClick }: InnerProps) => (
  <Panel
    stage={stage}
    header={TEXTS.HEADER}
    detailedText={TEXTS.DETAILS}
    onSkipClick={onSkipClick}
  >
    {/*$FlowIssue*/}
    <ImageCropper
      img={avatar.value}
      styleName="image-cropper"
      onUpload={avatar.onChange}
      RemoveButtonComponent={({ onClick }: { onClick: Function }) => (
        <Button
          onClick={onClick}
          className={`${styles['button-upload']} ${styles.row}`}
          text={TEXTS.REMOVE}
        />
      )}
      PreviewComponent={({ src }) => (
        <div
          className={styles.preview}
          style={{
            backgroundImage: `url(${src || '/static/icons/profile_oval.svg'})`,
          }}
        />
      )}
      uploadButton={
        <Button
          mode="outlined"
          className={`${styles.row}`}
          text={TEXTS.UPLOAD}
        />
      }
    />
    {/*$FlowIssue*/}
    <Button
      styleName="row"
      text={TEXTS.CONTINUE}
      onClick={() => onNextClick({ avatar: avatar.value })}
    />
  </Panel>
));
