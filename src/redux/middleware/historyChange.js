//@flow
// import {startProgress, stopProgress} from '../modules/progress'
import { g } from '../../utils/analytics';
import { CALL_HISTORY_METHOD, LOCATION_CHANGE } from 'react-router-redux';

export default () => /*store:Object*/ (next: Function) => (action: Object) => {
  if (
    (action && action.type === CALL_HISTORY_METHOD) ||
    action.type === LOCATION_CHANGE
  ) {
    g('pageview', action.payload.pathname, action.payload.pathname);
    // if(action.type === CALL_HISTORY_METHOD){
    //   store.dispatch(startProgress());
    // }
    //
    // if(action.type === LOCATION_CHANGE){
    //   store.dispatch(stopProgress());
    // }
  }
  return next(action);
};
