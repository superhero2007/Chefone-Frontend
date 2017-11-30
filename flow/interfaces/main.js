/* eslint-disable */

declare module CSSModule {
  declare var exports: { [key: string]: string };
}

declare class module {
  static hot: {
    accept: Function,
  };
}

type FunctionComponent<P> = (props: P) => ?React$Element<any>;
type ClassComponent<P, S> = Class<React$Component<P, S>>;
type Component$<P, S> = ClassComponent<P, S> | FunctionComponent<P>;

declare var fbq: (a: string, b: string, params?: Object) => void;
declare var ga: Function;

type CssOptions = {
  allowMultiple?: boolean,
  errorWhenNotFound?: boolean,
};

declare var System: {
  import: (a: string) => Promise<any>,
};

// declare type FunctionComponent<P> = (props: P) => ?React$Element<any>;
// declare type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>;
// declare Rfunction exports<D, P, S, C: ClassComponent<D, P, S> | FunctionComponent<P>>(reactClass: C, styles: Object, cssOptions?: CssOptions): C;
// declare module 'react-css-modules' {
//   declare type CssOptions = {
//     allowMultiple?: boolean,
//     errorWhenNotFound?: boolean,
//   };
//
//   declare type FunctionComponent<P> = (props: P) => ?React$Element<any>;
//   declare type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>;
//
//   declare function exports<D, P, S, C: ClassComponent<D, P, S> | FunctionComponent<P>>(reactClass: C, styles: Object, cssOptions?: CssOptions): C;
// }

declare class Raven {
  static setUserContext(userContext: {
    id?: string,
    username?: string,
    email?: string,
    ip_address?: string,
  }): void;
}

declare class localStorage {
  static test: number;
  static getItem: Function;
  static setItem: Function;
}

declare class FB {
  static api: Function;
  static ui: Function;
}

declare class Parse {
  static File: Function;
  static FacebookUtils: Object;
  static User: Function;
  static GeoPoint: Function;
  static Query: Function;
  static Object: Function;
  static initialize: Function;
}

declare var ga: Function;

declare var __CLIENT__: boolean;
declare var __SERVER__: boolean;
declare var __DISABLE_SSR__: boolean;
declare var __DEVELOPMENT__: boolean;
declare var webpackIsomorphicTools: Object;

declare function StateBoolFunc(state: Object): boolean;
declare function Selector(state: Object): any;

type AuthCreds = {
  email: string,
  password: string,
};

type UserSignUpType = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
};

type OrderParams = {
  message: string,
  phone: string,
};

type ReactInputError = {
  target: {
    value: string,
  },
};

type MessagesOptions = {
  user?: Object,
  chef?: Object,
  text?: string,
  orderId: string,
  chefId: string,
  userId: string,
};

type MessagesData = {
  order: Object,
  textMessage?: string,
  chef?: Object,
  user?: Object,
};

type JsonPostSimpleType = {
  url: string,
  data: Object,
  noRemoveEmpty?: boolean,
};

type OrderToSendReminderData = {
  limit?: number,
  eventsIds: Array<string>,
};

type ReviewReminders = {
  lessDate: string,
  greaterDate: string,
};

declare class ParseObject {
  get: Function;
  set: Function;
  existed: Function;
}

import type { Dispatch, Store } from 'redux';

