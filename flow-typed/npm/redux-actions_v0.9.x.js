// flow-typed signature: d78bf1a9c10d343cbeab4e5bb49c6e24
// flow-typed version: b43dff3e0e/redux-actions_v0.9.x/flow_>=v0.15.x

declare module 'redux-actions' {
  declare function createAction(type: string, payloadCreator?: Function, metaCreator?: Function): Function;
  declare function handleAction(type: string, reducer: Object|Function): Function;
  declare function handleActions(reducerMap: Object, defaultState?: Object): Function;
}
