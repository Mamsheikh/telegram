import userResolvers from './user';
import conversationResolvers from './conversation';
import merge from 'lodash.merge';

const resolvers = merge({}, conversationResolvers, userResolvers);

export default resolvers;
