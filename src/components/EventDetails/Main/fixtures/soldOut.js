//@flow

import type { PropsT } from '../';

import {
  attendee,
  event2,
  event,
  reviews,
  avatar,
  IMAGE_URL,
} from '../../../../stubData';

const res: PropsT = {
  onUnfollow: () => {},
  doesFollowChef: false,
  goToWaitingList: () => {},
  goRequestPrivateDinner: () => {},
  onRequestPrivateDinnerSubmit: () => {},
  goToEvent: () => {},
  showWaitingList: false,
  showPrivateDinnerRequest: false,
  eventId: 'id',
  passed: false,
  attendees: [
    attendee,
    attendee,
    attendee,
    attendee,
    attendee,
    attendee,
    attendee,
    attendee,
    attendee,
  ],
  eventsLoading: false,
  events: [event2, event2, event2],
  futureEventsLoading: false,
  futureEvents: [event, event, event],
  geoLocation: {
    latitude: 59.57,
    longitude: 30.18,
  },
  onBookNowClick: () => {},
  onFetchMoreReviews: () => {},
  reviews,
  date: 'Nov 22. 2016',
  time: '19:00 - 22:30 Uhr',
  onAmountChanged: () => {},
  servings: 8,
  servingsSold: 8,
  amount: 1,
  maxAmount: 3,
  price: 45,
  title: 'TITLE',
  currency: '€',
  chefInfo: {
    avatar,
    name: 'Eddi',
    address: 'Berlin, Germany',
    rating: 4,
    about:
      'Eddi is a passionate computer scientist and entrepreneur, he quickly came up with the idea of ​​solving his problem digitally: he wanted to create a platform for enthusiastic cooks to offer a menu, whether refined or grounded, professional or hobby Guests can find and book these dinners quickly and easily.',
  },
  foodDescription: `Hast du Lust auf leckeres Essen in guter Gesellschaft?
  Dann komm zum „Abendbrot im Kiez“ von LéonceConcepts!

  Wir bieten ein kommunikatives Dinner-Event, bei dem Menschen aus dem Kiez in geselliger Runde an einem Tisch zusammenkommen: zum Essen, Trinken, Genießen und Plaudern. Unser Abendbrot im Kiez ist die ideale Gelegenheit bei einem leckeren Essen neue Leute kennenzulernen und die Woche in entspannter Atmosphäre ausklingen zu lassen.

  Mit der Liebe zum Kochen verbindet sich beim „Abendbrot im Kiez“ die Leidenschaft des Gastgebens. Hier ein Auszug unseres Herbstrepertoires:
  – feines Kürbis-Karfoffelsüppchen
  – geröstetes Graubrot mit Meerrettichsahne, Rote Beete-Apfelsalat und Fetakäse
  – kleine gebutterte Topfen-Spinat-Knödel
  – Rindfleischsalat mit Gurke und Zwiebel
  – deftiges Käsebrett & feine Desserts

  Ein Apéritif und Wasser sind im Preis mit inbegriffen.`,
  images: [IMAGE_URL],
};

export default res;
