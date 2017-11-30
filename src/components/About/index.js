// @flow

import React from 'react';
import cx from 'classnames';
import styles from './index.module.less';
import DonateSection from './../FrontPage/DonateSection';

import firstSectionImage from './first-section-image.jpg';
import secondSectionImage from './second-section-image.jpg';
import avatar1 from './avatar1.jpg';
import avatar2 from './avatar2.jpg';
import avatar3 from './avatar3.png';
import paella from './paella.jpg';

export default () => {
  // TODO: it's a temporary fix for build
  if (!styles) return <div />;
  return (
    <div className={styles['about-container']}>
      <h1 className={styles['page-title']}>
        Mit CHEF.ONE die Küchen deiner Stadt entdecken
      </h1>

      <div className={styles['text-section']}>
        <p className={styles['text']}>
          CHEF.ONE entstand aus einer nur allzu bekannten Not heraus: Der Job
          führt einen nicht nur in eine neue, fremde Stadt, sondern beansprucht
          auch noch so viel Zeit, dass kaum noch Gelegenheit bleibt zum Essen,
          Kochen, Lachen, Leben. Ein Unding, fanden unsere Gründer, die drei
          Freunde Eddi, Philipp und Dogan entwickelten deswegen eine
          Online-Plattform, die all ihre Bedürfnisse – nach Gemeinschaft, gutem
          Essen und stimulierender Unterhaltung – befriedigen sollte.
          <br />
          <br />
          Herausgekommen ist dabei CHEF.ONE. Hier können talentierte und
          passionierte Köche zu hingebungsvollen Gastgebern ihrer privaten
          Dinnerparty werden und dabei nicht nur ihre Leidenschaft ausleben,
          sondern auch noch neue, interessante und kulinarisch gleich tickende
          Menschen in gemütlicher Atmosphäre kennenlernen.{' '}
        </p>

        <div
          className={styles['image']}
          style={{
            backgroundImage: `url(${firstSectionImage})`,
          }}
        />
      </div>

      <div className={styles['text-section']}>
        <div
          className={cx(styles['image'], styles['reversed'])}
          style={{
            backgroundImage: `url(${secondSectionImage})`,
          }}
        />
        <p className={cx(styles['text'], styles['reversed'])}>
          Alles nahm seinen Anfang in Hamburg, unsere Idee ist jedoch eine
          globale, verbindet doch die allermeisten der Wunsch nach der
          Entschleunigung und dem bewussten Genießen. Nachdem wir Anfang 2016
          noch mit tatkräftiger Unterstützung von unseren Freunden und Bekannten
          in die Alphaphase gestartet sind, befindet sich CHEF.ONE nun seit
          August 2016 in der Beta-Phase. Wir arbeiten beständig daran uns zu
          verbessern und in immer mehr Städte, auch weltweit, zu expandieren.{' '}
          <br />
          <br />
          Während zunächst Großstädte unseren Hauptfokus darstellten, gewann
          unsere Idee zunehmend an Momentum. Bald, so hoffen wir, wird jeder die
          Möglichkeit haben bei einem CHEF.ONE-Dinner mit seinen Nachbarn in
          Kontakt zu kommen.
        </p>
      </div>

      <div className={styles['ceo-section']}>
        <h2>Die Gründer</h2>
        <div className={styles['people']}>
          <div className={styles['person']}>
            <img src={avatar1} alt="" />
            <p className={styles['name']}>Eddi Alim</p>
          </div>
          <div className={styles['person']}>
            <img src={avatar2} alt="" />
            <p className={styles['name']}>Philipp Benseler</p>
          </div>
          <div className={styles['person']}>
            <img src={avatar3} alt="" />
            <p className={styles['name']}>Dogan Ayhan</p>
          </div>
        </div>
      </div>

      <div className={styles['attendee-info-section']}>
        <div className={styles['details-outer']}>
          <div className={styles['details-inner']}>
            <h3>Du liebst es zu essen? Wir auch.</h3>
            <p>
              Und noch dazu lieben wir auch die Abwechslung und begeben uns
              immer wieder auf die Suche nach spannenden und andersartigen
              kulinarischen Erlebnissen. Keine Lust mehr auf den Stammitaliener
              um die Ecke? Dann finde bei unseren thematisch abgestimmten Events
              Gleichgesinnte, die geschmacklich voll mit dir auf einer
              Wellenlänge liegen. Mal aufregend anders wie ein Zanderfilet als
              Currywurst, mal wohlig vertraut wie Omas tschechischer
              Zwetschgenkuchen – bei CHEF.ONE ist jeder Abend einzigartig, weil
              er von jedem Gastgeber selbstständig gestaltet wird.{' '}
            </p>
          </div>
        </div>
      </div>

      <div className={cx(styles['chef-section'])}>
        <img src={paella} />
        <div className={cx(styles['text'])}>
          <h3>
            Du kochst gerne opulent, doch manchmal fehlt dir einfach die
            geeignete Runde?
          </h3>
          <p>
            Egal ob du ambitionierter Hobbykoch bist oder Vollprofi mit Lust auf
            Abwechslung von der Restaurantküche, bei CHEF.ONE hast du die
            Gelegenheit andere mit deinem Essen glücklich zu machen. Du hast
            alle Zügel in der Hand und musst dir von uns bei nichts reinreden
            lassen – du bestimmst selbst die Anzahl der Gäste an deinem Tisch,
            dein kredenztes Menü und natürlich auch den Kostenausgleich für
            deine Mühen. Wichtig ist nur eins: Du und deine Gäste sollen Spaß
            haben, sich wohlfühlen und in privater Atmosphäre ein feines Mahl
            genießen. Eben Essen wie es sein sollte.{' '}
          </p>
        </div>
      </div>

      <DonateSection />
    </div>
  );
};
