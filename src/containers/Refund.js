// @flow

import React from 'react';

const Refund = () => {
  return (
    <div className="container refund-container">
      <div className="col-xs-12 col-sm-10 col-sm-offset-1">
        <h2>CHEF.ONEs Erstattungsrichtlinien</h2>
        <p>
          In dieser Richtlinie ist geregelt, wann Gäste berechtigt sind, ihre
          Zahlung rückerstattet zu bekommen. Diese Erstattungsrichtlinien gelten
          für Gäste, die ein Event gebucht haben. Rechtliche Ansprüche können
          aus ihnen nicht abgeleitet werden.
        </p>

        <h3>Rückerstattung aufgrund von Absage des Events</h3>

        <p>
          Die Höhe und Form der Rückerstattung für Gäste richtet sich nach
          folgenden Fällen:
        </p>
        <ul>
          <li>
            CHEF.ONE erlaubt dem Gast eine volle Rückerstattung des Preises,
            wenn der Gastgeber das Event absagt.{' '}
          </li>
          <li>
            CHEF.ONE erlaubt dem Gast eine volle Rückerstattung des Preises in
            Form eines Gutschein-Codes, wenn der Gast mindestens 7 Tage vor
            Beginn des Events die Veranstaltung per Mail an service@chef.one
            absagt (Beispiel: Event findet am 11.02.2017 statt und der Gast sagt
            spätestens am 04.02.2017 ab).{' '}
          </li>
          <li>
            CHEF.ONE erlaubt dem Gast die Rückerstattung von 50% des Preises in
            Form eines Gutscheins, wenn der Gast mindestens 48 Stunden vor
            Beginn des Events die Veranstaltung per Mail an service@chef.one
            absagt.{' '}
          </li>
        </ul>
        <p>Die Rückerstattung durch CHEF.ONE erfolgt automatisiert.</p>

        <h3>Andere Optionen zur Rückerstattung</h3>

        <p>
          CHEF.ONE wird von Fall zu Fall individuell entscheiden, ob eine volle
          Rückerstattung für Gäste möglich ist, zum Beispiel wenn
        </p>
        <ul>
          <li>
            Der Gastgeber nicht den vollen Zutritt zu der Veranstaltung
            ermöglicht
          </li>
          <li>
            Die Beschreibung der Veranstaltung grundlegend von dem gebotenen
            Dinner abweicht (zum Beispiel in den Hauptzutaten, Portionsgrößen,
            usw.).
          </li>
        </ul>
        <p>
          Im Falle eines Rückerstattungswunsches müssen Gäste uns zwingend
          innerhalb von 12 Stunden Fehlleistungen anzeigen. Hierzu muss eine
          Nachricht an service@chef.one ergehen. Darüber hinaus müssen Gäste uns
          relevante Fotos und andere Beweismittel sobald wie möglich zukommen
          lassen, um unsere weitere Untersuchung des Falls zu unterstützen.
        </p>
      </div>
    </div>
  );
};
export default Refund;
