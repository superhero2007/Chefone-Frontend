// @flow

export * as fixtures from './fixtures';
import React from 'react';
import TextWithBackground from '../../TextWithBackground';
import Amount from '../Amount';
import FoodTypeSelector from '../FoodTypeSelector';
import EventDatePicker from '../EventDatePicker';
import EventTimePicker from '../EventTimePicker';
import R from 'ramda';
import moment from 'moment';
import FooterWizardLayout from '../../FooterWizardLayout';
import { withReducer } from 'recompose';
import withSimpleState from '../../../utils/withSimpleState';
import type { Changeble } from '../../../utils/withSimpleState';
import { loc } from '../../../localization';
import { createAction, handleActions } from 'redux-actions';
import ValidationDecorator, {
  checkCompose,
  progressPendingPromise,
  toPlainObject,
} from '../../../decorators/ValidationDecorator';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
import textWithBackgroundTheme from './text-with-background.theme.module.less';

import { Row, Col } from 'react-flexbox-grid';

const ModeActions = {
  CHANGE_DATE_EDIT_MODE: 'CHANGE_DATE_EDIT_MODE',
  CHANGE_TIME_EDIT_MODE: 'CHANGE_TIME_EDIT_MODE',
};

const modeDefaultState = {
  showDatePicker: true,
  datePickerEditMode: false,
  showTimePicker: true,
  timePickerEditMode: false,
  showRest: true,
};

const modeReducer = handleActions(
  {
    [ModeActions.CHANGE_DATE_EDIT_MODE]: ({ showDatePicker }, { payload }) => ({
      showDatePicker: true,
      showTimePicker: !payload,
      datePickerEditMode: payload,
      timePickerEditMode: false,
      showRest: !payload,
    }),
    [ModeActions.CHANGE_TIME_EDIT_MODE]: ({ showTimePicker }, { payload }) => ({
      showDatePicker: !payload,
      showTimePicker: true,
      datePickerEditMode: false,
      timePickerEditMode: payload,
      showRest: !payload,
    }),
  },
  modeDefaultState,
);

const getStateToSave = props => {
  let finalEvent = null;
  if (props.eventMomentDate.value && props.eventMomentTime.value) {
    finalEvent =
      props.eventMomentDate.value
        .clone()
        .set('hour', props.eventMomentTime.value.get('hour'))
        .set('minute', props.eventMomentTime.value.get('minute'))
        .unix() * 1000;
  }

  return {
    title: props.title,
    foodDescription: props.foodDescription,
    amountOfPeople: props.amountOfPeople,
    nutrition: props.nutrition,
    eventMomentDate: { ...props.eventMomentDate },
    eventMomentTime: { ...props.eventMomentTime },
    eventMoment: { value: finalEvent },
  };
};

const FormInput = ValidationDecorator()(props => <input {...props} />);
const FormTextArea = ValidationDecorator()(props => <textarea {...props} />);
const FormEventDatePicker = ValidationDecorator()(props => (
  <EventDatePicker {...props} />
));
const FormEventTimePicker = ValidationDecorator()(props => (
  <EventTimePicker {...props} />
));

export type PropsT = {};

export type InnerPropsT = PropsT & {
  nextButtonState: Object,
  city: {
    city_image_web: {
      url: string,
    },
    city: string,
  },
  title: Changeble<string>,
  dateError: Object,
  foodDescription: Changeble<string>,
  amountOfPeople: Changeble<string>,
  nutrition: Changeble<string>,
  eventMomentDate: Changeble<string>,
  eventMomentTime: Changeble<string>,
  onBackClick: Function,
  onNextClick: Function,
  onSubmitForm: Function,
  dispatch: Function,
  mode: {
    datePickerEditMode: boolean,
    timePickerEditMode: boolean,
    showDatePicker: boolean,
    showTimePicker: boolean,
    showRest: boolean,
  },
};

