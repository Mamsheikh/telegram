import { InMemoryCache, ApolloClient, HttpLink, split } from '@apollo/client';
import { createClient } from 'graphql-ws';
import { getSession } from 'next-auth/react';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: 'ws://localhost:4000/graphql/subscriptions',
          connectionParams: async () => ({
            session: await getSession(),
          }),
          lazy: false, // make the client connect immediately
          on: {
            connected: () => console.log('graphql-ws connected'),
            error: (err) => console.log(err),
          },
        })
      )
    : null;

const link =
  typeof window !== 'undefined' && wsLink !== null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
