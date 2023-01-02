import { GraphQLError } from 'graphql';
import { CreateUsernameResponse, GraphQLContext } from './../../utils/types';
const resolvers = {
  Query: {
    searchUsers: () => {},
    hello: () => 'Hello, World!',
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
