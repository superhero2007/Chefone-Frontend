import { createAction } from 'redux-actions';
import { messages } from '../../server/api';
import createLoadableResource from '../hors/clearAndLoad';

const { createMessage } = messages;
const name = 'message';
const { reducer } = createLoadableResource({ name });

export default reducer;

const { api: { API_SERVER } } = CONFIG;

export const load = data =>
  createAction(name)({
    promise: () => createMessage({ ...data, API_SERVER }),
  });
