import React from 'react';
import WillMountBraintree from './WillMountBraintree';
import type {
  braintreeParamsCCT,
  braintreeParamsPaypalT,
} from './WillMountBraintree';

type TNonceInfo = {
  details?: Object,
  nonce: string,
  type?: string,
};

export default class Test2 extends React.Component<*, *> {
  state: {
    price: number,
    funcToCall?: Function,
    paypal: {
      initiate?: boolean,
      params?: braintreeParamsPaypalT,
    },
    creditCard: {
      initiate?: boolean,
      params?: braintreeParamsCCT,
    },
    nonceInfo?: TNonceInfo,
    mode?: string,
    pendingParams: {
      paypal?: braintreeParamsPaypalT,
      creditCard?: braintreeParamsCCT,
    },
  };
  constructor() {
    super();
    this.state = {
      price: 20,
      paypal: {
        initiate: false,
      },
      creditCard: {
        initiate: false,
      },
      pendingParams: {
        paypal: {
          type: 'paypal',
          amount: 10.0,
          currency: 'USD',
        },
        creditCard: {
          type: 'cc',
          number: '4111111111111111',
          cardholderName: 'John Smith',
          expirationDate: '10/20',
          expirationMonth: '10',
          expirationYear: '2015',
          cvv: '832',
          billingAddress: {
            postalCode: '94107',
          },
        },
      },
    };
  }

  render() {
    return (
      <div>
        {['paypal', 'creditCard'].map(method => {
          const otherMethod = method === 'paypal' ? 'creditCard' : 'paypal';

          return (
            <div>
              <button
                onClick={() =>
                  this.setState({
                    [otherMethod]: {
                      initiate: false,
                    },
                    [method]: {
                      ...this.state[method],
                      initiate: true,
                      params: this.state.pendingParams[method],
                    },
                  })
                }
              >
                initiate {method}
              </button>
              {this.state[method].initiate ? (
                <WillMountBraintree
                  invalidate={() => {}}
                  clientToken="32323"
                  price={this.state.price}
                  braintreeParams={{
                    [method]: this.state[method].params,
                  }}
                  onReady={checkout => {
                    this.setState({
                      [method]: {
                        ...this.state[method],
                        funcToCall: checkout[method].initAuthFlow,
                      },
                      mode: method,
                    });
                  }}
                  onPaymentMethodReceived={(nonceInfo: TNonceInfo) =>
                    this.setState({ nonceInfo })
                  }
                />
              ) : null}
            </div>
          );
        })}
        <button
          disabled={
            !this.state.mode ||
            !this.state[this.state.mode] ||
            !this.state[this.state.mode].funcToCall
          }
          onClick={event => {
            if (event.preventDefault) {
              event.preventDefault();
            } else {
              event.returnValue = false;
            }

            if (!this.state.mode || !this.state[this.state.mode]) {
              return;
            }

            this.state[this.state.mode].funcToCall();
          }}
        >
          Continue
        </button>
        <br />
        {!this.state.paypal.funcToCall ? 'paypal disabled' : 'paypal ready'}
        <br />
        {!this.state.creditCard.funcToCall
          ? 'creditCard disabled'
          : 'creditCard ready'}
        <br />
        {this.state.nonceInfo ? `nonce is ${this.state.nonceInfo.nonce}` : ''}
        <br />
        {this.state.mode}
      </div>
    );
  }
}
