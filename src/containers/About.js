// @flow

import React, { Component } from 'react';
// import {push} from 'react-router-redux';
// import {connect} from 'react-redux';

import About from '../components/About';

export default class AboutPage extends Component<*, *> {
  render() {
    return <About />;
  }
}
// export default connect(
//   (state:ReduxState, ownProps)=> {
//     return {}
//   },
//   ({})
// )(AboutPage)
