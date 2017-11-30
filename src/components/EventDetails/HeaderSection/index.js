// @flow

export * as fixtures from './fixtures';
import React from 'react';
import DropdownPlus from '../../UIKit/Dropdown/DropdownPlus';
import Button from '../../UIKit/Button';
import R from 'ramda';
import TopImages from './TopImages';
import SpeechBubble from '../../SpeechBubble';
import WaitingList from '../WaitingList';
import PrivateDinners from '../PrivateDinners';
import ButtonWithPrice from '../ButtonWithPrice';
import { Row, Col } from 'react-flexbox-grid';
import Modal from '../../Modal';
import withSimpleState from '../../../utils/withSimpleState';
import type { Changeble } from '../../../utils/withSimpleState';
import { IsMobileDecorator } from '../../../decorators';

import { fixedCSSModules, listFromNumber } from '../../../utils';

import calendarSvg from '../../../../static/icons/discover/calendar.svg';
import timeSvg from '../../../../static/icons/discover/time.svg';
import houseSvg from '../../../../static/icons/discover/house.svg';
import peopleSvg from '../../../../static/icons/discover/people.svg';

import styles from './index.module.less';

const REQUEST_PRIVATE_DINNER_TEXT = 'Privates Dinner anfragen?';
const GUEST = 'Gast';
const GUESTS = 'Gäste';
const InfoItem = R.compose(
  withSimpleState('showDetails', () => false),
  fixedCSSModules(styles),
)(
  ({
    iconUrl,
    text,
    details,
    id,
    showDetails,
    height,
  }: {
    iconUrl: string,
    text: string,
    details: { title: string, text: string },
    id: string,
    showDetails: Changeble<boolean>,
    height: number,
  }) => {
    // showDetails = { ...showDetails, value:true}
    return (
      <div styleName="info-item">
        <div
          styleName="info-icon"
          style={{ backgroundImage: `url(${iconUrl})` }}
        />
        <div styleName="info-text">{text}</div>
        {details && (
          <div
            styleName="question"
            onMouseOver={() => showDetails.onChange(true)}
            onMouseOut={() => showDetails.onChange(false)}
            onTouchStart={() => showDetails.onChange(true)}
            onTouchEnd={() => showDetails.onChange(false)}
            id={id}
          />
        )}
        {details && (
          <SpeechBubble
            for={id}
            height={height}
            show={showDetails.value}
            title={details.title}
            text={details.text}
          />
        )}
      </div>
    );
  },
);
const HOUSE_HELP_TIP_TITLE = 'Open Table';
const HOUSE_HELP_TIP_TEXT =
  'Jede volljährige Person darf sich einen Platz am Esstisch buchen.';
const PEOPLE_HELP_TIP_TITLE = 'Teilnehmer';
const PEOPLE_HELP_TIP_TEXT =
  'So viele Leute der maximalen Anzahl der Gäste haben sich bereits ihren Platz gesichert. Du kannst dich alleine oder zusammen mit deinen Freunden einbuchen, bis die maximale Anzahl erreicht ist.';
const WAITING_LIST_TIP_TEXT =
  'Dies ist Anzahl der eingebuchten Gäste und die maximale Kapazität. Buche alleine oder zusammen mit deinen Freunden. Ist die maximale Kapazität erreicht, kannst du dich auf die Warteliste setzen.';
