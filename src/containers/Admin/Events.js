// @flow

import React from 'react';
import R from 'ramda';
import moment from 'moment';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import AdminEvents from '../../components/Admin/Events';
import * as actions from '../../actions';
import type { ReduxState } from '../../redux/type';
import { load as loadAdminEvents } from '../../redux/modules/adminEvents';
import { load as loadAdminPaymentOverview } from '../../redux/modules/adminPaymentOverview';
import { promiseDispatch } from '../../utils';
import Loader from '../../components/UIKit/Loader';
import withSimpleState from '../../utils/withSimpleState';

const load = ({ greaterDate, lessDate }) =>
  promiseDispatch('LOAD_ADMIN_DASHBOARD', async (dispatch: Function) => {
    await dispatch(loadAdminPaymentOverview());
    await dispatch(
      loadAdminEvents({
        limit: 1000,
        greaterDate: greaterDate.toISOString(),
        lessDate: lessDate.toISOString(),
      }),
    );
  });

class ConnectedChefEvents extends React.Component<*, *> {
  componentDidMount() {
    this.props.load(this.props.timeRange.value);
  }

  render() {
    const {
      adminEvents: { meta: { state: adminEventState }, data: adminEventsData },
      adminPaymentOverview: {
        meta: { state: adminPaymentOverviewState },
        data: paymentOverview,
      },
    } = this.props;
    if (
      adminEventState === 'success' &&
      adminPaymentOverviewState === 'success'
    ) {
      return (
        <AdminEvents
          timeRange={{
            value: this.props.timeRange.value,
            onChange: value => {
              this.props.load(value);
              this.props.timeRange.onChange(value);
            },
          }}
          selectedMode={this.props.selectedMode}
          events={adminEventsData}
          paymentOverview={paymentOverview}
          onSelectEvent={id => this.props.push(`/admin/events/${id}`)}
        />
      );
    }
    return <Loader />;
  }
}

export default R.compose(
  connect(
    ({ adminEvents, adminPaymentOverview }: ReduxState) => ({
      adminEvents,
      adminPaymentOverview,
    }),
    {
      ...actions,
      load,
      push,
    },
  ),
  withSimpleState('selectedMode', () => 'active'),
  withSimpleState('timeRange', () => ({
    greaterDate: moment('01-01-2016'),
    lessDate: moment().add(1, 'month'),
  })),
)(ConnectedChefEvents);
