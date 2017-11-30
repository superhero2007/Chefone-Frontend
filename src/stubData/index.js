//@flow

export const avatar =
  'https://pfilestest.s3.amazonaws.com/c8e7b781c47973e71795f9b26b448e60_avatar.jpg';
export const cities = [
  {
    image:
      'https://pfilestest.s3.amazonaws.com/c0909d24dc7eb1c1da3cda05b39add7b_Berlin.jpg',
    name: 'Berlin',
  },
  {
    image:
      'https://pfilestest.s3.amazonaws.com/3fa8ab3c1facf7c85c62fd779b6e9ff3_Hannover.jpg',
    name: 'Hannover',
  },
  {
    image:
      'https://pfilestest.s3.amazonaws.com/6f90ad9f7d91654c82835bff5bf30b62_neu-munich.jpg',
    name: 'München',
  },
  {
    image:
      'https://pfilestest.s3.amazonaws.com/7b72cafe1127528bca9f15ee350832ee_hamburg-dark2.jpg',
    name: 'Hamburg',
  },
];
export const reviewBase = {
  avatar,
  name: 'John',
  createdAtMonthAndYear: 'Oct 2016',
  rating: 4,
  text:
    'Food was superb and we had an amazing time with eddi. We are recommending it to everyone.',
};
export const reviews = [
  {
    ...reviewBase,
    text:
      'Food was superb and we had an amazing time with eddi. We are recommending it to everyone.',
  },
  {
    ...reviewBase,
    text:
      "The food was wonderful and the hosts were great to open their home to us. We had so much fun, and the food was nothing I've had before. Eddi was very welcoming…",
  },
  {
    ...reviewBase,
    text: 'Food was superb and we had an amazing time with eddi.',
  },
];
export const review = {
  onFetchMore: () => {},
  reviews,
};
export const IMAGE_URL =
  'https://pfilestest.s3.amazonaws.com/079315639718b46bad8d3a104d0eb2e4_image2.jpg';
export const attendee = {
  firstName: 'Eddi',
  avatar,
};
export const event = {
  objectId: '0',
  title: 'Coconut & Curry Leaves: 6 fdfdfdf',
  time: 'Tue 18:30 Uhr',
  price: 45,
  currency: '€',
  address: 'Berlin',
  date: 22,
  month: 'NOV',
  foodImage:
    'https://pfilestest.s3.amazonaws.com/86d10f867f2faf33f813bf175da69fa7_image1.jpg',
  numberOfGuestsBooked: 4,
  chef: {
    name: 'Eddi',
    bio: 'some bio',
    rating: 4,
    avatar,
  },
};
export const event2 = {
  servingsSold: 2,
  servings: 10,
  objectId: '0',
  linkTo: '',
  eventStart: '2017-02-18 18:00',
  chefAvatar: avatar,
  title: 'Coconut & Curry Leaves: 6 fdfdfdf',
  price: 45,
  currency: {
    symbol: '€',
  },
  city: 'Berlin',
  vegan: true,
  soldOut: false,
  image1:
    'https://pfilestest.s3.amazonaws.com/e38894640ce55f7d58dbb6bba200bc5a_image1.jpg',
  chef: {
    name: 'Eddi',
    rating_average: 4,
  },
};

export const frontPageData = {
  city: {},
  goToLandingChefs: () => {},
  goToCity: () => {},
  cities,
  events: [event, event, event],
  bestEvent: event,
  signupMailchimp: () => {},
};
export const paymentPageData = {
  paymentReady: true,
  customerInfoReady: true,
  orderInfoReady: true,
  onMaybeSofortResult: console.log.bind(console), // eslint-disable-next-line
  customerInfoForm: { phone: '+49323' },
  orderInfoCard: {
    onOrderDiscountVerify: () => {},
    currency: '€',
    price: 52,
    finalPrice: 52,
    guestsMax: 2,
    guestsNumber: 1,
    foodImage:
      'https://pfilestest.s3.amazonaws.com/b6e745c84a7fee447805ecfdd0094ce6_image1.jpg',
    eventTitle: 'test 3',
    eventDate: 'December 20, 2016',
    eventTime: '3:03 PM',
    chefAvatar:
      'https://pfilestest.s3.amazonaws.com/ae3443b0e5797da07a613ec6bb0a6f3b_avatar.jpg',
  },
};
export const paymentResultData = {
  push: () => {},
  type: 'fail',
  message: 'message',
  rest: {},
  loadedOrder: {
    systemMsg: 'systemMsg',
  },
};

export const citiesSectionData = (number: string) => ({
  goToCity: () => {},

  value: cities.slice(0, parseInt(number)),
});
