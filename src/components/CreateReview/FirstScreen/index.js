// @flow

import React from 'react';
import Rating from '../../UIKit/Rating';
import ChefFoodInfo from '../ChefFoodInfo';
import R from 'ramda';
import Card from '../../UIKit/Card';
import withSimpleState from '../../../utils/withSimpleState';
import ValidationDecorator, {
  checkCompose,
  progressPendingPromise,
  toPlainObject,
} from '../../../decorators/ValidationDecorator';
import FooterWizardLayout from '../../FooterWizardLayout';
import PageHeader from '../PageHeader';

import { LoaderDecorator } from '../../../decorators';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

const FormTextArea = ValidationDecorator()(props => <textarea {...props} />);

const MyRating = ({ value, onChange }) => (
  <Rating
    {...{
      toggledClassName: 'fa fa-heart',
      untoggledClassName: 'fa fa-heart-o',
      halfClassName: 'fa fa-heart',
      iconStyle: {
        fontSize: 40,
      },
      color: '#CE5100',
      defaultRating: value,
      onChange,
    }}
  />
);

const FormMyRating = ValidationDecorator()(props => <MyRating {...props} />);

const getStateToSave = props => {
  return {
    reviewText: props.reviewText,
    submitedRating: props.submitedRating,
  };
};

const REVIEW_REVIEW_TEXT_REQUIRED =
  'Zur Bewertung ist ein vollständiger Text notwendig';
const REVIEW_RATING_REQUIRED = 'Eine Bewertung ist notwendig';
export default R.compose(
  LoaderDecorator({
    condition: ({ chefName }) => chefName,
    isOnlyLoader: true,
  }),
  withSimpleState('nextButtonState', ({ nextButtonState }) => nextButtonState),
  withSimpleState(
    'reviewText',
    ({ reviewText }) => reviewText,
    checkCompose(value => !value && REVIEW_REVIEW_TEXT_REQUIRED),
  ),
  withSimpleState(
    'submitedRating',
    ({ submitedRating }) => submitedRating || null,
    checkCompose(value => value === null && REVIEW_RATING_REQUIRED),
  ),
  fixedCSSModules(styles),
)((props: Object) => {
  const {
    reviewText,
    submitedRating,
    chefName,
    avatar,
    cityName,
    title,
    foodDescription,
    nextButtonState,
    onSubmitForm,
    onNextClick,
    onBackClick,
  } = props;
  return (
    <FooterWizardLayout
      className="row-60 container"
      styleName="footer-wizard-layout"
      loadable
      backButtonText="Go to site"
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
        <div
          className="col-sm-12 col-md-4 col-md-push-8"
          styleName="chef-food-info-wrapper"
        >
          <ChefFoodInfo
            {...{ chefName, avatar, cityName, foodDescription, title }}
          />
        </div>
        <div className="col-sm-12 col-md-8 col-md-pull-4">
          <Card styleName="main-card-wrapper">
            <h1 styleName="main-card-header">Schreibe eine Bewertung</h1>
            <p>
              Bitte teile uns deine Meinung zu dem von dir besuchten Dinner mit
              und sei dabei fair, ehrlich und konstruktiv. Bedenke, dass deine
              Bewertung öffentlich auf dem Profil deines Gastgebers zu sehen
              sein wird und maßgeblichen Einfluss auf dessen Ruf hat. Dein
              Kommentar wird veröffentlicht, sobald er von uns auf etwaige
              Verstöße gegen unsere Bewertungsrichtlinien überprüft worden ist.
            </p>
            <hr />
            <div>Beschreibe deine Erfahrung</div>
            <p>Deine Bewertung wird auf {chefName}s Profil veröffentlicht</p>
            <FormTextArea
              name=""
              id=""
              cols="30"
              rows="10"
              styleName="main-card-text-area"
              {...reviewText}
            />
            <p>
              Bewerte das Essen, Ambiente und die Gastfreundschaft von{' '}
              {chefName}
              . Kein Herz entspricht - CHEF nicht zu empfehlen. Fünf Herzen
              entsprechen - CHEF ist ein Star!
            </p>
            <FormMyRating {...submitedRating} />
          </Card>
        </div>
      </div>
    </FooterWizardLayout>
  );
});
