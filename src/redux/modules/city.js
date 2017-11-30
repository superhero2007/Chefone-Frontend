// @flow

import * as constants from '../../constants/ActionTypes';
import myLocalStorage from '../../utils/storagePolyfill';

function getCity() {
  var city = '{}';

  city = myLocalStorage.getItem('city');
  if (city === 'undefined') {
    return {};
  }
  city = JSON.parse(city || '{}');

  return city;
}

const initialState = {
  data: !__SERVER__ ? getCity() : {},
};

export default function city(
  state: Object = initialState,
  action: Object = {},
) {
  switch (action.type) {
    case constants.UPDATE_CITY:
      if (!__SERVER__) {
        myLocalStorage.setItem('city', JSON.stringify(action.city));
      }

      return {
        ...state,
        data: action.city,
      };
    default:
      return state;
  }
}
