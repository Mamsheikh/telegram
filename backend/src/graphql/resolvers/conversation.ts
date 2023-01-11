import { GraphQLError } from 'graphql';
import {
  ConversationType,
  CreateConversationInput,
  GraphQLContext,
} from './../../utils/types';
import { Prisma } from '@prisma/client';

const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: CreateConversationInput,
      context: GraphQLContext
    ): Promise<{ conversationId: string }> => {
      const { session, prisma } = context;
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

        return {
          conversationId: conversation.id,
        };
      } catch (error: any) {
        console.log('createConversation resolver error', error);
        throw new GraphQLError(error.message);
      }
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
