// @flow

import R from 'ramda';
import { getOrderEventByOrderId } from './order';
import {
  Order,
  Currencies,
  Payment,
  Event,
  Discount,
  _User,
} from '../../parseApi/api';
import type { ParseDiscountInstance } from '../../parseApi/api/Discount';

export const calcEarnings = async ({
  greaterDate,
  lessDate,
}: {
  greaterDate?: string,
  lessDate?: string,
}) => {
  let queryParams = {
    matchQueries: [
      {
        fieldName: 'orderobjectId',
        queryType: 'Order',
        query: {
          equalTo: [Order.Field.finalized(true)],
        },
      },
    ],
    greaterThan: greaterDate
      ? Payment.Field.createdAt(new Date(greaterDate))
      : undefined,
    lessThan: lessDate
      ? Payment.Field.createdAt(new Date(lessDate))
      : undefined,
  };

  const payments = await Payment.Get(queryParams);

  //$FlowIssue
  return R.reduce((a, b) => a + b, 0)(R.pluck('totalAmount')(payments));
};

export const set100PercentDiscountPayment = async ({
  discountObject,
  orderobjectId,
  currencyobjectId,
  environment,
  amount,
  phoneNumber,
  userId,
}: {
  discountObject: ParseDiscountInstance,
  orderobjectId: string,
  currencyobjectId: string,
  environment: string,
  amount: number,
  phoneNumber: number,
  userId: string,
}) => {
  const { objectId: discountId, usageCount } = discountObject;

  await Order.Set({
    objectId: orderobjectId,
    finalized: true,
    phone: phoneNumber,
    discountPrice: 0,
    objectIdDiscount: Discount.Pointer(discountId),
  });

  await Discount.Set({
    objectId: discountId,
    usageCount: usageCount + 1,
  });

  const event = await getOrderEventByOrderId({ orderId: orderobjectId });

  const res = await Payment.Create({
    totalAmount: 0,
    type: '100% discount',
    platform: 'WebSite',
    state: 'success',
    environment,
    orderobjectId: Order.Pointer(orderobjectId),
    currencyobjectId: Currencies.Pointer(currencyobjectId),
  });

  let { objectId, servingsSold } = event;

  await Event.Set({
    objectId,
    servingsSold: parseInt(servingsSold ? servingsSold : 0) + amount,
  });

  await _User.Set({
    objectId: userId,
    phone: phoneNumber,
  });

  return res;
};
