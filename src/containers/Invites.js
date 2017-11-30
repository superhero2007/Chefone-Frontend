// @flow

import React from 'react';
import Invites from '../components/Invites';
import { connect } from 'react-redux';
import type { ReduxState } from '../redux/type';
import { notifySuccess } from '../actions';
import { promiseDispatch } from '../utils';
import { sendJsonPostSimple } from '../server/api/helpers';

const sendInvited = async ({
  emails,
  invitingUserId,
}: {
  emails: Array<string>,
  invitingUserId: string,
}) => {
  const result = await sendJsonPostSimple({
    url: `/api-mail/sendInvite`,
    data: { emails, invitingUserId },
    noRemoveEmpty: true,
  });

  return await result.text();
};

const sendInvitations = (emails: Array<string>) =>
  promiseDispatch(
    'sendInvitations',
    async (dispatch: Function, getState: Function) => {
      const { session: { objectId } } = getState();
      await sendInvited({ emails, invitingUserId: objectId });
      await dispatch(notifySuccess('Deine Einladung wurde gesendet!'));
    },
  );

export default connect(
  (state: ReduxState) => ({
    objectId: state.session.objectId,
  }),
  (dispatch: Function) => ({
    onEmailsSubmit: async emails => {
      await dispatch(sendInvitations(emails));
    },
    onCopyLink: () => dispatch(notifySuccess('Copied!')),
  }),
)(props => (
  <Invites
    objectId={props.objectId}
    onCopyLink={props.onCopyLink}
    onEmailsSubmit={props.onEmailsSubmit}
  />
));
