import { Prisma } from '@prisma/client';

/**
 * User
 */
export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface User {
  id: string;
  username: string;
  image?: string;
}
export interface SearchUsersData {
  searchUsers: Array<User>;
}

export interface SearchUsersVariables {
  username: string;
}

/**
 * Conversations
 */

export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface CreateConversationVariables {
  participantIds: Array<string>;
  conversationName?: string;
  conversationImg?: string;
  conversationType: ConversationType;
}

export enum ConversationType {
  DM = 'DM',
  CHANNEL = 'CHANNEL',
  GROUP = 'GROUP',
}

export interface Conversation {
  id: string;
  conversationImg?: string;
  conversationName: string;
  conversationType: ConversationType;
  participants: Participant[];
  createdAt: string;
  updatedAt: string;
}

export interface Participant {
  id: string;
  userId: string;
  user: User;
  conversationId: string;
  converstion: ConversationPopulated;
  hasSeenLatestMessage: boolean;
  unSeenMessageCount: number;
}
export interface ConversationsData {
  conversations: Array<ConversationPopulated>;
}

export interface ConversationData {
  conversation: Conversation;
}

export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    },
    latestMessage: {
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    },
  });

export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

// export const participatsPopulated =
//   Prisma.validator<Prisma.ConversationParticipantInclude>()({
//     user: { select: { id: true, username: true, image: true } },
//   });

// export type ParticipantPopulated = Prisma.Conversat<{
//   include: typeof participatsPopulated;
// }>;

/**
 * MESSAGES
 */

export interface MessagesData {
  messages: MessagePopulated[];
}

export interface MessagesVariables {
  conversationId: string;
}

export interface SendMessageVariables {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
}

export interface SendMessageData {
  sendMessage: boolean;
}

export const messagePopulated = Prisma.validator<Prisma.MessageInclude>()({
  sender: {
    select: {
      id: true,
      username: true,
      image: true,
    },
  },
});

export type MessagePopulated = Prisma.MessageGetPayload<{
  include: typeof messagePopulated;
}>;

export interface MessageSubscriptionData {
  subscriptionData: {
    data: {
      messageSent: MessagePopulated;
    };
  };
}
