// @flow
import { Messages, Order, Chef, _User } from '../../parseApi/api';

export const getMessages = async ({
  orderId,
  chefId,
  userId,
}: {
  orderId: string,
  chefId: string,
  userId: string,
}) => {
  const [lastMessage] = await Messages.Get({
    equalTo: [
      Messages.Field.order(Order.Pointer(orderId)),
      Messages.Field.user(_User.Pointer(userId)),
      Messages.Field.chef(Chef.Pointer(chefId)),
    ],
    descending: ['createdAt'],
    limit: 1,
  });

  if (lastMessage && lastMessage.objectId && !lastMessage.msgSeen) {
    await Messages.Set({
      objectId: lastMessage.objectId,
      msgSeen: true,
    });
  }

  let messages = await Messages.Get({
    include: ['user', 'user.objectIdUser'],
    equalTo: [Messages.Field.order(Order.Pointer(orderId))],
    ascending: ['createdAt'],
  });

  messages = messages.map(msg => {
    let { user, createdAt, textMessage } = msg;

    if (!user || user.__type === 'Pointer') {
      const chef = Chef.EnsureInstance(msg.chef);
      const objectIdUser = _User.EnsureInstance(chef.objectIdUser);
      user = objectIdUser;
    }

    return {
      text: textMessage,
      user: {
        objectId: user.objectId,
        name: user.firstName,
        avatar: user.avatar && user.avatar.url,
      },
      date: createdAt,
    };
  });

  // what this do? move to function
  // if (order.userMsg) {
  //   let user = order.objectIdUser;
  //   messages.unshift({
  //     text: order.userMsg,
  //     user: {
  //       objectId: user.objectId,
  //       name: user.firstName,
  //       avatar: user.avatar && user.avatar.url,
  //     },
  //     date: order.createdAt,
  //   })
  // }

  return messages;
};

export const createMessage = async ({
  orderId,
  chefId,
  userId,
  text,
}: {
  orderId: string,
  chefId: string,
  userId: string,
  text: string,
}) => {
  const objectId = await Messages.Create({
    order: Order.Pointer(orderId),
    textMessage: text,
    chef: chefId ? Chef.Pointer(chefId) : undefined,
    user: !chefId ? _User.Pointer(userId) : undefined,
  });
  return await Messages.GetById(objectId);
};
