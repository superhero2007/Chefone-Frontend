// @flow

import React, { Component } from 'react';

const Icon = ({
  toggled,
  toggledClassName,
  untoggledClassName,
  onMouseEnter,
  onClickRating,
  color,
  viewOnly,
  style,
}: {
  key?: number,
  toggled: any,
  toggledClassName: any,
  untoggledClassName: any,
  onMouseEnter: any,
  onClickRating: any,
  color: any,
  viewOnly: any,
  style: any,
}) => (
  <i
    className={toggled ? toggledClassName : untoggledClassName}
    onMouseMove={onMouseEnter}
    style={{ ...(!viewOnly ? { cursor: 'pointer' } : {}), color, ...style }}
    onClick={onClickRating}
  />
);

type Props = {
  toggledClassName: string,
  untoggledClassName: string,
  halfClassName: string,
  color: string,
  defaultRating: number,
  viewOnly?: boolean,
  className?: string,
  iconStyle?: Object,
  onChange?: Function,
};

export default class Rating extends Component<*, *> {
  props: Props;
  state: {
    hovering: boolean | void,
    max: number,
    currentRating_hover: number,
    currentRating: number,
  };

  onClickRating: Function;

  constructor(props: Object, context: Object) {
    super(props, context);

    this.state = {
      currentRating: props.currentRating || 0,
      max: props.max || 5,
      currentRating_hover: 0,
      hovering: false,
    };

    this.onClickRating = this.onClickRating.bind(this);
  }

  onMouseEnter(currentRating: number, e: Object) {
    let rating = currentRating;
    if (
      e.clientX <
      e.target.getBoundingClientRect().left + e.target.offsetWidth / 2
    ) {
      rating -= 0.5;
    }

    this.setState({
      currentRating_hover: rating,
      // hovering: true
    });
  }

  onMouseLeave() {
    // this.setState({
    //   hovering: false
    // });
  }

  onClickRating() {
    this.setState({
      currentRating: this.state.currentRating_hover,
    });

    const onChange = this.props.onChange;

    if (onChange) {
      onChange(Math.ceil(this.state.currentRating_hover));
    }
  }

  render() {
    const {
      viewOnly,
      halfClassName,
      className,
      toggledClassName,
      untoggledClassName,
      color,
      defaultRating,
      iconStyle = { marginLeft: 1.5, marginRight: 1.5 },
    } = this.props;

    const ratings = [];

    const f = () => {};
    const onMouseEnter = viewOnly ? f : this.onMouseEnter;
    const onClickRating = viewOnly ? f : this.onClickRating;

    for (let i = 1; i <= this.state.max; ++i) {
      const rating = this.state.hovering
        ? this.state['currentRating' + (this.state.hovering ? '_hover' : '')]
        : defaultRating;
      const round = Math.round(rating);
      const floor = Math.floor(rating);

      const _halfClassName =
        halfClassName && round == i && floor != rating ? halfClassName : null;

      ratings.push(
        <Icon
          key={i}
          viewOnly={viewOnly}
          style={iconStyle}
          color={color}
          toggledClassName={_halfClassName || toggledClassName}
          untoggledClassName={untoggledClassName}
          onMouseEnter={onMouseEnter.bind(this)}
          onClickRating={onClickRating}
          toggled={i <= round}
        />,
      );
    }
    return (
      <div className={className} onMouseLeave={this.onMouseLeave.bind(this)}>
        {ratings}
      </div>
    );
  }
}

export const DefaultViewRating = ({ value }: { value: number }) => (
  <Rating
    toggledClassName="star toggled-star"
    untoggledClassName="star untoggled-star"
    halfClassName="star toggled-star"
    color="#CE5100"
    defaultRating={value}
    viewOnly
  />
);
