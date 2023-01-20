import userResolvers from './user';
import conversationResolvers from './conversation';
import messageResolvers from './message';
import scalarsResolvers from './scalars';
import merge from 'lodash.merge';

const resolvers = merge(
  {},
  conversationResolvers,
  userResolvers,
  messageResolvers,
  scalarsResolvers
);

export default resolvers;