export default R.compose(
  withSimpleState('nextButtonState', ({ nextButtonState }) => nextButtonState),
  withReducer('mode', 'dispatch', modeReducer, modeDefaultState),
  R.compose(
    withSimpleState(
      'amountOfPeople',
      ({ amountOfPeople }) => amountOfPeople || 1,
    ),
    withSimpleState(
      'eventMomentDate',
      ({ eventMoment }) => (eventMoment ? moment(eventMoment) : null),
      checkCompose(value => !value && loc.errors.NO_DATE_ERROR_TEXT),
    ),
    withSimpleState(
      'eventMomentTime',
      ({ eventMoment }) => (eventMoment ? moment(eventMoment) : null),
      checkCompose(value => !value && loc.errors.NO_TIME_ERROR_TEXT),
    ),
    withSimpleState('nutrition', ({ nutrition }) => nutrition || 'omnivore'),
    withSimpleState(
      'foodDescription',
      ({ foodDescription }) => foodDescription || '',
      checkCompose(value => !value && loc.errors.NO_DESCRIPTION_ERROR_TEXT),
    ),
    withSimpleState(
      'title',
      ({ title }) => title || '',
      checkCompose(value => !value && loc.errors.NO_TITLE_ERROR_TEXT),
    ),
    withSimpleState('dateError', () => false),
  ),
  fixedCSSModules(styles),
)(props => {
  const {
    nextButtonState,
    city,
    title,
    dateError,
    foodDescription,
    amountOfPeople,
    nutrition,
    eventMomentDate,
    eventMomentTime,
    onBackClick,
    onNextClick,
    onSubmitForm,
    dispatch,
    mode: {
      datePickerEditMode,
      timePickerEditMode,
      showDatePicker,
      showTimePicker,
      showRest,
    },
  }: InnerPropsT = props;
  const cityImage = city && city.city_image_web && city.city_image_web.url;
  const cityName = city && city.city;
  return (
    <FooterWizardLayout
      loadable
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
    >
      <div styleName="container" className="container">
        <h1 className="text-center">Kreiere dein Menü</h1>
        <h4 className="text-center">
          Zeige deine Leidenschaft als Gastgeber und beschere deinen Gästen ein
          unvergessliches Dinner.
        </h4>
        <Row center="xs">
          <Col xs={12} md={12}>
            <TextWithBackground bg={cityImage} theme={textWithBackgroundTheme}>
              <span style={{ fontSize: 50, fontWeight: 'bold' }}>
                {cityName}
              </span>
            </TextWithBackground>
          </Col>
        </Row>
        <Row center="xs">
          <Col xs={12} md={8}>
            <div styleName="left-block">
              <p>Wie soll dein Menü heißen?</p>
              <FormInput type="text" {...title} />
              <p>Beschreibe dein Menü</p>
              <FormTextArea
                name=""
                id=""
                cols="30"
                rows="10"
                {...foodDescription}
              />
              {dateError.value && (
                <div className="validation-error" style={{ marginTop: '10px' }}>
                  Das nächstmögliche Datum für dein Event liegt mindestens in
                  einer Woche, da wir diese Zeit brauchem, um dein Event
                  bestmöglich zu promoten.
                </div>
              )}
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div styleName="right-block">
              {showDatePicker && (
                <div>
                  {!datePickerEditMode && <p>Datum</p>}
                  <FormEventDatePicker
                    {...eventMomentDate}
                    dateError={dateError}
                    isEditable={datePickerEditMode}
                    setEditMode={(...args) =>
                      dispatch(
                        createAction(ModeActions.CHANGE_DATE_EDIT_MODE)(
                          ...args,
                        ),
                      )
                    }
                  />
                </div>
              )}
              {showTimePicker && (
                <div>
                  {!timePickerEditMode && <p>Uhrzeit</p>}
                  <FormEventTimePicker
                    {...eventMomentTime}
                    isEditable={timePickerEditMode}
                    setEditMode={(...args) =>
                      dispatch(
                        createAction(ModeActions.CHANGE_TIME_EDIT_MODE)(
                          ...args,
                        ),
                      )
                    }
                  />
                </div>
              )}
              {showRest && (
                <div>
                  <p>Foodtype</p>
                  <FoodTypeSelector {...nutrition} />
                  <p>Wie viele Gäste möchtest du empfangen?</p>
                  <Amount {...amountOfPeople} max={100} />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </FooterWizardLayout>
  );
});
