import { createContext, useState, ReactNode, useEffect } from "react";

type UserContextType = {
  userEmail: string | null;
  updateUserEmail: (userEmail: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  loading: boolean;
};

type UserResponse = {
  email: string;
};

const initialUserContext: UserContextType = {
  userEmail: null,
  updateUserEmail: (userEmail: string) => {},
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {},
  loading: false,
};

export const UserContext = createContext<UserContextType>(initialUserContext);

type UserContextProviderProps = {
  children: ReactNode;
};

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [email, setEmail] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserEmail = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/get-user", {
          method: "GET",
        });

        if (response.ok) {
          const { email } = (await response.json()) as UserResponse;
          setEmail(email);
          setIsAuthenticated(true);
        } else {
          console.error("Error fetching user email");
        }
      } catch (error) {
        console.error("Error fetching user email", error);
      } finally {
        setLoading(false);
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
    isAuthenticated,
    setIsAuthenticated,
    loading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