// declare module 'react-redux' {
//
//   /*
//     S = State
//     A = Action
//     OP = OwnProps
//     SP = StateProps
//     DP = DispatchProps
//   */
//
//   declare type MapStateToProps<S, OP: Object, SP: Object> = (state: S, ownProps: OP) => SP | MapStateToProps<S, OP, SP>;
//
//   declare type MapDispatchToProps<A, OP: Object, DP: Object> = ((dispatch: Dispatch<A>, ownProps: OP) => DP) | DP;
//
//   declare type MergeProps<SP, DP: Object, OP: Object, P: Object> = (stateProps: SP, dispatchProps: DP, ownProps: OP) => P;
//
//   declare type StatelessComponent<P> = (props: P) => ?React$Element<any>;
//
//   declare class ConnectedComponent<OP, P, Def, St> extends React$Component<void, OP, void> {
//     static WrappedComponent: Class<React$Component<Def, P, St>>;
//     getWrappedInstance(): React$Component<Def, P, St>;
//     static defaultProps: void;
//     props: OP;
//     state: void;
//   }
//
//   declare type ConnectedComponentClass<OP, P, Def, St> = Class<ConnectedComponent<OP, P, Def, St>>;
//
//   declare type Connector<OP, P> = {
//     (component: StatelessComponent<P>): ConnectedComponentClass<OP, P, void, void>;
//     <Def, St>(component: Class<React$Component<Def, P, St>>): ConnectedComponentClass<OP, P, Def, St>;
//   };
//
//   declare class Provider<S, A> extends React$Component<void, { store: Store<S, A>, children?: any }, void> { }
//
//   declare type ConnectOptions = {
//     pure?: boolean,
//     withRef?: boolean
//   };
//
//   declare type Null = null | void;
//
//   declare function connect<A, OP>(
//     ...rest: Array<void> // <= workaround for https://github.com/facebook/flow/issues/2360
//   ): Connector<OP, $Supertype<{ dispatch: Dispatch<A> } & OP>>;
//
//   declare function connect<A, OP>(
//     mapStateToProps: Null,
//     mapDispatchToProps: Null,
//     mergeProps: Null,
//     options: ConnectOptions
//   ): Connector<OP, $Supertype<{ dispatch: Dispatch<A> } & OP>>;
//
//   declare function connect<S, A, OP, SP>(
//     mapStateToProps: MapStateToProps<S, OP, SP>,
//     mapDispatchToProps: Null,
//     mergeProps: Null,
//     options?: ConnectOptions
//   ): Connector<OP, $Supertype<SP & { dispatch: Dispatch<A> } & OP>>;
//
//   declare function connect<A, OP, DP>(
//     mapStateToProps: Null,
//     mapDispatchToProps: MapDispatchToProps<A, OP, DP>,
//     mergeProps: Null,
//     options?: ConnectOptions
//   ): Connector<OP, $Supertype<DP & OP>>;
//
//   declare function connect<S, A, OP, SP, DP>(
//     mapStateToProps: MapStateToProps<S, OP, SP>,
//     mapDispatchToProps: MapDispatchToProps<A, OP, DP>,
//     mergeProps: Null,
//     options?: ConnectOptions
//   ): Connector<OP, $Supertype<SP & DP & OP>>;
//
//   declare function connect<S, A, OP, SP, DP, P>(
//     mapStateToProps: MapStateToProps<S, OP, SP>,
//     mapDispatchToProps: MapDispatchToProps<A, OP, DP>,
//     mergeProps: MergeProps<SP, DP, OP, P>,
//     options?: ConnectOptions
//   ): Connector<OP, P>;
// }

// declare module 'redux' {
//
//   /*
//     S = State
//     A = Action
//   */
//
//   declare type Dispatch<A: { type: $Subtype<string> }> = (action: A) => A;
//
//   declare type MiddlewareAPI<S, A> = {
//     dispatch: Dispatch<A>;
//     getState(): S;
//   };
//
//   declare type Reducer<S, A> = (state: S, action: A) => S;
//
//   declare type Store<S, A> = {
//     // rewrite MiddlewareAPI members in order to get nicer error messages (intersections produce long messages)
//     dispatch: Dispatch<A>;
//     getState(): S;
//     subscribe(listener: () => void): () => void;
//     replaceReducer(nextReducer: Reducer<S, A>): void
//   };
//
//   declare type Middleware<S, A> =
//     (api: MiddlewareAPI<S, A>) =>
//       (next: Dispatch<A>) => Dispatch<A>;
//
//   declare type StoreCreator<S, A> = {
//     <S, A>(reducer: Reducer<S, A>, enhancer?: StoreEnhancer<S, A>): Store<S, A>;
//     <S, A>(reducer: Reducer<S, A>, preloadedState: S, enhancer?: StoreEnhancer<S, A>): Store<S, A>;
//   };
//
//   declare type StoreEnhancer<S, A> = (next: StoreCreator<S, A>) => StoreCreator<S, A>;
//
//   declare function createStore<S, A>(reducer: Reducer<S, A>, enhancer?: StoreEnhancer<S, A>): Store<S, A>;
//   declare function createStore<S, A>(reducer: Reducer<S, A>, preloadedState: S, enhancer?: StoreEnhancer<S, A>): Store<S, A>;
//
//   declare function applyMiddleware<S, A>(...middlewares: Array<Middleware<S, A>>): StoreEnhancer<S, A>;
//
//   declare type ActionCreator<A> = (...args: Array<any>) => A;
//   declare type ActionCreators<K, A> = { [key: K]: ActionCreator<A> };
//
//   declare function bindActionCreators<A, C: ActionCreator<A>>(actionCreator: C, dispatch: Dispatch<A>): C;
//   declare function bindActionCreators<A, K, C: ActionCreators<K, A>>(actionCreators: C, dispatch: Dispatch<A>): C;
//
//   // unsafe (you can miss a field and / or assign a wrong reducer to a field)
//   declare function combineReducers<S: Object, A>(reducers: {[key: $Keys<S>]: Reducer<any, A>}): Reducer<S, A>;
//
//   declare function compose<S, A>(...fns: Array<StoreEnhancer<S, A>>): Function;
//
// }

