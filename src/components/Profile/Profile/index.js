import React from 'react';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import TextSeeMore from '../../TextSeeMore';
const ui = {
  cooked: 'Bekocht',
  takePart: 'Teilgenommen',
};

const applyStyles = fixedCSSModules(styles, { allowMultiple: true });
export type PropsT = {
  userData: {
    avatar: string,
    name: string,
    age: string,
    cooked: string,
    takePart: string,
  },
};
const UserInfo = applyStyles(
  ({ userData: { avatar, name, age, cooked, takePart } }: PropsT) => (
    <div>
      <img styleName="avatar" src={avatar} alt={name} />
      <div styleName="textblock">
        <div styleName="header">
          <span styleName="name">{name}</span>
          <span styleName="age">{`(${age})`}</span>
        </div>
        <div styleName="sub-info">
          <div styleName="ui">{ui.cooked}</div>
          <div styleName="value">{cooked}</div>
        </div>
        <div styleName="sub-info">
          <div styleName="ui">{ui.takePart}</div>
          <div styleName="value">{takePart}</div>
        </div>
      </div>
    </div>
  ),
);

const Bottom = applyStyles(({ userData, ...props }) => (
  <div {...props}>
    <div styleName="row-icon icon-briefcase">{userData.profession}</div>
    <div styleName="row-icon icon-icons-headder_gast-01-sketch">
      {userData.location}
    </div>
    <div styleName="row-icon icon-open-book">
      {userData.languages.join(', ')}
    </div>
  </div>
));

const ProfileContainer = applyStyles(({ userData }) => (
  <div styleName="panel">
    <UserInfo styleName="user-info row" userData={userData} />
    <TextSeeMore maxHeight={200} styleName="about row" seeMoreText="Mehr">
      {userData.about}
    </TextSeeMore>
    <div styleName="separator row" userData={userData} />
    <Bottom styleName="bottom-info" userData={userData} />
  </div>
));

export default ProfileContainer;
