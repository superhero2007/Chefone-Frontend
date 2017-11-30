// @flow

import React from 'react';

import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';

export type JobDetailsType = {
  job: Object,
};

export default fixedCSSModules(styles)(
  class JobDetails extends React.Component<*, *> {
    props: JobDetailsType;

    render() {
      const BUTTON_TEXT = 'AUF DIESE STELLE BEWERBEN';

      // console.log(this.props.job)

      return (
        <div styleName="component">
          <div className="container">
            <article styleName="job">
              <header className="clearfix">
                <h2>{this.props.job.jobTitle}</h2>
                <a
                  className="btn btn-primary"
                  styleName="btn-apply-for"
                  href={`mailto:jobs@chef.one?subject=Apply for ${
                    this.props.job.jobTitle
                  }`}
                >
                  {BUTTON_TEXT}
                </a>
              </header>
              <pre styleName="job-description-text">
                {this.props.job.jobDescription}
              </pre>
              <div styleName="btn-wrapper">
                <a
                  className="btn btn-primary"
                  styleName="btn-apply-for"
                  href={`mailto:jobs@chef.one?subject=Apply for ${
                    this.props.job.jobTitle
                  }`}
                >
                  {BUTTON_TEXT}
                </a>
              </div>
            </article>
          </div>
        </div>
      );
    }
  },
);
