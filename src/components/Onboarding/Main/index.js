// @flow

import React from 'react';
export * as fixtures from './fixtures';

import Screen1 from '../Screen1';
import Screen2 from '../Screen2';
import Screen3 from '../Screen3';

import FinalScreen from '../FinalScreen';

import { fixedCSSModules } from '../../../utils';

import type { Changeble } from '../../../utils/withSimpleState';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

export type Props = {
  data: Object,
  stage: Changeble<number>,
  onFinishClick: Function,
  onSkipClick: Function,
  onNextClick: Function,
};

const res: (a: Props) => any = applyStyles((props: Props) => {
  const { stage, onNextClick, onFinishClick, onSkipClick, data } = props;

  const screenParams = { stage, onSkipClick, onNextClick, data };

  return (
    <div styleName="background">
      {/*$FlowIssue*/}
      {stage.value === 1 && <Screen1 {...screenParams} />}
      {stage.value === 2 && <Screen2 {...screenParams} />}
      {stage.value === 3 && <Screen3 {...screenParams} />}
      {stage.value === 4 && <FinalScreen onFinishClick={onFinishClick} />}
    </div>
  );
});

export default res;
