//@flow

export const eventImpression = ({
  eventId,
  title,
}: {
  eventId: string,
  title: string,
}) => {
  // The impression from a Related Products section.
  ga('ec:addImpression', {
    // Provide product details in an impressionFieldObject.
    id: eventId, // Product ID (string).
    name: title, // Product name (string).
  });

  // The product being viewed.
  ga('ec:addProduct', {
    // Provide product details in an productFieldObject.
    id: eventId, // Product ID (string).
    name: title, // Product name (string).
  });

  ga('ec:setAction', 'detail'); // Detail action.
  ga('send', 'pageview');
};

export const checkOut = (step: number): Promise<*> =>
  new Promise(resolve => {
    // (On "Next" button click)
    ga('ec:setAction', 'checkout', { step });

    ga('send', 'pageview');
    resolve();
  });

export const clickBookNow = () => checkOut(1);
export const addPaymentInfo = () => checkOut(2);

export const purchase = ({
  eventId,
  orderId,
  title,
  price,
  totalPrice,
  shipping,
  amount,
  coupon,
}: {
  eventId: string,
  orderId: string,
  title: string,
  price: string,
  totalPrice: string,
  shipping: string,
  amount: number,
  coupon?: string,
}) => {
  ga('ec:addProduct', {
    currencyCode: 'EUR',
    id: eventId,
    name: title,
    price,
    quantity: amount,
  });

  ga('ec:setAction', 'purchase', {
    currencyCode: 'EUR',
    id: orderId,
    affiliation: 'Web online',
    revenue: totalPrice,
    shipping,
    coupon,
  });
  ga('send', 'pageview');
};
