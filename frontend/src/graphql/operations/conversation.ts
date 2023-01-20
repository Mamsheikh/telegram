import { gql } from '@apollo/client';
import { MessageFields } from './message';

const ConversationFields = `
  
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
    latestMessage {
      ${MessageFields}
    }

`;

export const conversationOperations = {
  Queries: {
    conversation: gql`
    query Conversation($conversationId: String!) {
      conversation(conversationId:$conversationId) {
        ${ConversationFields}
      }
    }`,
    conversations: gql`
      query Conversations {
        conversations {

        ${ConversationFields}
        }
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
  Subscriptions: {
    conversationCreated: gql`
      subscription ConversationCreated {
        conversationCreated {
          ${ConversationFields}
        }
      }
    `,
  },
};
