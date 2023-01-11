import { GraphQLContext } from './../../utils/types';

const resolvers = {
  Mutation: {
    createConversation: async (_: any, args: {}, context: GraphQLContext) => {
      console.log('INSIDE CREATE CONVERSATION');
    },
  },
};

export default resolvers;
