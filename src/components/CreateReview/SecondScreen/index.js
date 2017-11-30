// @flow

import React from 'react';
import ChefFoodInfo from '../ChefFoodInfo';
import Card from '../../UIKit/Card';
import R from 'ramda';
import withSimpleState from '../../../utils/withSimpleState';
import ValidationDecorator, {
  progressPendingPromise,
  toPlainObject,
} from '../../../decorators/ValidationDecorator';
import FooterWizardLayout from '../../FooterWizardLayout';
import PageHeader from '../PageHeader';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

const FormTextArea = ValidationDecorator()(props => <textarea {...props} />);

const getStateToSave = props => {
  return {
    reviewCompanyText: props.reviewCompanyText,
  };
};

export default R.compose(
  withSimpleState('nextButtonState', ({ nextButtonState }) => nextButtonState),
  withSimpleState(
    'reviewCompanyText',
    ({ reviewCompanyText }) => reviewCompanyText,
  ),
  fixedCSSModules(styles),
)((props: Object) => {
  const {
    reviewCompanyText,
    nextButtonState,
    onSubmitForm,
    onNextClick,
    chefName,
    avatar,
    title,
    cityName,
    foodDescription,
    onBackClick,
  } = props;
  return (
    <FooterWizardLayout
      className="row-60 container"
      loadable
      styleName="footer-wizard-layout"
      onNextClick={async () => {
        const myProgressBarClickProc = progressPendingPromise(nextButtonState);
        const stateToSubmit = getStateToSave(props);

        await onSubmitForm(stateToSubmit);

        return await myProgressBarClickProc(
          () => Promise.resolve(),
          onNextClick,
        )(stateToSubmit);
      }}
      onBackClick={() => onBackClick(toPlainObject(getStateToSave(props)))}
      nextButtonState={nextButtonState}
    >
      <PageHeader value="Bewerte dein Dinner" />
      <div className="row">
        <div className="col-sm-12 col-md-4 col-md-push-8">
          <ChefFoodInfo
            {...{ chefName, avatar, cityName, foodDescription, title }}
          />
        </div>
        <div className="col-sm-12 col-md-8 col-md-pull-4">
          <Card styleName="chef-food-info-wrapper">
            <p>Möchtest du gerne noch was an CHEF.ONE los werden?</p>
            <p>Dieses Kommentar wird nicht veröffentlicht</p>
            <FormTextArea
              name=""
              id=""
              cols="30"
              rows="10"
              styleName="main-card-text-area"
              {...reviewCompanyText}
            />
          </Card>
        </div>
      </div>
    </FooterWizardLayout>
  );
});
