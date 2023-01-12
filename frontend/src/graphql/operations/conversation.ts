import { gql } from '@apollo/client';

const ConversationFields = `
  conversations {
    id
      participants {
        id
        user {
          image
          username
        }
      }
    updatedAt
    createdAt
    conversationImg
    conversationName
    conversationType
}
`;

export const conversationOperations = {
  Queries: {
    conversations: gql`
      query Conversations {
        ${ConversationFields}
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation(
        $participantIds: [String]
        $conversationType: ConversationType
        $conversationName: String
        $conversationImg: String
      ) {
        createConversation(
          participantIds: $participantIds
          conversationType: $conversationType
          conversationName: $conversationName
          conversationImg: $conversationImg
        ) {
          conversationId
        }
      }
    `,
  },
};
