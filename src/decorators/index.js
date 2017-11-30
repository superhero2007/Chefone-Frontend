// @flow

import React from 'react';

export const LoaderDecorator = ({
  condition,
  isOnlyLoader,
}: {
  condition: Function,
  isOnlyLoader?: boolean,
}) => (Component: Component$<*, *>) => (props: any) => {
  const Loader = () => (
    <div className="text-center">
      <div className="loader" />
    </div>
  );

  if (!condition(props)) {
    if (isOnlyLoader) {
      return <Loader />;
    }

    return (
      <div>
        <Component {...props} />
        <Loader />
      </div>
    );
  }
  return <Component {...props} />;
};

export const ShouldRenderForClientDecorator = (
  Component: React$ComponentType<*>,
) => {
  class ShouldRenderForClient extends React.Component<
    *,
    {
      renderForClient: boolean,
    },
  > {
    constructor() {
      super();
      this.state = {
        renderForClient: false,
      };
    }

    componentWillMount() {
      this.setState({
        renderForClient: true,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          renderForClient={
            __CLIENT__ && this.state && this.state.renderForClient
          }
        />
      );
    }
  }
  return ShouldRenderForClient;
};

export const IsMobileDecorator = () => (Component: React$ComponentType<*>) => {
  if (__SERVER__) {
    return Component;
  }

  const Responsive = require('react-responsive-decorator');

  return Responsive(
    class extends React.Component<
      {
        media: Function,
      },
      {
        isMobile: boolean,
      },
    > {
      constructor() {
        super();
        this.state = {
          isMobile: false,
        };
      }

      componentDidMount() {
        this.props.media({ minWidth: 500 }, () => {
          this.setState({
            isMobile: false,
          });
        });

        this.props.media({ maxWidth: 500 }, () => {
          this.setState({
            isMobile: true,
          });
        });
      }

      render() {
        return <Component {...this.props} isMobile={this.state.isMobile} />;
      }
    },
  );
};
