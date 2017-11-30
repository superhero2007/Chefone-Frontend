//@flow
import React from 'react';
export type braintreeParamsPaypalT = { type: 'paypal', paypal: Function };

class WillMountPaypalBraintree extends React.Component<*, *> {
  props: {
    invalidate: Function,
    onReady: Function,
    onPaymentMethodReceived: Function,
    clientToken: string,
    price: number,
    braintreeParams: braintreeParamsPaypalT,
  };
  getAuthFlow() {
    console.log('invalidate braintree..');
    this.props.invalidate(() => {
      console.log('invalidate braintree.. done');
      const braintree = require('braintree-web');
      braintree.setup(this.props.clientToken, 'custom', {
        onReady: this.props.onReady,
        onPaymentMethodReceived: this.props.onPaymentMethodReceived,
        paypal: {
          singleUse: true,
          headless: true,
          ...this.props.braintreeParams.paypal(),
        },
      });
    });
  }

  componentWillMount() {
    this.getAuthFlow();
  }

  componentWillReceiveProps(props) {
    console.log('WillMountPaypalBraintree componentWillReceiveProps');
    if (this.props.price !== props.price) {
      this.getAuthFlow();
    }
  }

  render() {
    return null;
  }
}

const getNonceForCreditCard = (cardParams: Object, clientToken: string) =>
  new Promise((resolve, reject) => {
    const braintree = require('braintree-web');
    const client = new braintree.api.Client({ clientToken });
    client.tokenizeCard(
      {
        options: { validate: true },
        ...cardParams,
      },
      (err, nonce) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(nonce);
      },
    );
  });

export type braintreeParamsCCT = { type: 'creditCard', creditCard: Function };
class WillMountCreditCardBraintree extends React.Component<*, *> {
  props: {
    onReady: Function,
    onPaymentMethodReceived: Function,
    braintreeParams: braintreeParamsCCT,
    clientToken: string,
  };
  componentDidMount() {
    this.props.onReady({
      creditCard: {
        initAuthFlow: () => {
          const params = this.props.braintreeParams.creditCard();
          getNonceForCreditCard(params, this.props.clientToken).then(nonce => {
            this.props.onPaymentMethodReceived({ nonce });
          });
        },
      },
    });
  }

  render() {
    return null;
  }
}

type WillMountBraintreeT = {
  invalidate: Function,
  onReady: Function,
  price: number,
  onPaymentMethodReceived: Function,
  clientToken: string,
  braintreeParams: braintreeParamsCCT | braintreeParamsPaypalT,
};
export default class WillMountBraintree extends React.Component<*, *> {
  props: WillMountBraintreeT;
  render() {
    console.log(this.props.braintreeParams);
    const {
      braintreeParams,
      clientToken,
      onPaymentMethodReceived,
      onReady,
      invalidate,
      price,
    } = this.props;
    let willMountElem;
    const shared = {
      clientToken,
      onPaymentMethodReceived,
      onReady,
    };
    if (braintreeParams.type === 'creditCard') {
      willMountElem = (
        <WillMountCreditCardBraintree
          {...shared}
          braintreeParams={braintreeParams}
        />
      );
    }

    if (braintreeParams.type === 'paypal') {
      willMountElem = (
        <WillMountPaypalBraintree
          {...shared}
          invalidate={invalidate}
          price={price}
          braintreeParams={braintreeParams}
        />
      );
    }

    return <div style={{ display: 'none' }}>{willMountElem}</div>;
  }
}
