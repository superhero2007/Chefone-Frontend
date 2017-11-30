// @flow

import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import iconsMaster from '../../static/Icons-Master-SVG_return.svg';

export default ({ showLogin }: { showLogin: Function }) => (
  <div className="text-center sign">
    <p style={{ textAlign: 'left' }}>
      <span
        style={{ cursor: 'pointer', textAlign: 'left' }}
        onClick={showLogin}
      >
        <img
          src={iconsMaster}
          style={{
            height: '40px',
            borderRadius: '2px',
            textAlign: 'left',
            boxShadow: 'none',
          }}
        />
      </span>
    </p>

    <div className="col-xs-12">
      <Alert bsStyle="success">
        <strong>Success! Check your email! </strong>
      </Alert>
    </div>
    <div className="clearfix" />
  </div>
);
