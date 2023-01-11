import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Mutation {
    createConversation(
      conversationName: String
      conversationImg: String
      conversationType: ConversationType
      participantIds: [String]
    ): CreateConversationResponse
  }

  type CreateConversationResponse {
    conversationId: String
  }

  enum ConversationType {
    DM
    GROUP
    CHANNEL
  }
`;

export default typeDefs;
