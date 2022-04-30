import { ReactNode, useState, createContext, useContext } from "react";

import { CognitoUser, UserContextType } from "types";

interface Props {
  children: ReactNode;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<CognitoUser>({} as CognitoUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUserData = () => useContext(UserContext);
