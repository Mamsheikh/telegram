import { PrismaClient } from '@prisma/client';
import { GraphQLContext, Session } from './utils/types';
import { getSession } from 'next-auth/react';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { json } from 'body-parser';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

async function main() {
  dotenv.config();
  const app = express();
  const prisma = new PrismaClient({
    log: ['error', 'info', 'query', 'warn'],
  });
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      //   ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  };
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(corsOptions),
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const session = await getSession({ req });
        console.log('CONTEXT SESSION', session);
        return { session: session as Session, prisma };
      },
    })
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

main().catch((err) => console.log(err));
