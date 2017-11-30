// @flow

import React from 'react';
import Rating from '../../UIKit/Rating';
import R from 'ramda';
import withSimpleState from '../../../utils/withSimpleState';
import Card from '../../UIKit/Card';
import { progressPendingPromise } from '../../../decorators/ValidationDecorator';
import ChefFoodInfo from '../ChefFoodInfo';
import FooterWizardLayout from '../../FooterWizardLayout';
import PageHeader from '../PageHeader';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

const MyRating = ({ value }) => (
  <Rating
    {...{
      toggledClassName: 'fa fa-heart fa-2x',
      untoggledClassName: 'fa fa-heart-o fa-2x',
      halfClassName: 'fa fa-heart fa-2x',
      color: '#CE5100',
      viewOnly: true,
      iconStyle: {
        fontSize: 40,
      },
      defaultRating: value,
    }}
  />
);

export default R.compose(
  withSimpleState('nextButtonState', ({ nextButtonState }) => nextButtonState),
  fixedCSSModules(styles),
)((props: Object) => {
  const {
    reviewText,
    submitedRating,
    nextButtonState,
    pendingActionFunc,
    chefName,
    avatar,
    cityName,
    foodDescription,
    title,
    onSubmitForm,
    onBackClick,
    onNextClick,
  } = props;

  return (
    <FooterWizardLayout
      className="row-60 container"
      loadable
      styleName="footer-wizard-layout"
      onNextClick={async () => {
        const myProgressBarClickProc = progressPendingPromise(nextButtonState);

        await onSubmitForm();

        return await myProgressBarClickProc(pendingActionFunc, onNextClick)({});
      }}
      onBackClick={onBackClick}
      nextButtonText="Senden"
      nextButtonState={nextButtonState}
    >
      <PageHeader value="Übersicht" />
      <div className="row">
        <div className="col-sm-12 col-md-4 col-md-push-8">
          <ChefFoodInfo
            {...{ chefName, avatar, cityName, foodDescription, title }}
          />
        </div>

        <div className="col-sm-12 col-md-8 col-md-pull-4">
          <Card styleName="chef-food-info-wrapper">
            <div className="text-center">
              <h3 styleName="summary-header">Übersicht deiner Bewertung</h3>
            </div>
            <div>{reviewText}</div>
            <hr styleName="grey-line" />
            <div className="text-center">
              <MyRating value={submitedRating} />
            </div>
            <hr styleName="grey-line" />
          </Card>
        </div>
      </div>
    </FooterWizardLayout>
  );
});
