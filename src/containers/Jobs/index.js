// @flow

import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import JobPage from '../../components/JobPage';

import * as actions from '../../actions';
import type { ReduxState } from '../../redux/type';
// import {load as loadJobSections} from '../../redux/modules/events'

export type JobSectionType = {
  params: Object,
  jobs: Array<Object>,
  jobSections: Array<Object>,
  jobId: string,
  route: Object,
  push: Function,
  fetchJobSections: Function,
  fetchJobs: Function,
  location: Object,
};

export default connect(
  (state: ReduxState, ownProps) => {
    const route = ownProps.route || '';
    const { jobSections: { data: jobSections }, jobs: { data: jobs } } = state;

    return {
      jobSections,
      jobs,
      route,
    };
  },
  { ...actions, push },
)(
  class JobsPageContainer extends React.Component<*, *> {
    props: JobSectionType;

    componentWillReceiveProps() {
      // console.log('componentWillReceiveProps', this.props)
      this.props.fetchJobSections({
        nextPage: false,
      });
      this.props.fetchJobs({
        nextPage: false,
      });
    }

    componentDidMount() {
      this.componentWillReceiveProps();
    }

    render() {
      // console.log('HEY container jobs', this.props)
      return (
        <div>
          <JobPage
            jobSections={this.props.jobSections}
            jobs={this.props.jobs}
          />
        </div>
      );
    }
  },
);
