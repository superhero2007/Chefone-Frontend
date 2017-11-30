// @flow

import React, { Component } from 'react';
import Loader from './../components/UIKit/Loader';

const getMessageForMainWindow = location => {
  let queryDict = {};
  queryDict.locationSearch = location.search;
  location.search
    .substr(1)
    .split('&')
    .forEach(item => {
      queryDict[item.split('=')[0]] = item.split('=')[1];
    });

  return JSON.stringify(queryDict);
};

export default class SofortResult extends Component<*, *> {
  componentDidMount() {
    console.log(location);
    window.opener.postMessage(getMessageForMainWindow(location), '*');
    window.close();
  }

  render() {
    return (
      <div className="sofort-result-container">
        <Loader />
      </div>
    );
  }
}
