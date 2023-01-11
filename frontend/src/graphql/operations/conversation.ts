import { gql } from '@apollo/client';

export const conversationOperations = {
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
};