// type FN<A,R> = (a:A)=> R

// declare module 'ramda' {
//    declare var compose : (
//     // ((end: void) => (<T>(x: T) => T)) &
//     (<A,B>
//       (m1: FN<A,B>, end: void) => FN<A,B>) &
//     (<A,B,C>
//       (m1: FN<A,B>, m2: FN<B,C>, end: void) => FN<A,C>) &
//     (<X1,X2,X3,X4>
//       (m1: FN<X1,X2>, m2: FN<X2,X3>, m3: FN<X3,X4>, end: void) => FN<X1,X4>) &
//     (<X1,X2,X3,X4,X5>
//       (m1: FN<X1,X2>, m2: FN<X2,X3>, m3: FN<X3,X4>, m4: FN<X4,X5>, end: void) => FN<X1,X5>) &
//     (<A,B,C,D,E,F>
//       (m1: FN<A,B>, m2: FN<B,C>, m3: FN<C,D>, m4: FN<D,E>, m5: FN<E,F>, end: void) => FN<A,F>) &
//     (<A,B,C,D,E,F,G>
//       (m1: FN<A,B>, m2: FN<B,C>, m3: FN<C,D>, m4: FN<D,E>, m5: FN<E,F>, m6: FN<F,G>, end: void) => FN<A,G>) &
//     (<A,B,C,D,E,F,G,H>
//       (m1: FN<A,B>, m2: FN<B,C>, m3: FN<C,D>, m4: FN<D,E>, m5: FN<E,F>, m6: FN<F,G>, m7: FN<G,H>, end: void) => FN<A,H>) &
//     (<A,B,C,D,E,F,G,H,J>
//       (m1: FN<A,B>, m2: FN<B,C>, m3: FN<C,D>, m4: FN<D,E>, m5: FN<E,F>, m6: FN<F,G>, m7: FN<G,H>, m8: FN<H,J>, end: void) => FN<A,J>) &
//     (<A,B,C,D,E,F,G,H,J,K>
//       (m1: FN<A,B>, m2: FN<B,C>, m3: FN<C,D>, m4: FN<D,E>, m5: FN<E,F>, m6: FN<F,G>, m7: FN<G,H>, m8: FN<H,J>, m9: FN<J,K>, end: void) => FN<A,K>) &
//     (<A,B,C,D,E,F,G,H,J,K,L>
//       (m1: FN<A,B>, m2: FN<B,C>, m3: FN<C,D>, m4: FN<D,E>, m5: FN<E,F>, m6: FN<F,G>, m7: FN<G,H>, m8: FN<H,J>, m9: FN<J,K>, m10: FN<K,L>, end: void) => FN<A,L>)
//     // (<A,R>(...funcs: Array<FN<A,R>>) => FN<A,R>)
//   )
// }

declare module 'webpack' {
  declare var exports: (
    a: Object,
  ) => {
    run: () => {},
  };
}
