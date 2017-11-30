// @flow

import { Chef, _User } from '../../parseApi/api';
export const getChefByUser = async ({ userId }: { userId: string }) => {
  const users = await Chef.Get({
    equalTo: [Chef.Field.objectIdUser(_User.Pointer(userId))],
    limit: 1,
  });

  if (!users.length) {
    return null;
  }

  return users[0].objectId;
};

export const createOrRetrieveChef = async ({ userId }: { userId: string }) => {
  let chefId = await getChefByUser({ userId });
  if (!chefId) {
    console.log(`user ${userId} is not chef - creating chef for it`);
    chefId = await createChef({ userId });
  } else {
    console.log(`found chef for user ${userId}`);
  }

  return chefId;
};

export const createChef = async ({ userId }: { userId: string }) => {
  const user = await _User.GetById(userId);
  console.log('user', user);
  const { firstName } = user;

  const res = await Chef.Create({
    objectIdUser: _User.Pointer(userId),
    name: firstName,
  });

  return res;
};
