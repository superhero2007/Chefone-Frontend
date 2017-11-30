// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import ChefInfo from '../../ChefInfo';
import type { Props as ChefInfoProps } from '../../ChefInfo';
import TextSeeMore from '../../TextSeeMore';

export type Props = ChefInfoProps & { about: string };

const CHEFINFO_HEADER = 'GASTGEBER';

export default fixedCSSModules(styles)(
  ({ value: { avatar, name, address, rating, about } }: { value: Props }) => (
    <div styleName="component">
      <h2 className="hide-desktop">{CHEFINFO_HEADER}</h2>
      <ChefInfo
        {...{
          avatar,
          name,
          address,
          rating,
        }}
      />
      <hr />
      <TextSeeMore maxHeight={180} styleName="about" seeMoreText="Mehr">
        {about}
      </TextSeeMore>
    </div>
  ),
);
