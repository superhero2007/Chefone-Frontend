//@flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from '../redux-async-connect';
import { applyRouterMiddleware, Router } from 'react-router';
import { useScroll } from 'react-router-scroll';

const useReduxConnect = () => ({
  renderRouterContext: (child, props) => (
    <ReduxAsyncConnect {...props}>{child}</ReduxAsyncConnect>
  ),
});

export default class App extends Component<*, *> {
  render() {
    const { store, renderProps } = this.props;

    return (
      <Provider store={store} key="provider">
        <Router
          {...renderProps}
          onError={er => {
            console.log(er);
          }}
          render={applyRouterMiddleware(useScroll(), useReduxConnect())}
        />
      </Provider>
    );
  }
}
