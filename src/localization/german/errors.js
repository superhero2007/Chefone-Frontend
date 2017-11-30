// @flow

export const EMAIL_NOT_CONFIRMED =
  'Bitte bestätige deine eMail-Adresse, indem du den Link in der Mail öffnest, die wir dir bei deiner Anmeldung gesendet haben!'; // validation errors for create event - screen 1
export const NO_TITLE_ERROR_TEXT =
  'Du solltest deiner Veranstaltung einen Namen geben';
export const NO_DESCRIPTION_ERROR_TEXT =
  'Du solltest deine Veranstaltung kurz beschreiben';
export const NO_DATE_ERROR_TEXT = 'Wähle ein Datum für die Veranstaltung';
export const NO_TIME_ERROR_TEXT = 'Wähle eine Uhrzeit aus'; // validation errors for create event - screen 2
export const NO_PHONE_ERROR_TEXT =
  'Du solltest eine Telefonnummer hinterlegen, über die dich deine Gäste erreichen können';
export const NO_ADDRESS_ERROR_TEXT = 'Keine Adresse ausgewählt';
export const NO_PRICE_ERROR_TEXT =
  'Du solltest für die Veranstaltung einen Preis festlegen';
export const MIN_ONE_IMAGE_ERROR_TEXT =
  'Du solltest mindestens ein Bild für die Veranstaltung hochladen'; // when user go throw link from email it contains orderId, if this order not found he see this error
export const CREATING_REVIEW_NO_SUCH_ORDER = 'No such order'; // if review is success of fail we fire notification
export const REVIEW_SUCCESS_MESSAGE = 'Danke für deine Bewertung!';
export const REVIEW_ERROR_MESSAGE =
  'Du hast bereits eine Bewertung hinterlassen';
export const REVIEW_ERROR_USER_DOES_NOT_HAVE_ORDER =
  'User does not have this order';
export const PRIVATE_MODE_SAFARI_BUG =
  'Bitte verwenden Sie keine privaten Modus auf Safari';
