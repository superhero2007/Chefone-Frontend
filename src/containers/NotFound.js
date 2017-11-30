// @flow

import React from 'react';
import { Link } from 'react-router';
import notfound from '../../static/icons/icon_notfound.svg';

const NotFound = () => {
  return (
    <div className="container">
      <div className="row row-space-top-8 row-space-8">
        <div className="col-md-offset-2 col-md-4">
          <h2 className="text-jumbo text-ginormous hide-mobile">Oops!</h2>
          <h3>We can’t seem to find the food you’re looking for.</h3>
          <h6>Error code: 404</h6>
          <ul className="list-unstyled">
            <li>Here are some helpful links instead:</li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/discover">Discover</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-4 text-center hide-mobile">
          <img
            src={notfound}
            style={{
              height: '350px',
              width: '200px',
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default NotFound;
