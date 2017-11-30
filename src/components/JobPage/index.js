// @flow

import React, { Component } from 'react';
import JobSection from './JobSection';

import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';
import feedbackAuthor from '../../../static/jobs/feedback-author.jpg';

export type JobPageType = {
  jobSections: Array<Object>,
  jobs: Array<Object>,
};

export default fixedCSSModules(styles)(
  class JobPage extends Component<*, *> {
    props: JobPageType;

    render() {
      const jobList = this.props.jobs;

      // console.log('jobPage props', this.props)

      const HEADER_SMALL = 'Die Mission von CHEF.ONE?';
      const HEADER_BIG = 'Besser essen: Zusammen.';
      const BANNER_TEXT =
        '"Die Arbeit bei CHEF.ONE ist immer aufregend und bringt als Start-Up täglich neue Herausforderungen. Ich habe sofort gemerkt: Es ist etwas Großes, was hier entsteht. Genau daraus speist sich meine Leidenschaft, mit der ich immer wieder neue Leute von unserem Konzept begeistern kann."';
      const JOB_OFFERS_H2 = 'STELLENANGEBOTE'; // const IMAGE_H2 = 'WARUM BEI CHEF.ONE ARBEITEN?'; // const IMAGE_TEXT = 'Bei Chef.One glauben wir nicht an Kongresse. Dais ist, warum nur die verrückt genug sind zu denken, dass sie die Welt ändern können, werden ein Teil unseres Teams. Hier finden Sie sich von motivierten Menschen umgeben, die begeistert sind, die Chef.One Idee verbreiten zu sehen.';
      return (
        <div styleName="component">
          <header styleName="header">
            <div className="col-md-12">
              <p styleName="small">{HEADER_SMALL}</p>
              <p styleName="big">{HEADER_BIG}</p>
            </div>
          </header>

          <section className="row" styleName="banner">
            <div className="col-md-12">
              <article>
                <p styleName="intro">{BANNER_TEXT}</p>
                <div styleName="author">
                  <div
                    className={styles['avatar']}
                    style={{
                      backgroundImage: `url(${feedbackAuthor})`,
                    }}
                  />
                  <div className={styles['details']}>
                    <div styleName="name">Karolin Hommel</div>
                    <div styleName="position">
                      Marketing Manager Deutschland
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
          <div className="row" styleName="job-offers">
            <div className="container">
              <h2>{JOB_OFFERS_H2}</h2>
              {this.props.jobSections
                ? this.props.jobSections.map(jobSection => (
                    <JobSection
                      key={jobSection.objectId}
                      sectionId={jobSection.objectId}
                      heading={jobSection.department}
                      iconUrl={jobSection.jobIcon.url}
                      jobList={jobList}
                    />
                  ))
                : null}
            </div>
          </div>

          <div className={styles['about-section']}>
            <div className={styles['details-outer']}>
              <div className={styles['details-inner']}>
                <h3>Über CHEF.ONE</h3>
                <p>
                  CHEF.ONE ist eine Online-Plattform, die Vorreiter einer
                  gastronomischen Revolution ist. Sie bringt leidenschaftliche
                  (Hobby-) Köche und Gäste im Zeichen des gemeinsamen Genusses
                  an einem Esstisch zusammen – dabei ist jeder Abend ein
                  einzigartiges Erlebnis. Wir von CHEF.ONE arbeiten beständig an
                  der Pflege einer besonderen Esskultur, geprägt von
                  Wertschätzung für Nahrung und zwischenmenschliche Nähe.
                </p>
              </div>
            </div>
          </div>

          <div className={styles['why-section']}>
            <div className={styles['image']} />
            <div className={styles['text']}>
              <h2>Bei CHEF.ONE arbeiten</h2>
              <p>
                In einem Food Start-Up arbeiten ohne selbst perfekt kochen zu
                können? Das geht, solange du trotzdem gutes Essen liebst und
                dich virtuos durch die sozialen Netzwerke navigieren kannst.
                Bist du noch dazu immer offen für neue Herausforderungen und
                Ideen, steht deiner Mitarbeit bei uns nichts mehr im Wege.
              </p>
              <p>
                Hört sich gut an? Super! Bevor du jetzt sofort anfängst dein
                bewährtestes Bewerbungsfoto rauszusuchen und deinen Lebenslauf
                nochmal auf Hochglanz zu bringen, lass uns dir gerne noch etwas
                mehr darüber erzählen, wie es ist für CHEF.ONE zu arbeiten.
              </p>
              <p>
                Wir wollen innovativ über das gastronomische Erlebnis nachdenken
                und neue Lösungen für alte Probleme finden. Wichtig ist uns,
                dass du dich bei der Arbeit wohl fühlst, denn nur so können wir
                zusammen Großartiges leisten. Und schließlich ist das auch die
                Mission, die wir bei unseren Dinnern verfolgen: Am Ende des
                Abends sollen alle glücklich nach Hause gehen.
              </p>
            </div>
          </div>
        </div>
      );
    }
  },
);
