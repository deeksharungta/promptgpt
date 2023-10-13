import { createContext, useState, ReactNode, useEffect } from "react";

type UserContextType = {
  userEmail: string | null;
  updateUserEmail: (userEmail: string) => void;
};

type UserResponse = {
  email: string;
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
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await fetch("/api/get-user", {
          method: "GET",
        });

        if (response.ok) {
          const { email } = (await response.json()) as UserResponse;
          setEmail(email);
        } else {
          console.error("Error fetching user email");
        }
      } catch (error) {
        console.error("Error fetching user email", error);
      }
    };

    fetchUserEmail();
  }, []);

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
