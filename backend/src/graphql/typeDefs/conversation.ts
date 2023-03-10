import { ConversationType } from './../../utils/types';
import { gql } from 'graphql-tag';

const typeDefs = gql`
  scalar Date

  type Query {
    conversation(conversationId: String!): Conversation
    conversations: [Conversation]
  }
  type Mutation {
    createConversation(
      conversationName: String
      conversationImg: String
      conversationType: ConversationType
      participantIds: [String]
    ): CreateConversationResponse
    markConversationAsRead(userId: String!, conversationId: String!): Boolean
  }
  type Subscription {
    conversationCreated: Conversation
  }

  type CreateConversationResponse {
    conversationId: String
  }

  type Conversation {
    id: String
    conversationType: ConversationType
    conversationName: String
    conversationImg: String
    latestMessage: Message
    participants: [Participant]
    createdAt: Date
    updatedAt: Date
  }

  type Participant {
    id: String
    user: User
    hasSeenLatestMessage: Boolean
    unSeenMessageCount: Int
  }

  enum ConversationType {
    DM
    GROUP
    CHANNEL
  }
`;

export default typeDefs;
