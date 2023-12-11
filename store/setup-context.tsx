import {
  createContext,
  SetupContextType,
  ReactNode,
  useState,
  useContext,
} from "@/helpers/imports";

const initialSetupContext: SetupContextType = {
  setupDetails: {
    name: "",
    description: "",
    prompt: "",
    domain: "",
    apiKey: "",
  },
  updateSetupDetails: (name, description, prompt, domain, apiKey) => {},
};

export const SetupContext =
  createContext<SetupContextType>(initialSetupContext);

type SetupContextProviderProps = {
  children: ReactNode;
};

export const useSetupContext = () => useContext(SetupContext);

export default function SetupContextProvider({
  children,
}: SetupContextProviderProps) {
  const [setupDetails, setSetupDetails] = useState<
    SetupContextType["setupDetails"]
  >(initialSetupContext.setupDetails);

  function updateSetupDetailsHandler(
    name: string | null,
    description: string | null,
    prompt: string | null,
    domain: string | null,
    apiKey: string | null
  ) {
    setSetupDetails({
      name,
      description,
      prompt,
      domain,
      apiKey,
    });
  }

  const contextValue: SetupContextType = {
    setupDetails,
    updateSetupDetails: updateSetupDetailsHandler,
  };

  return (
    <SetupContext.Provider value={contextValue}>
      {children}
    </SetupContext.Provider>
  );
}
