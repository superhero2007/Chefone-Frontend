//@flow

import R from 'ramda';

export const stageTypes = {
  avatar: 'avatar',
  nutrition: 'nutrition',
  userInfo: 'userInfo',
  finalScreen: 'finalScreen',
};

export const stageMap = {
  [stageTypes.avatar]: 1,
  [stageTypes.nutrition]: 2,
  [stageTypes.userInfo]: 3,
  [stageTypes.finalScreen]: 4,
};

export const invertStageMap = R.invertObj(stageMap);

export const nextStage = (stage: $Keys<typeof stageTypes>) =>
  //$FlowIssue
  invertStageMap[stageMap[stage] + 1 % Object.keys(stageMap).length];

export type stageT = null | $Keys<typeof stageTypes>;
