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
  user: User;
}
export interface ConversationsData {
  conversations: Array<Conversation>;
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

// export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
//   include: typeof participatsPopulated;
// }>;
