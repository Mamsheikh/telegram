import { gql } from '@apollo/client';

export const conversationOperations = {
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
