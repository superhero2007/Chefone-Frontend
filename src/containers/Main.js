// @flow

import React from 'react';

import R from 'ramda';
import { connect } from 'react-redux';
import * as auth from '../actions/auth';
import Navigation from './Navigation';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import * as actions from '../actions';
import Notifications from '../containers/Notifications';
import Helmet from 'react-helmet';
import Progress from 'react-progress';
import { fb } from '../utils/analytics';
import type { ReduxState } from '../redux/type';
import asyncConnectPromise from '../decorators/asyncConnectPromise';

import { defaultMetaPromise } from '../meta';

export default R.compose(
  asyncConnectPromise(defaultMetaPromise),
  connect(
    (state: ReduxState) => {
      const cities = (state.cities && state.cities.data) || [];

      const city = state.city;
      const fee = state.fee;
      const loaded = true;
      // const loaded = state.cities.data && fee.data;
      const session = state.session;
      return {
        //$FlowIssue
        meta: state.meta,
        loaded,
        cities,
        fee,
        session,
        city,
        routing: state.routing,
        //$FlowIssue
        progress: state.progress.progress,
      };
    },
    { ...auth, ...actions },
  ),
)(
  class FrontPage extends React.Component<*, *> {
    previousChildren: any;
    componentDidMount() {
      fb('PageView');

      this.props.onLoad();
    }

    componentWillReceiveProps(nextProps: Object) {
      // if we changed routes...

      let wasModal =
        this.props.location.query && this.props.location.query.modal;

      const nextLocation = nextProps.location;
      if (
        (nextLocation && nextLocation.query && nextLocation.query.modal) ||
        (nextLocation.key !== this.props.location.key &&
          nextLocation.state &&
          nextLocation.state.modal)
      ) {
        // save the old children (just like animation)
        if (!wasModal) {
          this.previousChildren = this.props.children;
        }
      }
      // Settig default city if not set
    }

    render() {
      let { location, meta } = this.props;

      let isModal =
        (this.props.location.query && this.props.location.query.modal) ||
        (location.state && location.state.modal && this.previousChildren);

      const returnTo = location.state ? location.state.returnTo : '/';

      const main = this.props.loaded ? (
        <main>
          <div>{isModal ? this.previousChildren : this.props.children}</div>
        </main>
      ) : (
        <main />
      );
      // TODO: check for requireAuth here
      return (
        <section>
          {__SERVER__ && <Helmet {...meta} />}
          {!!this.props.progress && (
            <Progress
              percent={this.props.progress}
              color="red"
              style={{
                zIndex: 99999999,
              }}
            />
          )}
          <Navigation {...this.props} />
          {main}
          {isModal && <Modal returnTo={returnTo}>{this.props.children}</Modal>}
          <Footer />
          <Notifications />
        </section>
      );
    }
  },
);
