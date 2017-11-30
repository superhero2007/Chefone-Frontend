import { mapReducer } from './utils';

export default () => {
  const CREATE = 'message_LOAD';
  const CREATE_SUCCESS = 'message_LOAD_SUCCESS';
  const CREATE_FAIL = 'message_LOAD_FAIL';

  return {
    reducer: mapReducer(
      {
        [CREATE]: state => ({
          ...state,
          meta: {
            state: 'loading',
          },
        }),
        [CREATE_SUCCESS]: (state, action) => {
          let messages = state.data.slice();
          let msg = action.payload;
          let user = msg.user || msg.chef.objectIdUser;
          messages.push({
            user: {
              objectId: user.objectId,
              name: user.firstName,
              avatar: user.avatar && user.avatar.url,
            },
            date: msg.createdAt,
            text: msg.textMessage,
          });
          return {
            ...state,
            data: messages,
            meta: {
              ...action.meta,
              state: 'success',
            },
          };
        },
        [CREATE_FAIL]: (state, action) => ({
          ...state,
          meta: {
            ...action.meta,
            state: 'error',
            error: action.payload,
            errorMsg: action.payload.message,
            errorStack: action.payload.stack,
          },
        }),
      },
      {
        meta: {
          state: 'initial',
        },
      },
    ),
  };
};
