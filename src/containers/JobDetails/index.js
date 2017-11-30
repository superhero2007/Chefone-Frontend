// @flow

import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import JobDetails from '../../components/JobPage/JobDetails';

import * as actions from '../../actions';
import type { ReduxState } from '../../redux/type';
// import {load as loadJobSections} from '../../redux/modules/events'

export type JobSectionType = {
  jobDetails: *,
  fetchJobSections: Function,
  fetchJobs: Function,
};

export default connect(
  (state: ReduxState, props: any) => {
    const { jobs: { data: jobs } } = state;
    const { routeParams: { id: jobId } } = props;

    let jobDetails = {};

    if (jobId && jobs && jobs.length > 0) {
      // Since we are retreiving all jobs, filter trough and show only with same id
      jobDetails = jobs.filter(job => job.objectId === jobId)[0];
    }

    return {
      jobDetails,
    };
  },
  { ...actions, push },
)(
  class JobDetailsContainer extends React.Component<*, *> {
    props: JobSectionType;

    componentDidMount() {
      console.log('!!!!');
      this.props.fetchJobs({
        nextPage: false,
      });
    }

    render() {
      return <JobDetails job={this.props.jobDetails} />;
    }
  },
);
