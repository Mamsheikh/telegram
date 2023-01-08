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
