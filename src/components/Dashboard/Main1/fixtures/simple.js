//@flow

import type { PropsT } from '../';

import { default as orders } from '../../OrdersSection/fixtures/simple';
import { default as recentOrders } from '../../MessagesSection/fixtures/simple';
import { default as reviews } from '../../ReviewsSection/fixtures/simple';
import { default as discounts } from '../../DiscountsSection/fixtures/simple';

const res: PropsT = {
  onCopy: () => {},
  onReviewIntentClick: () => {},
  orders: orders.values,
  ordersLoading: false,
  recentOrders: recentOrders.values,
  recentOrdersLoading: false,
  discounts: discounts.values,
  discountsLoading: false,
  reviews: reviews.values,
  reviewsLoading: false,
};

export default res;
