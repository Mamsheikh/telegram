// import { ConversationPopulated } from './../../../frontend/src/utils/types';
import { Prisma, PrismaClient } from '@prisma/client';
import { ISODateString } from 'next-auth';
import { PubSub } from 'graphql-subscriptions';
import { Context } from 'graphql-ws/lib/server';
import { conversationPopulated } from '../graphql/resolvers/conversation';
export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}

export interface SubscriptionContext extends Context {
  connectionParams: {
    session?: Session;
  };
}

export interface Session {
  user?: User;
  expires: ISODateString;
}
export interface User {
  id: string;
  username: string;
  image: string;
  name: string;
  email: string;
}

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

export interface CreateConversationInput {
  participantIds: Array<string>;
  conversationType: ConversationType;
  conversationName: string;
  conversationImg: string;
}

export enum ConversationType {
  DM = 'DM',
  CHANNEL = 'CHANNEL',
  GROUP = 'GROUP',
}

export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export interface ConversationCreatedSubscriptionPayload {
  conversationCreated: ConversationPopulated;
}
