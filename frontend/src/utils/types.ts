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
