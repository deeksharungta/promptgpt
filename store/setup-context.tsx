import { createContext, useState, ReactNode, useContext } from "react";

type SetupContextType = {
  setupDetails: {
    name: string | null;
    description: string | null;
    prompt: string | null;
    domain: string | null;
    key: string | null;
  };
  updateSetupDetails: (
    name: string | null,
    description: string | null,
    prompt: string | null,
    domain: string | null,
    key: string | null
  ) => void;
};

const initialSetupContext: SetupContextType = {
  setupDetails: {
    name: "",
    description: "",
    prompt: "",
    domain: "",
    key: "",
  },
  updateSetupDetails: (name, description, prompt, domain, key) => {},
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
    key: string | null
  ) {
    setSetupDetails({
      name,
      description,
      prompt,
      domain,
      key,
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
