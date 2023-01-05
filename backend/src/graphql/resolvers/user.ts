import { GraphQLError } from 'graphql';
import { CreateUsernameResponse, GraphQLContext } from './../../utils/types';
import { User } from '@prisma/client';
const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<User[]> => {
      const { username: searchUsername } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError('Not authorized');
      }

      const { username: myUsername } = session.user;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchUsername,
              not: myUsername,
              mode: 'insensitive',
            },
          },
        });

        return users;
      } catch (error: any) {
        console.log('searchUsers resolver error', error);
        throw new GraphQLError(error?.message);
      }
    },
  },

  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { prisma, session } = context;

      if (!session?.user) {
        return {
          error: 'Not Authorized',
        };
      }

      const { id: userId } = session.user;

      try {
        const existingUser = await prisma.user.findUnique({
          where: { username },
        });

        if (existingUser) {
          return {
            error: 'Username is already take. Try another!',
          };
        }

        await prisma.user.update({
          where: { id: userId },
          data: {
            username,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log('createUsername resolver error', error);
        return {
          error: error?.message,
        };
      }
    },
  },
};

export default resolvers;
