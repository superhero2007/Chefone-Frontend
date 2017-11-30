// @flow

import { FollowersList, _User, Chef } from '../../parseApi/api';

// export const getFollowedChefs = async (userId): Promise<number> => {};

// export const getFollowingUsers = async (chefId): Promise<number> => {};

type UserChefPair = { userId: string, chefId: string };

export const isFollowed = async ({
  userId,
  chefId,
}: UserChefPair): Promise<boolean> => {
  const count = await FollowersList.Count({
    equalTo: [
      FollowersList.Field.objectIdUser(_User.Pointer(userId)),
      FollowersList.Field.objectIdChef(Chef.Pointer(chefId)),
    ],
  });

  return count !== 0;
};

export const followChef = async ({
  userId,
  chefId,
}: UserChefPair): Promise<boolean> => {
  const followed = await isFollowed({ userId, chefId });
  if (followed) {
    console.log('already followed');
    return true;
  }
  await FollowersList.Create({
    objectIdUser: _User.Pointer(userId),
    objectIdChef: Chef.Pointer(chefId),
  });
  return true;
};

export const unfollowChef = async ({
  userId,
  chefId,
}: UserChefPair): Promise<boolean> => {
  const followed = await isFollowed({ userId, chefId });
  if (!followed) {
    console.log('aleady unfollowed');
    return true;
  }

  const recordsToDelete = await FollowersList.Get({
    equalTo: [
      FollowersList.Field.objectIdUser(_User.Pointer(userId)),
      FollowersList.Field.objectIdChef(Chef.Pointer(chefId)),
    ],
  });

  await Promise.all(
    recordsToDelete.map(({ objectId }) => FollowersList.Delete(objectId)),
  );
  return true;
};
