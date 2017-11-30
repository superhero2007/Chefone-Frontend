// @flow

import { createAction } from 'redux-actions';
import { messages } from '../../server/api';
import messageCreate from '../hors/messageCreate';

const { getMessages } = messages;
const name = 'messages';
const { reducer } = messageCreate({ name });

export default reducer;

export const load = (options: *) =>
  createAction(name)({
    promise: () => getMessages(options),
  });
