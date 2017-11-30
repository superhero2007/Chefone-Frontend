// @flow

/**
 * This action type will be dispatched when your history
 * receives a location change.
 */
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const initialState = {
  locationBeforeTransitions: null,
  previousLocation: null,
};

type StateT = {
  locationBeforeTransitions: any,
  previousLocation: any,
};

/**
 * This reducer will update the state with the most recent location history
 * has transitioned to. This may not be in sync with the router, particularly
 * if you have asynchronously-loaded routes, so reading from and relying on
 * this state is discouraged.
 */
export function routerReducer(
  state: StateT = initialState,
  { type, payload }: { type: string, payload: any } = {},
) {
  if (type === LOCATION_CHANGE) {
    return {
      ...state,
      locationBeforeTransitions: payload,
      previousLocation: state.locationBeforeTransitions,
    };
  }

  return state;
}
