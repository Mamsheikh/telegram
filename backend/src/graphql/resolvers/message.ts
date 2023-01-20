import { withFilter } from 'graphql-subscriptions';
import { GraphQLError } from 'graphql';
import {
  GraphQLContext,
  MessagePopulated,
  MessageSentSubscriptionPayload,
  messagePopulated,
} from './../../utils/types';
import { SendMessageArguments } from '../../utils/types';
import { conversationPopulated } from './conversation';
import { userIsConversationParticipant } from '../../utils/functions';

const resolvers = {
  Query: {
    messages: async (
      _: any,
      args: { conversationId: string },
      context: GraphQLContext
    ): Promise<MessagePopulated[]> => {
      const { prisma, session } = context;
      const { conversationId } = args;
      if (!session?.user) {
        throw new GraphQLError('Not authorized');
      }

      const { id: userId } = session.user;
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: conversationPopulated,
      });

      if (!conversation) {
        throw new GraphQLError('conversation not found');
      }

      const allowedToView = userIsConversationParticipant(
        conversation.participants,
        userId
      );

      if (!allowedToView) {
        throw new GraphQLError('not authorized');
      }

      try {
        const messages = await prisma.message.findMany({
          where: {
            conversationId,
          },
          include: messagePopulated,
          orderBy: {
            createdAt: 'asc',
          },
        });

        return messages;
      } catch (error: any) {
        console.log('messages query error', error);
        throw new GraphQLError(error.message);
      }
    },
  },
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
      console.log('senderId', senderId);

      try {
        const newMessage = await prisma.message.create({
          data: {
            conversationId,
            senderId,
            body,
          },
          include: messagePopulated,
        });
        const participant = await prisma.convesationParticipant.findFirst({
          where: {
            userId,
            conversationId,
          },
        });

        if (!participant) {
          throw new GraphQLError('No participant foudn');
        }
        const conversation = await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            latestMessageId: newMessage.id,
            participants: {
              update: {
                where: {
                  id: participant.id,
                },
                data: {
                  hasSeenLatestMessage: true,
                  unSeenMessageCount: 0,
                },
              },
              updateMany: {
                where: {
                  NOT: {
                    userId,
                  },
                },
                data: {
                  hasSeenLatestMessage: false,
                  unSeenMessageCount: { increment: 1 },
                },
              },
            },
          },
          include: conversationPopulated,
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
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        (_: any, __: any, context: GraphQLContext) => {
          const { pubsub } = context;

          return pubsub.asyncIterator(['MESSAGE_SENT']);
        },
        (
          payload: MessageSentSubscriptionPayload,
          args: { conversationId: string },
          context: GraphQLContext
        ) => {
          return payload.messageSent.conversationId === args.conversationId;
        }
      ),
    },
  },
};

export default resolvers;
