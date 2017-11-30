// @flow

import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
// import * as actions from '../actions';
import {
  intentGoOnboarding,
  intentGoNext,
  onConfirm,
} from '../redux/modules/onboarding/AC';
import { goStage } from '../redux/modules/onboarding';
import Onboarding from '../components/Onboarding';
import type { ReduxState } from '../redux/type';
import { stageMap, invertStageMap } from '../constants/Onboarding';

export default R.compose(
  connect(
    (state: ReduxState) => ({
      onboarding: state.onboarding,
    }),
    {
      intentGoOnboarding,
      intentGoNext,
      goStage,
      onConfirm,
    },
  ),
)(
  class ClassName extends React.Component<*, *> {
    componentWillMount() {
      this.props.intentGoOnboarding(true);
    }
    render() {
      const { onConfirm, intentGoNext, onboarding, goStage } = this.props;

      console.log('onboarding', onboarding);
      return (
        <Onboarding
          stage={{
            value: stageMap[onboarding.stage],
            onChange: id => {
              goStage(invertStageMap[id]);
            },
          }}
          data={onboarding.data || {}}
          onFinishClick={onConfirm}
          onSkipClick={intentGoNext}
          onNextClick={intentGoNext}
        />
      );
    }
  },
);
