import {
  UserContextType,
  createContext,
  fetchUserEmail,
  ReactNode,
  useState,
  useEffect,
} from "@/helpers/imports";

const initialUserContext: UserContextType = {
  userEmail: null,
  updateUserEmail: (userEmail: string) => {},
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserEmail(setLoading, setEmail);
  }, []);

  function updateUserEmailHandler(userEmail: string) {
    setEmail(userEmail);
  }

  const contextValue: UserContextType = {
    userEmail: email,
    updateUserEmail: updateUserEmailHandler,
    loading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
