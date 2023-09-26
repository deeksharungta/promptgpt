import { createContext, useState, ReactNode } from "react";

type UserContextType = {
  userEmail: string | null;
  updateUserEmail: (userEmail: string) => void;
};

const initialUserContext: UserContextType = {
  userEmail: null,
  updateUserEmail: (userEmail: string) => {},
};

export const UserContext = createContext<UserContextType>(initialUserContext);

type UserContextProviderProps = {
  children: ReactNode;
};

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [email, setEmail] = useState<string>("");

  function updateUserEmailHandler(userEmail: string) {
    setEmail(userEmail);
  }

  const contextValue: UserContextType = {
    userEmail: email,
    updateUserEmail: updateUserEmailHandler,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
