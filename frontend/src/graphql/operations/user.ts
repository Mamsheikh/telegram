import { gql } from '@apollo/client';

export const userOperations = {
  Queries: {
    searchUsers: gql`
      query searchUsers($username: String!) {
        searchUsers(username: $username) {
          id
          image
          username
        }
      }
    `,
  },
  Mutations: {
    createUsername: gql`
      mutation CreateUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
