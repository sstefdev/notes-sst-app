export interface UserCredentials {
  email: string;
  password: string;
}

export interface CognitoUser {
  attributes: {
    email: string;
    email_verified: string;
    name: string;
    sub: string;
  };
  username: string;
  userDataKey: string;
  authenticationFlowType: string;
  pool: {
    userPoolId: string;
    clientId: string;
  };
}

export interface UserContextType {
  user: CognitoUser;
  setUser: (user: CognitoUser) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export interface UserSignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  confirmationCode: string;
}

export interface UserBill {
  source: string;
  storage: number;
}

export interface Note {
  attachment: File | string;
  content: string;
  attachmentURL?: string;
  createdAt?: Date | string | number;
  noteId: string | number;
}
