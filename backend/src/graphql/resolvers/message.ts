import { GraphQLError } from 'graphql';
import { GraphQLContext, messagePopulated } from './../../utils/types';
import { SendMessageArguments } from '../../utils/types';

const resolvers = {
  Mutation: {
    sendMessage: async (
      _: any,
      args: SendMessageArguments,
      context: GraphQLContext
    ): Promise<boolean> => {
      const { conversationId, body, senderId } = args;
      const { pubsub, prisma, session } = context;

      if (!session?.user) {
        throw new GraphQLError('Not authorized');
      }

      const { id: userId } = session.user;

      if (userId !== senderId) {
        throw new GraphQLError('Not authorized');
      }

      try {
        const newMessage = await prisma.message.create({
          data: {
            conversationId,
            senderId,
            body,
          },
          include: messagePopulated,
        });

        const conversation = await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            latestMessageId: newMessage.id,
            participants: {
              update: {
                where: {
                  id: senderId,
                },
                data: {
                  hasSeenLatestMessage: true,
                  unSeenMessageCount: 0,
                },
              },
              updateMany: {
                where: {
                  NOT: {
                    userId: senderId,
                  },
                },
                data: {
                  hasSeenLatestMessage: false,
                  unSeenMessageCount: { increment: 1 },
                },
              },
            },
          },
        });

        pubsub.publish('MESSAGE_SENT', {
          messageSent: newMessage,
        });
        // pubsub.publish('CONVERSATION_UPDATED', {
        //   conversationUpdated: conversation,
        // });
      } catch (error: any) {
        console.log('sendMessage error', error);
        throw new GraphQLError(error.message);
      }
      return true;
    },
  },
  Subscription: {},
};

export default resolvers;
