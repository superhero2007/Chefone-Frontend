// @flow

import { sendJsonPost } from './helpers';

export const finalizeOrder = async ({
  payment_method_nonce,
  order_id,
  paypal,
}: {
  API_SERVER: string,
  payment_method_nonce: string,
  order_id: string,
  paypal: boolean,
}) => {
  const result = await sendJsonPost({
    url: `/api-payment/payments/transaction`,
    data: {
      payment_method_nonce,
      order_id,
      paypal,
    },
  });

  const { status, message } = result;
  if (status === 'Transaction result not successful') {
    throw Error(message);
  }
  console.log('got response for finalizeOrder ', result);

  return result;
};

export const createOrder = async ({
  userId,
  eventId,
  amount,
  phone,
  userMessage,
  discountId,
  discountCode,
  discountPrice,
  timestamp,
}: {
  userId: string,
  eventId: string,
  amount: number,
  phone: string,
  userMessage: string,
  discountId?: string,
  discountCode?: string,
  discountPrice: string,
  timestamp?: string,
}) => {
  const result = await sendJsonPost({
    url: `/api-payment/orders`,
    data: {
      userId,
      eventId,
      amount,
      phone,
      userMessage,
      discountId,
      discountCode,
      discountPrice,
      timestamp,
    },
  });

  return result;
};
