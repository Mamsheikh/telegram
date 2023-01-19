import { gql } from '@apollo/client';

const MessageFields = `
sender {
    id
    username
    image
  }
id
createdAt
body
`;

export const messageOperations = {
  Queries: {
    messages: gql`
      query Messages($conversationId: String!) {
        messages(conversationId: $conversationId) {
          ${MessageFields}
        }
      }
    `,
  },
  Mutations: {
    sendMessage: gql`
      mutation SendMessage(
        $senderId: String!
        $body: String!
        $conversationId: String!
      ) {
        sendMessage(
          senderId: $senderId
          body: $body
          conversationId: $conversationId
        )
      }
    `,
  },
  Subscriptions: {
    messageSent: gql`
      subscription MessageSent($conversationId: String!) {
        messageSent(conversationId: $conversationId) {
          ${MessageFields}
        }
      }
    `,
  },
};
