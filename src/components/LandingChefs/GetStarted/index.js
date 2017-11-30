// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

const ui = {
  head: 'So wirst du Gastgeber auf CHEF.ONE:',
  blocks: [
    {
      num: 1,
      head: 'Tritt unserer Community bei',
      text:
        'Sei Teil einer großen Familie aus Genießern und lass dich inspirieren von den Events anderer Gastgeber.',
    },
    {
      num: 2,
      head: 'Kreiere dein Menü',
      text:
        'Lade dein erstes kulinarisches Event hoch (Dinner, Tasting, Kochkurs …). Wir unterstützen dich gerne und jederzeit bei deiner Planung.',
    },
    {
      num: 3,
      head: 'Halte dich auf dem Laufenden',
      text:
        'Sobald wir dein Event freigeben, kannst du deine Buchungen nachverfolgen und Kontakt zu deinen Gästen aufnehmen.',
    },
    {
      num: 4,
      head: 'Starte als Gastgeber durch',
      text:
        'Zeige deine Leidenschaft als Gastgeber und beschere deinen Gästen ein unvergessliches Dinner. Wir freuen uns auf viele kulinarische Events mit dir.',
    },
  ],
};
type BlockProps = {
  num: number,
  head: string,
  text: string,
};
const StartedBlock = applyStyles(({ num, head, text }: BlockProps) => (
  <div styleName="text-block">
    <div styleName="number">{num}</div>
    <div styleName="block-head">{head}</div>
    <div styleName="text">{text}</div>
  </div>
));
const GetStarted = applyStyles(() => (
  <div styleName="component">
    <div styleName="head">{ui.head}</div>
    <div styleName="blocks">{ui.blocks.map(StartedBlock)}</div>
  </div>
));
export default GetStarted;
