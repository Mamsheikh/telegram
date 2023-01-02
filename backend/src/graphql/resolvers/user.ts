const resolvers = {
  Query: {
    searchUsers: () => {},
    hello: () => 'Hello, World!',
  },

  Mutation: {
    createUsername: (_: any, args: { username: string }, context) => {
      console.log('USERNAME MUTATUON');
    },
  },
};

export default resolvers;
