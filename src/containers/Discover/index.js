// @flow

import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import { homeSelector } from '../../selectors';
import { LoaderDecorator } from '../../decorators';
import { load as loadEvents } from '../../redux/modules/events';
import type { ReduxState } from '../../redux/type';
import DiscoverPage from '../../components/DiscoverPage';
import { signupMailchimp } from '../../actions/auth';

export type DiscoverPageType = {
  params: Object,
  bg: string,
  push: Function,
  signupMailchimp: Function,
  resetEvents: Function,
  loadEvents: Function,
  fetchDiscoverData: Function,
  cities: Array<any>,
  passedEventsLoaded: boolean,
  passedEventsLoading: boolean,
  passedEvents: Array<Object>,
  canLoadMore: boolean,
  eventsLoading: boolean,
  city: Object,
  events: Array<Object>,
};

export default connect(
  (state: ReduxState) => {
    const {
      events: { meta: { maxElems } },
      cities,
      city: { data: city },
    } = state;

    const cityImage = city.city_image_web ? city.city_image_web : { url: '' };
    const bg = cityImage.url;

    const { events, passedEvents, eventsLoading } = homeSelector(state);
    const canLoadMore =
      events &&
      events.length > 0 &&
      (!maxElems || events.length < maxElems) &&
      !eventsLoading;

    return {
      ...homeSelector(state),
      events,
      passedEvents,
      bg,
      maxElems,
      city,
      cities,
      canLoadMore,
    };
  },
  { ...actions, loadEvents, push, signupMailchimp },
)(
  LoaderDecorator({
    condition: ({ loading }) => !loading,
    isOnlyLoader: true,
  })(
    class Discover extends React.Component<*, *> {
      props: DiscoverPageType;
      static defaultProps = {};

      componentWillReceiveProps(props: Object) {
        const cityName = props.params.cityName || 'Hamburg';
        this.props.fetchDiscoverData(cityName);
      }

      componentWillMount() {
        this.props.resetEvents();
      }

      componentDidMount() {
        this.componentWillReceiveProps(this.props);
      }

      getMoreEvents = () => {
        this.props.loadEvents({
          city: this.props.city.objectId,
          nextPage: true,
          limit: 12,
        });
      };
      render() {
        const {
          city,
          bg,
          events,
          canLoadMore,
          passedEventsLoading,
          eventsLoading,
          passedEvents,
          signupMailchimp,
        } = this.props;
        const cityName = city.city ? city.city : '';

        return (
          <DiscoverPage
            signupMailchimp={email => {
              signupMailchimp({ cityName, email });
            }}
            passedEvents={passedEvents}
            passedEventsLoading={passedEventsLoading}
            eventsLoading={eventsLoading}
            canLoadMore={canLoadMore}
            events={events}
            bg={bg}
            cityName={cityName}
            getMoreEvents={this.getMoreEvents}
          />
        );
      }
    },
  ),
);
