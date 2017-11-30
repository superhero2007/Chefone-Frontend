// @flow

// Action key that carries API call info interpreted by this Redux middleware.
function isPromise(value) {
  return (
    !!value &&
    (typeof value === 'function' ||
      (value.then && typeof value.then === 'function'))
  );
}

const PENDING = 'LOAD';
const FULFILLED = 'LOAD_SUCCESS';
const REJECTED = 'LOAD_FAIL';

const promiseTypeSuffixes = [PENDING, FULFILLED, REJECTED];

const checkAction = (action: Object) =>
  action.payload && isPromise(action.payload.promise);

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default (store: Object) => (next: Function) => (action: Object) => {
  const { dispatch, getState } = store;

  if (!checkAction(action)) {
    return next(action);
  }

  const handleReject = (reason = null) => {
    const rejectedAction = getAction({ payload: reason, isRejected: true });
    dispatch(rejectedAction);

    throw rejectedAction.payload;
    // const error = new Error();
    // error.reason = reason;
    // error.action = rejectedAction;
    // throw error;
  };

  const handleFulfill = (value = null) => {
    const resolvedAction = getAction({ payload: value, isRejected: false });
    dispatch(resolvedAction);

    return { value, action: resolvedAction };
  };

  const { type, payload, meta } = action;

  const getAction = ({ payload, isRejected }) => ({
    type: `${type}_${isRejected ? REJECTED : FULFILLED}`,
    ...(payload ? { payload } : {}),
    ...(!!meta ? { meta } : {}),
    ...(isRejected ? { error: true } : {}),
  });

  const [PENDING, FULFILLED, REJECTED] =
    (meta || {}).promiseTypeSuffixes || promiseTypeSuffixes;

  let promise = payload.promise;
  let data = payload.data;

  next({
    type: `${type}_${PENDING}`,
    ...(!!data ? { payload: data } : {}),
    ...(!!meta ? { meta } : {}),
  });

  if (typeof promise === 'function') {
    promise = promise(dispatch, getState);
  }

  return promise.then(handleFulfill, handleReject);
};
