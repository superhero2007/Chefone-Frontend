//@flow

export * as ec from './ec';

type TgaEvents =
  | 'pageview'
  | 'Lead'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase';
export const g = (event: TgaEvents, page?: string, params?: Object) => {
  if (__SERVER__) {
    return;
  }

  console.log('ga', page, event, params);
  if (typeof ga === 'undefined') return;

  if (page) {
    ga('set', 'page', page);
  }

  const hitType = event === 'pageview' ? 'pageview' : 'event';

  ga('send', {
    hitType: hitType,
    eventCategory: 'website',
    eventAction: 'click',
    eventLabel: event,
    eventValue: 1,
  });
};

type TfbqEvents =
  | 'Lead'
  | 'Purchase'
  | 'PageView'
  | 'CompleteRegistration'
  | 'InitiateCheckout'
  | 'AddPaymentInfo';
export const fb = (event: TfbqEvents, params?: Object) => {
  if (__SERVER__) {
    return;
  }

  if (typeof fbq === 'undefined') return;

  console.log('fbq', event, params);
  fbq('track', event, params);
};
