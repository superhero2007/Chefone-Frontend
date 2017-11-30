//@flow

import { createAction, handleActions } from 'redux-actions';

export const authPages = {
  SIGN_UP: 'SIGN_UP',
  LOGIN: 'LOGIN',
  MAILCHIP: 'MAILCHIP',
};

export type AUTH_PAGES = $Keys<typeof authPages>;
export type MOBILE_PAGES = $Keys<typeof mobilePages>;

export const mobilePages = {
  HOME: 'HOME',
  CITIES: 'CITIES',
};

// type pages = $Keys<typeof mobilePages>|$Keys<typeof authPages>|null

const MODAL_OPEN_PAGE = 'MODAL_OPEN_PAGE';
const MODAL_CLOSE = 'MODAL_CLOSE';

export const close = createAction(MODAL_CLOSE);
export const openAuthPage = (a: AUTH_PAGES) => {
  console.log(a);
  return createAction(MODAL_OPEN_PAGE)(a);
};

export const openMobilePage = (a: MOBILE_PAGES) => {
  console.log(a);
  return createAction(MODAL_OPEN_PAGE)(a);
};

const defaultState = { page: null };

export default handleActions(
  {
    ['@@router/LOCATION_CHANGE']: () => defaultState,
    MODAL_CLOSE: () => defaultState,
    MODAL_OPEN_PAGE: (state, { payload: page }) => ({ page }),
  },
  defaultState,
);
