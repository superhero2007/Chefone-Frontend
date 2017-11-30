// @flow

import type { ParseEventInstance } from '../parseApi/api/Event';
import type { Parse_UserInstance } from '../parseApi/api/_User';
import type { ParseReviewsInstance } from '../parseApi/api/Reviews';
import type { ParseDiscountInstance } from '../parseApi/api/Discount';
import type { ParseCitiesInstance } from '../parseApi/api/Cities';
import type { ParseJobsInstance } from '../parseApi/api/Jobs';
import type { ParseJobSectionInstance } from '../parseApi/api/JobSection';
import type { ParseGeoPointType } from '../parseApi/src/runtime';
import type { Type as OnboardingT } from '../redux/modules/onboarding';

export type Meta<T> = {
  meta: Object,
  data: T,
};

export type CreateEventType = {
  eventId?: string,
  userId: string,
  cityId: string,
  title: string,
  locationDetails: string,
  foodDescription: string,
  amountOfPeople: number,
  nutrition: string,
  category: string,
  foodImages: Array<string | null>,
  eventMoment: number,
  phoneNumber: number,
  price: number,
  address: string,
  location: ParseGeoPointType,
  useMasterKey: boolean,
  city: {
    title: string,
    objectId: string,
  },
};

export type ParseEventInstance2 = ParseEventInstance & {
  firstName: string,
  avatar: string,
  currency: {
    objectId: string,
    name: string,
  },
  title: string,
  notFound: boolean,
};

// discountId: discount.objectId,
// discountCode: discount.code,

export type ReduxState = {
  form: Meta<Object>,
  routing: { locationBeforeTransitions: Object },
  progress: Meta<Object>,
  createEvent: CreateEventType,
  createReview: Meta<Object>,
  reduxAsyncConnect: Meta<Object>,
  invitingUser: Meta<Parse_UserInstance>,
  session: Parse_UserInstance,
  cities: Meta<Array<ParseCitiesInstance>>,
  fee: Meta<number>,
  modals: { page: string | null },
  city: Meta<ParseCitiesInstance>,
  jobSections: Meta<Array<ParseJobSectionInstance>>,
  jobs: Meta<Array<ParseJobsInstance>>,
  order: Meta<Object>,
  orders: Meta<Array<Object>>,
  myOrders: Meta<Array<Object>>,
  loadedOrder: Meta<Object>,
  sofortOrder: Meta<Object>,
  finalizeOrder: Meta<Object>,
  notification: Meta<Object>,
  loading: Meta<Object>,
  stickyEvent: Meta<ParseEventInstance>,
  event: Meta<ParseEventInstance2>,
  events: Meta<Array<ParseEventInstance>>,
  passedEvents: Meta<Object>,
  chefEvents: Meta<Object>,
  inviteDiscounts: Meta<Array<ParseDiscountInstance>>,
  discount: Meta<ParseDiscountInstance>,
  amount: number,
  orderProps: { phone: string, message: string },
  reviews: Meta<Array<ParseReviewsInstance>>,
  reviewsForDashboard: Meta<Array<any>>,
  attendees: Meta<Array<Object>>,
  messages: Meta<Object>,
  message: Meta<Object>,
  adminEventDetails: Meta<Object>,
  adminEvents: Meta<Object>,
  adminPaymentOverview: Meta<Object>,
  onboarding: OnboardingT,
};

export type GetState = () => ReduxState;
