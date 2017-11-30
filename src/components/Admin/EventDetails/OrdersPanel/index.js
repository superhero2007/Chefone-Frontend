// @flow

import React from 'react';
import R from 'ramda';
import Table from '../../Table';
import { Modal, MessageIcon, SuccessFailIcon } from '../../Shared';
import withSimpleState from '../../../../utils/withSimpleState';
import type { Changeble } from '../../../../utils/withSimpleState';
import { STATUSES } from '../../../../server/api/admin';
import SvgIcon from '../../../SvgIcon';
import type { AdminEventOrder } from '../../../../server/api/admin';

const Status = ({ val }: { val: $Keys<typeof STATUSES> }) => {
  return (
    <div>
      {val === STATUSES.NOT_AVAILABLE ? (
        'N/A'
      ) : (
        <SuccessFailIcon value={val === STATUSES.SUCCESS} />
      )}
    </div>
  );
};

const Message = ({
  row,
  modalData,
}: {
  row: Object,
  modalData: Changeble<ModalData>,
}) => (
  <div>
    {row.phone === null ? (
      'N/A'
    ) : (
      <MessageIcon onClick={() => modalData.onChange(row)} />
    )}
  </div>
);

type ModalData = {
  msg: string,
  name: string,
  phone: string,
  email: string,
};

export default R.compose(withSimpleState('modalData', () => null))(
  ({
    array,
    modalData,
  }: {
    array: Array<AdminEventOrder>,
    modalData: Changeble<ModalData>,
  }) => {
    return (
      <div>
        {modalData.value && (
          <div onClick={() => modalData.onChange(null)}>
            <Modal
              onClose={() => modalData.onChange(null)}
              header={
                <div>
                  <div styleName="chef-name">{modalData.value.name}</div>
                  <div styleName="phone">
                    <SvgIcon
                      styleName="phone_call"
                      finalIcon={require('../../../../../static/icons/phone_call_gray.svg')}
                    />
                    {modalData.value.phone}
                  </div>
                  <div styleName="email">
                    <SvgIcon
                      styleName="email_icon"
                      finalIcon={require('../../../../../static/icons/message_gray.svg')}
                    />
                    {modalData.value.email}
                  </div>
                </div>
              }
              body={<div styleName="modal-body">{modalData.value.msg}</div>}
            />
          </div>
        )}
        <Table
          columns={[
            {
              dataField: 'objectId',
              name: 'ID',
            },
            {
              dataField: 'date',
              name: 'Date',
            },
            {
              dataField: 'transactionStatus',
              name: 'Transaction Status',
              formatter: cell => {
                return <Status val={cell} />;
              },
            },
            {
              dataField: 'customer',
              name: 'Customer',
            },
            {
              dataField: 'customerMessage',
              name: 'Customer Message',
              formatter: (cell, row: AdminEventOrder) => (
                <Message
                  row={{
                    name: row.customer,
                    msg: row.customerMessage,
                    phone: row.phone,
                    email: row.email,
                  }}
                  modalData={modalData}
                />
              ),
            },
            {
              dataField: 'quantity',
              name: 'Qty',
            },
            {
              dataField: 'foodPrice',
              name: 'Food Price',
            },
            {
              dataField: 'serviceFee',
              name: 'Service Fee',
            },
            {
              dataField: 'total',
              name: 'Total',
            },
            {
              dataField: 'status',
              name: 'Status',
              formatter: cell => <Status val={cell} />,
            },
            {
              dataField: 'systemMessage',
              name: 'System Message',
              formatter: (cell, row: AdminEventOrder) => (
                <Message
                  row={{
                    name: 'SYSTEM',
                    msg: row.systemMessage,
                  }}
                  modalData={modalData}
                />
              ),
            },
            {
              dataField: 'refunded',
              name: 'Refunded',
              formatter: cell => <Status val={cell} />,
            },
          ]}
          array={array}
        />
      </div>
    );
  },
);