const BOOK_TEXT = 'Jetzt buchen';
const GO_TO_NEW_EVENT = 'Ausgebucht? Zum neuen Termin!';
const BOOK_TEXT_WAITING_LIST = 'Kostenlos auf die Warteliste';
const BOOK_TEXT_UNFOLLOW = 'Entfolgen';
const InfoTable = fixedCSSModules(styles, {
  allowMultiple: true,
})(
  ({
    date,
    time,
    servingsSold,
    servings,
    visible,
  }: {
    date: string,
    time: string,
    servingsSold: number,
    servings: number,
    visible: boolean,
  }) => {
    const soldOut = servingsSold >= servings;
    return (
      <Row between="xs">
        <Col md={3} xs={6}>
          {/*$FlowIssue*/}
          <InfoItem
            id={visible ? 'header-date' : undefined}
            iconUrl={calendarSvg}
            text={date}
          />
        </Col>
        <Col md={3} xs={6}>
          {/*$FlowIssue*/}
          <InfoItem
            id={visible ? 'header-time' : undefined}
            iconUrl={timeSvg}
            text={time}
          />
        </Col>
        <Col md={3} xs={6}>
          {/*$FlowIssue*/}
          <InfoItem
            id={visible ? 'header-open-table' : undefined}
            iconUrl={houseSvg}
            text="Open Table"
            details={{
              title: HOUSE_HELP_TIP_TITLE,
              text: HOUSE_HELP_TIP_TEXT,
            }}
          />
        </Col>
        <Col md={3} xs={6}>
          {/*$FlowIssue*/}
          <InfoItem
            id={visible ? 'header-attendees-amount' : undefined}
            iconUrl={peopleSvg}
            text={`${servingsSold} von ${servings}`}
            height={200}
            details={{
              title: soldOut ? '' : PEOPLE_HELP_TIP_TITLE,
              text: soldOut ? WAITING_LIST_TIP_TEXT : PEOPLE_HELP_TIP_TEXT,
            }}
          />
        </Col>
      </Row>
    );
  },
);
export type PurePropsT = {
  goToNewEvent?: Function,
  onUnfollow: Function,
  doesFollowChef: boolean,
  isMobile: boolean,
  visible: boolean,
  passed: boolean,
  date: string,
  time: string,
  currency: string,
  servingsSold: number,
  servings: number,
  maxAmount: number,
  amount: number,
  price: number,
  onBookNowClick: Function,
  handleAmountChange: Function,
  onOpenWaitingListClick: Function,
  onRequestPrivateDinnerClick: Function,
};
const amountToObj = item => ({
  text: item == 1 ? `${item} ${GUEST}` : `${item} ${GUESTS}`,
  amount: item,
});
const PureHeader = fixedCSSModules(styles, {
  allowMultiple: true,
})(
  ({
    onUnfollow,
    doesFollowChef,
    isMobile,
    visible,
    date,
    time,
    servingsSold,
    servings,
    amount,
    onBookNowClick,
    passed,
    maxAmount,
    handleAmountChange,
    price,
    currency,
    onOpenWaitingListClick,
    onRequestPrivateDinnerClick,
    goToNewEvent,
  }: PurePropsT) => {
    const soldOut = servingsSold >= servings;
    const canBuy = !soldOut && !passed;
    const soldOutHasNewEvent = passed || (soldOut && goToNewEvent);
    const inWaitingList = passed || (soldOut && !goToNewEvent);
    const showPrice = !inWaitingList && !soldOutHasNewEvent;
    let text = BOOK_TEXT;
    let onClickFunction = onBookNowClick;
    if (soldOutHasNewEvent && goToNewEvent) {
      text = GO_TO_NEW_EVENT;
      onClickFunction = goToNewEvent;
    } else if (inWaitingList) {
      text = doesFollowChef ? BOOK_TEXT_UNFOLLOW : BOOK_TEXT_WAITING_LIST;
      onClickFunction = doesFollowChef ? onUnfollow : onOpenWaitingListClick;
    }

    return (
      <div styleName="container">
        <Row styleName="header-info" center="xs">
          {!isMobile && (
            <Col lg={6} sm={10} xs={10}>
              <InfoTable
                date={date}
                time={time}
                servingsSold={servingsSold}
                servings={servings}
                visible={visible}
              />
            </Col>
          )}
          <Col lg={4} sm={10} xs={10}>
            <Row between="xs">
              {canBuy && (
                <Col xs={12} sm={12} md={6} styleName="dropdown-container">
                  {/*$FlowIssue*/}
                  <DropdownPlus
                    tabIndex={0}
                    options={listFromNumber(maxAmount)
                      .map(item => item + 1)
                      .map(amountToObj)}
                    printWith={({ text }) => text}
                    selected={{
                      value: amountToObj(amount),
                      onChange: handleAmountChange,
                    }}
                  />
                </Col>
              )}
              <Col
                xs={12}
                sm={12}
                md={canBuy ? 6 : 12}
                styleName="price-container"
              >
                {!soldOutHasNewEvent ? (
                  <ButtonWithPrice
                    onClick={onClickFunction}
                    text={text}
                    priceText={showPrice ? `${price * amount}${currency}` : ''}
                  />
                ) : (
                  <Button
                    width="100%"
                    onClick={onClickFunction}
                    text={text}
                    mode="turquoise"
                  />
                )}
                <div
                  styleName="request-private-dinner-text"
                  onClick={onRequestPrivateDinnerClick}
                >
                  <a>{REQUEST_PRIVATE_DINNER_TEXT}</a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  },
);
export type PropsT = {
  goToNewEvent?: Function,
  onUnfollow: Function,
  goToWaitingList: Function,
  goRequestPrivateDinner: Function,
  onRequestPrivateDinnerSubmit: Function,
  goToEvent: Function,
  doesFollowChef: boolean,
  showWaitingList: boolean,
  showPrivateDinnerRequest: boolean,
  futureEvents: Array<any>,
  futureEventsLoading: boolean,
  onAmountChanged: Function,
  onBookNowClick: Function,
  images: Array<string>,
  eventId: string,
  title: string,
  foodDescription: string,
  time: string,
  date: string,
  amount: number,
  passed: boolean,
  maxAmount: number,
  price: number,
  currency: string,
  servings: number,
  servingsSold: number,
};
export default R.compose(
  IsMobileDecorator(),
  fixedCSSModules(styles, {
    allowMultiple: true,
  }),
)(
  class extends React.Component<*, *> {
    props: PropsT & {
      isMobile: boolean,
    };
    state: {
      sticky: boolean,
    };
    titleElement: any;
    infoTable: any;
    stickyHeader: {
      clientHeight: number,
    };
    state = {
      sticky: false,
    };
    componentDidMount() {
      const titleElemBottom = this.titleElement.getBoundingClientRect().bottom;
      const newStickyVal = titleElemBottom < 0;
      if (newStickyVal) {
        this.setState({
          sticky: true,
        });
      }
      window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = () => {
      const { isMobile } = this.props;
      const { sticky } = this.state;
      const triggerElem = isMobile ? this.infoTable : this.titleElement;
      let triggerElemBottom = triggerElem.getBoundingClientRect().bottom;
      let newStickyVal = triggerElemBottom < 0;
      if (newStickyVal !== sticky) {
        this.setState({
          sticky: newStickyVal,
        });
      }
    };
    handleAmountChange = item => {
      const { eventId } = this.props;
      this.props.onAmountChanged({
        amount: item.amount,
        eventId,
      });
    };
    render() {
      const props = this.props;
      const {
        onUnfollow,
        doesFollowChef,
        images,
        amount,
        maxAmount,
        servings,
        time,
        date,
        servingsSold,
        price,
        title,
        passed,
        currency,
        onBookNowClick,
        isMobile,
        futureEvents,
        futureEventsLoading,
        showWaitingList,
        showPrivateDinnerRequest,
        goToWaitingList,
        goRequestPrivateDinner,
        onRequestPrivateDinnerSubmit,
        goToEvent,
        goToNewEvent,
      } = props;
      const { sticky } = this.state;
      const pureHeaderProps = {
        goToNewEvent,
        onUnfollow,
        onOpenWaitingListClick: goToWaitingList,
        onRequestPrivateDinnerClick: goRequestPrivateDinner,
        doesFollowChef,
        isMobile,
        date,
        time,
        servingsSold,
        servings,
        amount,
        onBookNowClick,
        passed,
        maxAmount,
        price,
        currency,
        handleAmountChange: this.handleAmountChange,
      };
      return (
        <div styleName="header-container">
          {showWaitingList && (
            <Modal
              styleName="waiting-list-modal"
              onCloseClick={() => {
                goToEvent();
              }}
            >
              <WaitingList
                events={futureEvents}
                eventsLoading={futureEventsLoading}
              />
            </Modal>
          )}
          {showPrivateDinnerRequest && (
            <Modal
              styleName="waiting-list-modal"
              onCloseClick={() => {
                goToEvent();
              }}
            >
              {/*$FlowIssue*/}
              <PrivateDinners
                price={price}
                currency={currency}
                onSubmit={async args => {
                  await onRequestPrivateDinnerSubmit(args);
                  goToEvent();
                }}
              />
            </Modal>
          )}
          <TopImages images={images} />
          <h1
            styleName="event-name"
            itemProp="name"
            ref={item => {
              if (!isMobile) {
                this.titleElement = item;
              }
            }}
          >
            {title}
          </h1>
          <div
            ref={item => {
              this.infoTable = item;
            }}
          >
            {isMobile && (
              <div
                className="container"
                style={{
                  textAlign: 'center',
                }}
              >
                <InfoTable
                  date={date}
                  time={time}
                  servingsSold={servingsSold}
                  servings={servings}
                  visible={!sticky}
                />
              </div>
            )}
          </div>
          <div
            styleName="header-container-wrapper"
            style={{
              backgroundColor: sticky ? '#f3f3f3' : '',
            }}
          >
            <div />
            {sticky && (
              <div styleName="sticky-header-container-wrapper">
                <PureHeader visible={sticky} {...pureHeaderProps} />
              </div>
            )}
            <div
              style={{
                opacity: sticky ? 0 : 1,
              }}
            >
              <PureHeader visible={!sticky} {...pureHeaderProps} />
            </div>
          </div>
        </div>
      );
    }
  },
);
