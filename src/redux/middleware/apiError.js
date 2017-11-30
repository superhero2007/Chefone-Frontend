// @flow

// import Rx from 'rx';
import { notifyError } from '../../actions';

const checkAction = (next, action) => {
  if (!action) {
    next(action);
    return false;
  }

  const { error } = action;
  if (!error) {
    next(action);
    return false;
  }
  return true;
};

export default (store: Object) => {
  // const subject = new Rx.Subject();
  // subject.debounce(100).subscribe(data => store.dispatch(notifyError(data)));

  return (next: Function) => (action: Object) => {
    if (!checkAction(next, action)) {
      return;
    }
    const QUOTA_EXCEEDED_ERROR = 'QuotaExceededError';
    const QUOTA_EXCEEDED_ERROR_CODE = 22;
    const router = store.getState().router;

    const { error, errorHook, payload, ...rest } = action;

    if (error) {
      if (
        action.payload.name === QUOTA_EXCEEDED_ERROR ||
        action.payload.code == QUOTA_EXCEEDED_ERROR_CODE
      )
        return;
      store.dispatch(notifyError(payload));
      // subject.onNext(payload);
      if (errorHook) {
        const dispatch = store.dispatch;
        const res = errorHook({ ...rest, router, error, dispatch });
        if (res) {
          next(res);
        }
        return;
      }

      throw payload;
    }

    next(action);
  };
};
