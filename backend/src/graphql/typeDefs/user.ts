import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: String
    username: String
    image: String
  }
  type Query {
    searchUsers(username: String): [User]
    hello: String!
  }
  type Mutation {
    createUsername(username: String): CreateUsernameResponse
  }
  type CreateUsernameResponse {
    success: Boolean
    error: Boolean
  }
`;

export default typeDefs;
