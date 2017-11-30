// @flow

import React from 'react';
import R from 'ramda';
import styles from './index.module.less';
import SvgIcon from '../../../SvgIcon';
import withSimpleState from '../../../../utils/withSimpleState';
import type { Changeble } from '../../../../utils/withSimpleState';
import { Modal, MessageIcon } from '../../Shared';
import { fixedCSSModules } from '../../../../utils';
import type { EventPanel } from '../../../../server/api/admin';

type ModalData = {
  locationDetails: string,
};

export default R.compose(
  withSimpleState('modalData', () => null),
  fixedCSSModules(styles),
)(
  ({
    eventId,
    timeStart,
    dateStart,
    locationAddress,
    locationDetails,
    eventTitle,
    nettoTotal,
    bruttoTotal,
    serviceFeeTotal,
    serviceFeeTotalPercent,
    servings,
    servingsSold,
    modalData,
  }: EventPanel & { modalData: Changeble<ModalData> }) => {
    return (
      <div>
        {modalData.value && (
          <div onClick={() => modalData.onChange(null)}>
            <Modal
              onClose={() => modalData.onChange(null)}
              header="Location Details"
              body={<div styleName="modal-body">{locationDetails}</div>}
            />
          </div>
        )}
        <div styleName="container">
          <div>
            <span styleName="Chef-One-Event">Chef One Event</span>
            <span styleName="event-id">({eventId})</span>
          </div>
          <div styleName="dates">
            <div styleName="icon_wrapper">
              <SvgIcon
                styleName="icon_calendar"
                finalIcon={require('../../../../../static/icons/calendar.svg')}
              />
            </div>
            <div styleName="content_wrapper">
              <div>{dateStart}</div>
              <div>
                <small>{timeStart}</small>
              </div>
            </div>
          </div>
          <div styleName="right-col">
            <div styleName="icon_wrapper">
              <SvgIcon
                styleName="icon_location"
                finalIcon={require('../../../../../static/icons/gast-01.svg')}
              />
              {locationDetails && (
                <div>
                  <MessageIcon
                    onClick={() => modalData.onChange({ locationDetails })}
                  />
                </div>
              )}
            </div>
            <div styleName="location_wrapper">
              <div>{locationAddress}</div>
            </div>
          </div>
          <hr />
          <div styleName="title-and-servings">
            <div styleName="icon_wrapper">
              <SvgIcon
                styleName="icon_book"
                finalIcon={require('../../../../../static/icons/icon_book_gray.svg')}
              />
            </div>
            <div styleName="content_wrapper">
              <span>{eventTitle}</span>
            </div>
            <div styleName="right-col">
              <div>
                Servings: {servingsSold}/{servings}
              </div>
            </div>
          </div>
          <hr />
          <div>
            <span styleName="left-col">Einzelpreis Netto</span>
            <span>{nettoTotal}</span>
          </div>
          <div>
            <span styleName="left-col">Einzelpreis Brutto</span>
            <span>{bruttoTotal}</span>
          </div>
          <div>
            <span styleName="left-col">Service Fee %</span>
            <span>{serviceFeeTotalPercent}</span>
          </div>
          <div>
            <span styleName="left-col">Service Fee $</span>
            <span>{serviceFeeTotal}</span>
          </div>
        </div>
      </div>
    );
  },
);
