// @flow

import React, { Component } from 'react';

export default class NoMatch extends Component<*, *> {
  render() {
    return (
      <div className="panel panel-default col-xs-12 col-sm-8 col-sm-offset-2">
        <div className="panel-body">
          <h2 style={{ textAlign: 'center' }}>404 route not found</h2>
        </div>
      </div>
    );
  }
}
