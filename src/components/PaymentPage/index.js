//@flow

export * as fixtures from './fixtures';

import React from 'react';
import R from 'ramda';

import GetCardType from './GetCardType';
import PurePaymentPage from './PurePaymentPage';
import type { TActiveMethod } from './PaymentProcedureCard';

import withSimpleState from '../../utils/withSimpleState';
import type { Changeble } from '../../utils/withSimpleState';
import { IsMobileDecorator } from '../../decorators';
import { checkCompose } from '../../decorators/ValidationDecorator';

import WillMountBraintree from './WillMountBraintree';

const PHONE_NUMBER_REQUIRED =
  'Für die Buchung brauchen wir deine Telefonnummer!';
const PHONE_MIN_LENGTH = 7;
const PHONE_NUMBER_MIN_SYMBOLS = `Telefonnummer sollte mindestens ${
  PHONE_MIN_LENGTH
} Zeichen lang sein`;
const ERROR_CARDHOLDER = 'Name des Karteninhabers muss ausgefüllt sein';
const ERROR_CARDNUMBER = 'Kartennummer muss ausgefüllt sein';
const ERROR_ACCEPT_TERMS = 'Bitte akzeptiere die Nutzungsbedingungen';
const ERROR_CVV = 'Bitte trage die Prüfnummer ein';
const ERROR_EXPIRATION_MONTH = 'Wähle bitte den Verfallmonat aus';
const ERROR_EXPIRATION_YEAR = 'Wähle bitte das Verfalljahr aus';
const ERROR_PAYMENT_PROCEDURE = 'Wähle bitte eine Bezahlungsart aus';
type braintreeMethodsT = 'paypal' | 'creditCard';
const getMethodParams = (method: braintreeMethodsT, props: *) => {
  if (method === 'creditCard') {
    const {
      cardHolder,
      cardNumber,
      expirationYear,
      expirationMonth,
      CVV,
    } = props;
    const res = {
      number: cardNumber.value,
      cardholderName: cardHolder.value,
      expirationDate: `${expirationMonth.value}/${expirationYear.value}`,
      cvv: CVV.value,
    };
    return res;
  }
  if (method === 'paypal') {
    const { orderInfoCard: { finalPrice } } = props;
    return {
      amount: finalPrice,
      currency: 'EUR',
    };
  }
};
const getBraintreeParams = (method: braintreeMethodsT, props: *) => {
  let braintreeParams;
  if ('paypal' === method) {
    braintreeParams = {
      type: method,
      paypal: () => getMethodParams('paypal', props),
    };
  }
  if ('creditCard' === method) {
    braintreeParams = {
      type: method,
      creditCard: () => getMethodParams('creditCard', props),
    };
  }
  return braintreeParams;
};
export type PropsType = {
  onContinueClick: Function,
  customerInfoForm: {
    phone?: string,
  },
  orderInfoCard: {
    onOrderDiscountVerify: Function,
    currency: string,
    price: number,
    discountValue?: number,
    guestsMax: number,
    finalPrice: number,
    foodImage: string,
    eventTitle: string,
    eventDate: string,
    eventTime: string,
    chefAvatar: string,
  },
};
type TInnerProps = PropsType & {
  paymentReady: boolean,
  customerInfoReady: boolean,
  orderInfoReady: boolean,
  isAgreedTerms: Changeble<boolean>,
  activeMethod: Changeble<TActiveMethod>,
  cardHolder: Changeble<string>,
  cardType: Changeble<string>,
  cardNumber: Changeble<string>,
  expirationYear: Changeble<string>,
  expirationMonth: Changeble<string>,
  CVV: Changeble<string>,
  isUseDiscount: Changeble<boolean>,
  chefMessageChangeble: Changeble<string>,
  phoneChangeble: Changeble<string>,
  discountCode: Changeble<string>,
};
export type TOutFormData = {
  discount100: boolean,
  discountCode?: string,
  chefMessage: string,
  phone: string,
  activeMethod: TActiveMethod,
  nonce?: string,
};
const getStateToSave = (props: TInnerProps): TOutFormData => ({
  discount100: props.orderInfoCard.finalPrice === 0,
  discountCode: props.discountCode.value,
  chefMessage: props.chefMessageChangeble.value,
  phone: props.phoneChangeble.value,
  activeMethod: props.activeMethod.value,
});
type TNonceInfo = {
  details?: Object,
  nonce: string,
  type?: string,
};
const withCardState = R.compose(
  withSimpleState('cardType', () => null),
  withSimpleState(
    'cardHolder',
    () => '',
    checkCompose(value => (!value ? ERROR_CARDHOLDER : null)),
  ),
  withSimpleState(
    'cardNumber',
    () => '',
    checkCompose(value => (value.length !== 16 ? ERROR_CARDNUMBER : null)),
  ),
  withSimpleState(
    'expirationYear',
    () => '',
    checkCompose(value => (!value ? ERROR_EXPIRATION_YEAR : null)),
  ),
  withSimpleState(
    'expirationMonth',
    () => '',
    checkCompose(value => (!value ? ERROR_EXPIRATION_MONTH : null)),
  ),
  withSimpleState(
    'CVV',
    () => '',
    checkCompose(value => (value.length !== 3 ? ERROR_CVV : null)),
  ),
);
const res: Component$<PropsType, *> = R.compose(
  IsMobileDecorator(),
  //$FlowIssue
  R.compose(
    withSimpleState(
      'phoneChangeble',
      ({ customerInfoForm: { phone } }) => phone,
      checkCompose(
        value => (!value || value === '+' ? PHONE_NUMBER_REQUIRED : ''),
        value =>
          value && value.length < PHONE_MIN_LENGTH
            ? PHONE_NUMBER_MIN_SYMBOLS
            : '',
      ),
    ),
    withSimpleState('chefMessageChangeble', () => ''),
    withSimpleState(
      'activeMethod',
      () => null,
      checkCompose(value => (!value ? ERROR_PAYMENT_PROCEDURE : null)),
    ),
    withCardState,
    withSimpleState('isUseDiscount', () => false),
    withSimpleState('discountCode', () => ''),
    withSimpleState(
      'isAgreedTerms',
      () => false,
      checkCompose(value => (!value ? ERROR_ACCEPT_TERMS : null)),
    ),
  ),
)(
  class Container extends React.Component<*, *> {
    state: {
      touched: boolean,
      checkout?: Object,
      funcToCall?: Function,
      paypal: {
        initiate?: boolean,
        params?: Object,
      },
      creditCard: {
        initiate?: boolean,
        params?: Object,
      },
      nonceInfo?: TNonceInfo,
      mode?: string,
    };
    constructor() {
      super();
      this.state = {
        touched: false,
        paypal: {
          initiate: false,
        },
        creditCard: {
          initiate: false,
        },
      };
    }
    componentDidMount() {
      window.addEventListener(
        'message',
        this.props.onMaybeSofortResult.bind(this),
        false,
      );
    }
    componentWillUnmount() {
      window.removeEventListener(
        'message',
        this.props.onMaybeSofortResult.bind(this),
        false,
      );
    }
    initiateBraintreeMethod(method) {
      const otherMethod = method === 'paypal' ? 'creditCard' : 'paypal';
      console.log('initiateBraintreeMethod');
      this.setState({
        [otherMethod]: {
          initiate: false,
        },
        [method]: {
          ...this.state[method],
          initiate: true,
        },
      });
    }
    componentDidUpdate(prevProps, prevState) {
      const nonceInfo = this.state.nonceInfo;
      if (
        nonceInfo &&
        JSON.stringify(prevState.nonceInfo) !==
          JSON.stringify(this.state.nonceInfo)
      ) {
        const dataToPass = getStateToSave(this.props);
        const nonce = nonceInfo.nonce;
        this.props.onContinueClick({
          ...dataToPass,
          nonce,
        });
      }
    }
    render() {
      const {
        isAgreedTerms,
        isUseDiscount,
        discountCode,
        chefMessageChangeble,
        phoneChangeble,
        orderInfoCard,
        activeMethod,
        cardHolder,
        cardType,
        cardNumber,
        expirationYear,
        expirationMonth,
        paymentReady,
        customerInfoReady,
        orderInfoReady,
        CVV,
      }: TInnerProps = this.props;

      const props = this.props;
      const creditCardErrors =
        activeMethod.value === 'creditCard'
          ? //$FlowIssue
            R.compose(R.flatten, R.filter(R.identity), R.pluck('errors'))([
              cardHolder,
              cardNumber,
              expirationYear,
              expirationMonth,
              CVV,
            ])
          : [];
      const discount100 = this.props.orderInfoCard.finalPrice === 0;
      const errors = [
        ...props.phoneChangeble.errors,
        ...(discount100 ? [] : props.activeMethod.errors),
        ...creditCardErrors,
        ...props.isAgreedTerms.errors,
      ];
      let disabled = false; // !discount100 && props.activeMethod.value !== 'sofort' && (!this.state.mode || !this.state[this.state.mode] || !this.state[this.state.mode].funcToCall); // // if(discount100) { // //   let t = (!this.state.mode || !this.state[this.state.mode] || !this.state[this.state.mode].funcToCall); //   console.log(this.state) //   disabled = t; // // console.log('disabled', disabled) // }
      const paymentProceedure = {
        activeMethod: {
          value: activeMethod.value,
          onChange: method => {
            if (method === 'creditCard' || method === 'paypal') {
              this.initiateBraintreeMethod(method);
            }
            activeMethod.onChange(method);
          },
        },
        braintreeCreditCardData: {
          cardHolder,
          cardNumber: {
            value: cardNumber.value,
            onChange: value => {
              cardNumber.onChange(value);
              cardType.onChange(GetCardType(value));
            },
          },
          expirationYear,
          expirationMonth,
          CVV,
          cardType: cardType.value,
        },
      };

      const onContinueClick = event => {
        this.setState({
          touched: true,
        });
        if (errors.length) {
          return;
        }
        if (event.preventDefault) {
          event.preventDefault();
        }
        if (
          props.activeMethod.value === 'paypal' ||
          props.activeMethod.value === 'creditCard'
        ) {
          this.state[props.activeMethod.value].funcToCall();
          return;
        }
        const dataToPass = getStateToSave(this.props);
        this.props.onContinueClick(dataToPass);
      };
      const purePaymentParams = {
        errors,
        discount100,
        touched: this.state.touched,
        disabled,
        isAgreedTerms,
        isUseDiscount,
        discountCode,
        chefMessageChangeble,
        phoneChangeble,
        orderInfoCard,
        isMobile: props.isMobile,
        paymentProceedure,
        onContinueClick,
        paymentReady,
        customerInfoReady,
        orderInfoReady,
      };
      return (
        <div>
          {['paypal', 'creditCard'].map((method: braintreeMethodsT) => {
            const braintreeParams = getBraintreeParams(method, this.props);
            const invalidate = cb => {
              console.log('invalidate');
              if (method === 'paypal') {
                //$FlowIssue
                const checkout = this.state[method].checkout;
                if (!checkout) {
                  cb();
                  return;
                }
                checkout.teardown(() => {
                  console.log('teardown');
                  this.setState(
                    {
                      [method]: {
                        initiate: true,
                      },
                    },
                    cb,
                  );
                });
              }
            };
            const onReady = checkout => {
              this.setState({
                [method]: {
                  ...this.state[method],
                  checkout,
                  funcToCall: checkout[method].initAuthFlow,
                },
                mode: method,
              });
            };
            const onPaymentMethodReceived = (nonceInfo: TNonceInfo) =>
              this.setState({
                nonceInfo,
              });

            return (
              <div>
                {this.state[method].initiate ? (
                  <WillMountBraintree
                    clientToken={this.props.clientToken}
                    price={this.props.orderInfoCard.finalPrice}
                    braintreeParams={braintreeParams}
                    invalidate={invalidate}
                    onReady={onReady}
                    onPaymentMethodReceived={onPaymentMethodReceived}
                  />
                ) : null}
              </div>
            );
          })}
          <PurePaymentPage {...purePaymentParams} />
        </div>
      );
    }
  },
);
export default res;
