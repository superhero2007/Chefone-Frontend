// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import Button from '../../UIKit/Button';

import type { Changeble } from '../../../utils/withSimpleState';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const TEXTS = {
  SKIP: 'Überspringen',
};
const NavigationDot = applyStyles(
  ({ active, onClick }: { active: boolean, onClick: Function }) => (
    <div
      styleName={`dot ${active ? 'dot--active' : 'dot--inactive'}`}
      onClick={onClick}
    />
  ),
);
const DotsNavigator = applyStyles(({ stage }: { stage: Changeble<number> }) => (
  <div styleName="dots flex-row">
    <NavigationDot
      active={stage.value === 1}
      onClick={() => stage.onChange(1)}
    />
    <NavigationDot
      active={stage.value === 2}
      onClick={() => stage.onChange(2)}
    />
    <NavigationDot
      active={stage.value === 3}
      onClick={() => stage.onChange(3)}
    />
  </div>
));
const BottomNavigator = applyStyles(
  ({
    stage,
    onSkipClick,
  }: {
    stage: Changeble<number>,
    onSkipClick: Function,
  }) => (
    <div styleName="flex-center bottom-navigator">
      <DotsNavigator stage={stage} />
      <Button
        mode="link"
        styleName="button-skip"
        text={TEXTS.SKIP}
        onClick={onSkipClick}
      />
    </div>
  ),
);
export type PanelProps = {
  children?: *,
  detailedText: string,
  header: string,
  stage: Changeble<number>,
  onSkipClick: Function,
  className?: string,
  theme?: Object,
};
export const Panel = applyStyles(
  ({
    children,
    detailedText,
    header,
    stage,
    onSkipClick,
    theme = {},
  }: PanelProps) => (
    <div styleName="panel" className={theme.panel}>
      <div styleName="sub-panel" className={theme['sub-panel']}>
        <div styleName="top-text row" className={theme.header}>
          {header}
        </div>
        <div styleName="detailed-text row" className={theme['detailed-text']}>
          {detailedText}
        </div>
        {children}
      </div>
      <BottomNavigator onSkipClick={onSkipClick} stage={stage} />
    </div>
  ),
);
