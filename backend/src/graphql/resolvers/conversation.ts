import { GraphQLError } from 'graphql';
import {
  ConversationCreatedSubscriptionPayload,
  ConversationType,
  CreateConversationInput,
  GraphQLContext,
} from './../../utils/types';
import { Prisma } from '@prisma/client';
import { withFilter } from 'graphql-subscriptions';

const resolvers = {
  Query: {
    conversation: async (
      _: any,
      args: { conversationId: string },
      context: GraphQLContext
    ) => {
      const { conversationId } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError('Not authorized');
      }

      try {
        return await prisma.conversation.findUnique({
          where: { id: conversationId },
          include: conversationPopulated,
        });
      } catch (error: any) {
        console.log('failed to query conversation: error', error);
        throw new GraphQLError(error.message);
      }
    },
    conversations: async (_: any, __: any, context: GraphQLContext) => {
      const { session, prisma } = context;
      if (!session?.user) {
        throw new GraphQLError('Not authorized');
      }

      const {
        user: { id: userId },
      } = session;

      try {
        const conversations = await prisma.conversation.findMany({
          where: {
            participants: {
              some: {
                userId: {
                  equals: userId,
                },
              },
            },
          },
          include: conversationPopulated,
        });
        return conversations;
      } catch (error: any) {
        console.log('conversations error', error);
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createConversation: async (
      _: any,
      args: CreateConversationInput,
      context: GraphQLContext
    ): Promise<{ conversationId: string }> => {
      const { session, prisma, pubsub } = context;
      const {
        participantIds,
        conversationName,
        conversationImg,
        conversationType,
      } = args;

      if (!session?.user) {
        throw new GraphQLError('Not authorized');
      }

      try {
        const conversation = await prisma.conversation.create({
          data: {
            conversationType,
            conversationName,
            conversationImg,
            participants: {
              createMany: {
                data: participantIds.map((id) => ({
                  userId: id,
                  unSeenMessageCount: 0,
                })),
              },
            },
          },
          include: conversationPopulated,
        });
        // console.log('CONVERSATION PAYLOAD', conversation);

        pubsub.publish('CONVERSATION_CREATED', {
          conversationCreated: conversation,
        });

        return {
          conversationId: conversation.id,
        };
      } catch (error: any) {
        console.log('createConversation resolver error', error);
        throw new GraphQLError(error.message);
      }
    },
  },
  Subscription: {
    conversationCreated: {
      // subscribe: (_: any, __: any, context: GraphQLContext) => {
      //   const { pubsub } = context;

      //   return pubsub.asyncIterator(['CONVERSATION_CREATED']);
      // },
      subscribe: withFilter(
        (_: any, __: any, context: GraphQLContext) => {
          const { pubsub } = context;

          return pubsub.asyncIterator(['CONVERSATION_CREATED']);
        },
        (
          payload: ConversationCreatedSubscriptionPayload,
          _: any,
          context: GraphQLContext
        ) => {
          const { session } = context;

          if (!session?.user) {
            throw new GraphQLError('Not authorized');
          }
          const { id: userId } = session.user;
          const {
            conversationCreated: { participants },
          } = payload;

          const userIsParticipant = !!participants.find(
            (p) => p.userId === userId
          );

          return userIsParticipant;
        }
      ),
    },
  },
};

// export const participantPopulated = Prisma.validator<Prisma.Conve>
export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    },
    latestMessage: {
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    },
  });
export default resolvers;
