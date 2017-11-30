// @flow

import { createAction, handleActions } from 'redux-actions';

import type { stageT } from '../../../constants/Onboarding';
import type { SecondaryDataT } from '../../../server/api/user';

export const ACTIONS = {
  ONBOARDING_GO_STAGE: 'ONBOARDING_GO_STAGE',
  ONBOARDING_SET_INTENTIONAL: 'ONBOARDING_SET_INTENTIONAL',
  ONBOARDING_MOVE_STAGE: 'ONBOARDING_MOVE_STAGE',
  ONBOARDING_COMPLETE: 'ONBOARDING_COMPLETE',
};

export const goStage = (stage: string) =>
  createAction(ACTIONS.ONBOARDING_GO_STAGE)(stage);
export const setIntentional = createAction(ACTIONS.ONBOARDING_SET_INTENTIONAL);
export const complete = createAction(ACTIONS.ONBOARDING_COMPLETE);

export type Type = {
  intentional?: boolean,
  stage: stageT,
  data: SecondaryDataT | null,
};

const defaultState: Type = {
  stage: null,
  data: null,
};

const reducer = (state: Type, { payload: { stage, data } }) => {
  if (state.data === null && data === null) {
    return {
      ...state,
      stage,
      data: null,
    };
  }

  return {
    ...state,
    stage,
    data: {
      ...(state.data === null ? {} : state.data),
      ...(data === null ? {} : data),
    },
  };
};

export default handleActions(
  {
    [ACTIONS.ONBOARDING_COMPLETE]: () => defaultState,
    [ACTIONS.ONBOARDING_GO_STAGE]: (state, { payload }) => ({
      ...state,
      stage: payload,
    }),
    [ACTIONS.ONBOARDING_SET_INTENTIONAL]: (state, { payload }) => ({
      ...defaultState,
      intentional: payload,
    }),
    [ACTIONS.ONBOARDING_MOVE_STAGE]: reducer,
  },
  defaultState,
);
