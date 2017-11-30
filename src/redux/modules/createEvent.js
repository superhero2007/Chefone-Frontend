// @flow

import { createAction, handleActions } from 'redux-actions';

export const fetchedEventForCreateEvent = createAction(
  'FETCHED_EVENT_FOR_CREATE_EVENT',
);
export const chooseCity = createAction('CHOOSE_CITY');
export const commitFirstForm = createAction('COMMIT_FIRST_FORM');
export const commitSecondForm = createAction('COMMIT_SECOND_FORM');
export const cleanCreateEvent = createAction('CLEAN_CREATE_EVENT');
export const init = createAction('INIT');

const populate = (state, { payload }) => {
  // console.log(state)
  // console.log(payload)
  return { ...state, ...payload };
};

const defaultState = {
  city: {
    image:
      'https://files.parsetfss.com/1cdfc6ff-8257-47e1-a857-61d3086dcc9c/tfss-741994f0-109d-4d22-a8c2-0067c616c526-hamburg.jpg',
    name: 'Hamburg',
  },
  title: '',
  message: '',
  amountOfPeople: 1,
  nutrition: 'omnivore',
  category: 'home',
  currency: {
    symbol: '€',
    name: 'euro',
  },
  foodImages: [null, null, null],
};
export default handleActions(
  {
    FETCHED_EVENT_FOR_CREATE_EVENT: (state, { payload }) => {
      const {
        image1,
        image2,
        image3,
        servings,
        phone,
        objectId,
        city,
      } = payload;
      return {
        ...state,
        ...payload,
        eventId: objectId,
        cityId: city.objectId,
        amountOfPeople: servings,
        phoneNumber: phone,
        foodImages: [image1, image2, image3],
      };
    },
    CHOOSE_CITY: populate,
    COMMIT_FIRST_FORM: populate,
    COMMIT_SECOND_FORM: populate,
    INIT: populate,
    CLEAN_CREATE_EVENT: () => defaultState,
  },
  defaultState,
);
