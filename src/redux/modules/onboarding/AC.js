// @flow

import { push } from 'react-router-redux';
import R from 'ramda';
import { stageTypes } from '../../../constants/Onboarding';
import { numberNutritionMap } from '../../../constants/Nutrition';
import { createAction } from 'redux-actions';
import type { GetState } from '../../type';
import { setIntentional, ACTIONS } from './';
import { promiseDispatch } from '../../../utils';
import { user } from '../../../server/api';
import { getLocation } from '../../../selectors';
import { updateSession } from '../../../actions/auth';

export const onConfirm = () =>
  promiseDispatch(
    'ON_CONFIRM_ACTION',
    async (dispatch: Function, getState: GetState) => {
      const { state } = getLocation(getState());
      if (state && state.proceedTo) {
        const eventLink = state.proceedTo.replace('order', 'event');
        dispatch(push(eventLink));
      } else {
        dispatch(push('/discover'));
      }

      const { onboarding: { data } } = getState();
      if (data) {
        await user.setSecondaryUserData(data);
        await dispatch(updateSession());
      }
    },
  );

export const intentGoOnboarding = (intentional: boolean) => (
  dispatch: Function,
) => {
  dispatch(setIntentional(intentional));
  dispatch(intentGoNext());
};

export const intentGoNext = (commitedData: *) => (
  dispatch: Function,
  getState: GetState,
) => {
  const { onboarding: { stage } } = getState();

  const stageIntentMap = {
    null: {
      stage: stageTypes.avatar,
      getFields: ({ avatar }) => ({ avatar }),
    },
    [stageTypes.avatar]: {
      stage: stageTypes.nutrition,
      getFields: ({ nutrition }) => {
        return { nutrition: numberNutritionMap[nutrition] };
      },
    },
    [stageTypes.nutrition]: {
      stage: stageTypes.userInfo,
      getFields: ({ birthday, bio, location }) => ({ birthday, bio, location }),
    },
    [stageTypes.userInfo]: {
      stage: stageTypes.finalScreen,
      // hack to move to screen
      getFields: () => ({ hack: true }),
    },
    [stageTypes.finalScreen]: null,
  };

  const action = stageIntentMap[stage === null ? 'null' : stage];

  if (action) {
    dispatch(intentGoTo(action)(commitedData));
  }
};

const intentGoTo = ({
  stage,
  getFields,
}: {
  stage: $Keys<typeof stageTypes>,
  getFields: Function,
}) => (commitedData: *) => (dispatch: Function, getState: GetState) => {
  let { onboarding: { intentional } } = getState();
  const fields = getFields(getState().session);
  const isAllValuesDefined = R.compose(R.all(field => !!field), R.values);

  console.log('fields', fields);

  intentional = true;
  if (intentional || !isAllValuesDefined(fields)) {
    dispatch(
      createAction(ACTIONS.ONBOARDING_MOVE_STAGE)({
        data: {
          ...fields,
          ...commitedData,
        },
        stage,
      }),
    );
    return;
  }

  dispatch(
    createAction(ACTIONS.ONBOARDING_MOVE_STAGE)({
      data: {
        ...fields,
        ...commitedData,
      },
      stage,
    }),
  );
  dispatch(intentGoNext());
};
