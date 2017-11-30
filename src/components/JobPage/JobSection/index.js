// @flow

import React from 'react';
import { fixedCSSModules } from '../../../utils';
import JobItem from './JobItem';
import styles from '../index.module.less';

type PropsT = {
  key?: string,
  sectionId: string,
  heading: string,
  iconUrl: string,
  jobList: Array<Object>,
};

export default fixedCSSModules(styles)(
  ({ sectionId, heading, iconUrl, jobList }: PropsT) => {
    return (
      <section styleName="job-group">
        <h3>
          <img src={iconUrl} alt="marketing icon" />
          {heading}
        </h3>
        {jobList && jobList.length > 0 ? (
          <ul>
            {jobList.map(jobItem => {
              if (sectionId === jobItem.objectIdJobSection.objectId) {
                return (
                  <JobItem objectId={jobItem.objectId} jobItem={jobItem} />
                );
              }
            })}
          </ul>
        ) : null}
      </section>
    );
  },
);
