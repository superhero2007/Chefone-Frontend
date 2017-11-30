// @flow

import React from 'react';
import R from 'ramda';
import { sendRemindersByEvents } from '../../../../../src/server/api/reviews';
import { canSendReviewStatuses } from '../../../../../src/server/api/admin';
import type { AdminEventInfo } from '../../../../../src/server/api/admin';
import Table from '../../Table';
import { SuccessFailIcon } from '../../Shared';
import Button from '../../../UIKit/Button';
import withSimpleState from '../../../../utils/withSimpleState';
import type { Changeble } from '../../../../utils/withSimpleState';
// const delay = sec => new Promise(resolve => {
//   setTimeout(() => resolve(), sec);
// });

const SendReviewButton = R.compose(
  withSimpleState('progress', () => 'init'),
  withSimpleState(
    'canSendReviewStatusChangeble',
    ({ canSendReviewStatus }) => canSendReviewStatus,
  ),
)(
  ({
    progress,
    canSendReviewStatusChangeble,
    objectId,
  }: {
    progress: Changeble<string>,
    canSendReviewStatusChangeble: Changeble<string>,
    objectId: number,
  }) => {
    const loadingSpinner =
      progress.value === 'loading' ? (
        <i className="fa fa-spinner fa-spin" />
      ) : null;

    if (canSendReviewStatusChangeble.value === canSendReviewStatuses.invalid) {
      return <div>N/A</div>;
    }

    return (
      <div>
        {canSendReviewStatusChangeble.value ===
          canSendReviewStatuses.notSended && (
          <div>
            <Button
              onClick={async event => {
                event.stopPropagation();
                progress.onChange('loading');

                try {
                  //$FlowIssue
                  const response = await sendRemindersByEvents({
                    eventsIds: [objectId],
                  });

                  canSendReviewStatusChangeble.onChange(
                    canSendReviewStatuses.sended,
                  );
                  console.log('jsonRes', response);
                } catch (err) {
                  console.error(err);
                  progress.onChange('error');
                }
              }}
              text="Send mails"
              size="sm"
              disabled={progress.value === 'loading'}
            />
            {loadingSpinner}
          </div>
        )}
        {canSendReviewStatusChangeble.value ===
          canSendReviewStatuses.sended && <SuccessFailIcon value={true} />}
      </div>
    );
  },
);

export default ({
  values,
  onSelectEvent,
}: {
  values: Array<AdminEventInfo>,
  onSelectEvent: Function,
}) => {
  const finalVals = R.map(item => {
    const currencySymbol = item.currencySymbol;
    const nettoPrice = item.nettoPrice + currencySymbol;
    const nettoTotal = item.nettoTotal + currencySymbol;
    const bruttoPrice = item.bruttoPrice + currencySymbol;
    const bruttoTotal = item.bruttoTotal + currencySymbol;
    const discountTotal = item.discountTotal + currencySymbol;
    return {
      ...item,
      nettoPrice,
      bruttoPrice,
      bruttoTotal,
      nettoTotal,
      discountTotal,
    };
  })(values);

  return (
    <Table
      columns={[
        {
          dataField: 'objectId',
          name: 'Event ID',
        },
        {
          dataField: 'date',
          name: 'Date',
        },
        {
          dataField: 'chefName',
          name: 'DEIN CHEF',
        },
        {
          dataField: 'title',
          name: 'DINNER',
        },
        {
          dataField: 'servingsVsSold',
          name: 'Gäste',
        },
        {
          dataField: 'nettoPrice',
          name: 'Einzelpreis Netto',
        },
        {
          dataField: 'bruttoPrice',
          name: 'Einzelpreis Brutto',
        },
        {
          dataField: 'serviceFeeTotal',
          name: 'Service Fee Total',
        },
        {
          dataField: 'discountTotal',
          name: 'Discount Total',
        },
        {
          dataField: 'nettoTotal',
          name: 'Totalpreis Netto',
        },
        {
          dataField: 'bruttoTotal',
          name: 'Totalpreis Brutto',
        },
        {
          dataField: 'canSendReviewStatus',
          name: 'Reviews',
          formatter: (canSendReviewStatus, row) => {
            return (
              <div>
                {/*$FlowIssue*/}
                <SendReviewButton
                  objectId={row.objectId}
                  canSendReviewStatus={canSendReviewStatus}
                />
              </div>
            );
          },
        },
      ]}
      array={finalVals}
      onRowClick={({ objectId }) => onSelectEvent(objectId)}
    />
  );
};
