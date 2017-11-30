// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import Nutrition from '../../../constants/Nutrition';
import styles from './index.module.less';
import panelTheme from './panel-theme.module.less';
import Button from '../../UIKit/Button';
import { Panel } from '../Share';
import type { Changeble } from '../../../utils/withSimpleState';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const TEXTS = {
  HEADER: '2. Teile uns deine Menü-Vorlieben mit',
  DETAILS:
    'Wähle deine Menü-Präferenzen aus, damit sich deine Gastgeber gut darauf vorbereiten können.',
  omnivore: 'Ich esse alles',
  vegetarian: 'Vegetarier',
  vegan: 'Veganer',
};
export type Props = {
  onNextClick: Function,
  onSkipClick: Function,
  stage: Changeble<number>,
  data: {
    nutrition: string,
  },
};
export default applyStyles(
  ({ onNextClick, onSkipClick, stage, data: { nutrition } }: Props) => (
    <Panel
      stage={stage}
      onSkipClick={onSkipClick}
      header={TEXTS.HEADER}
      detailedText={TEXTS.DETAILS}
      theme={panelTheme}
    >
      {Object.keys(Nutrition).map((nutritionItem, key) => {
        return (
          <Button
            key={key}
            mode="outlined"
            pressed={nutrition === nutritionItem}
            text={TEXTS[nutritionItem]}
            styleName={`button-prefs icon-${nutritionItem} row`}
            onClick={() =>
              onNextClick({
                nutrition: nutritionItem,
              })
            }
          />
        );
      })}
    </Panel>
  ),
);
