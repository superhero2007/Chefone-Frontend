// @flow
import moment from 'moment';

import { Discount, Order, _User, Currencies } from '../../parseApi/api';

export const getUserDiscounts = async ({ userId }: { userId: string }) => {
  const invitedUserDiscounts = await Discount.Get({
    equalTo: [
      Discount.Field.invitedUser(_User.Pointer(userId)),
      Discount.Field.inviteType('INVITED'),
    ],
  });

  const invitingUserDiscounts = await Discount.Get({
    equalTo: [
      Discount.Field.invitingUser(_User.Pointer(userId)),
      Discount.Field.inviteType('INVITING'),
    ],
  });

  return [...invitedUserDiscounts, ...invitingUserDiscounts]
    .filter(({ usageMax, usageCount }) => {
      return usageCount < usageMax;
    })
    .filter(({ usageExpire }) => {
      return moment(usageExpire).isAfter(moment());
    });
};

export const findDiscount = async (
  code: string,
  eventCurrencyName: string,
  currentUserId: string,
) => {
  code = code.toUpperCase();

  if (!/^\w+$/.test(code)) {
    throw Error('code should be only latin alphabet or numbers');
  }

  const discounts = await Discount.Get({
    include: ['currency'],
    equalTo: [Discount.Field.code(code)],
    limit: 1,
  });

  if (!discounts || !discounts.length) {
    throw Error('invalid discount code');
  }

  const [discount] = discounts;
  let {
    objectId,
    usageExpire,
    percentage,
    cash,
    usageCount,
    usageMax,
  } = discount;
  usageCount = usageCount || 0;
  const currency = Currencies.EnsureInstance(discount.currency);

  const currencyName = currency.name || 'EUR';

  if (currencyName === null) {
    throw Error('currencyName not defined');
  }

  if (objectId === null) {
    throw Error('objectId not defined');
  }

  if (usageMax === null) {
    throw Error('usageMax not defined');
  }

  if (currencyName !== eventCurrencyName) {
    throw Error(
      `discount currencyName is ${currencyName} eventCurrencyName is ${
        eventCurrencyName
      } should be same`,
    );
  }

  if (moment().isAfter(moment(usageExpire))) {
    throw Error('discount code expired');
  }

  if (!percentage && !cash) {
    throw Error('discount object should have percentage or cash');
  }

  if (usageCount >= usageMax) {
    throw Error('discount code is overused');
  }

  const orders = await Order.Get({
    equalTo: [
      Order.Field.objectIdDiscount(Discount.Pointer(objectId)),
      Order.Field.objectIdUser(_User.Pointer(currentUserId)),
      Order.Field.finalized(true),
    ],
    limit: 1,
  });

  if (orders.length > 0) {
    throw Error('discount code was used before by you');
  }

  return { ...discount, code };
};
