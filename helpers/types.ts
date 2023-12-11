import { ReactNode } from "react";

export type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export type LayoutProps = {
  children: ReactNode;
};

export type ModalProps = {
  onClose?: () => void;
  children: ReactNode;
};

export type MenuProps = {
  onClose: (showMenu: boolean) => void;
  onDashboard?: (showEditForm: boolean) => void;
};

export type DescriptionProps = {
  onDescriptionChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
  initialDescription?: string;
};

export type DomainProps = {
  onDomainChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
  initialDomain?: string;
};

export type OpenAPIKeyProps = {
  onKeyChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
  initialKey?: string;
};

export type ProjectNameProps = {
  onNameChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
  initialName?: string;
};

export type PromptProps = {
  onPromptChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
  initialPrompt?: string;
};

export type SetupFormProps = {
  data?: {
    id: number;
    name: string;
    description: string;
    apiKey: string;
    domain: string;
    prompt: string;
    userId: number;
  };
  setShowEditForm?: (show: boolean) => void;
};

export type SpinnerProps = {
  color: string;
  height: string;
};

export type SubdomainProps = {
  name?: string;
  description?: string;
  prompt?: string;
  apiKey?: string;
};

export type InputState = {
  value: string;
  isTouched: boolean;
};

export type InputAction = {
  type: "INPUT" | "BLUR" | "RESET";
  value?: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  apiKey: string;
  domain: string;
  prompt: string;
  userId: number;
};

export type ProjectData = {
  name: string;
  description: string;
  prompt: string;
  domain: string;
  apiKey: string;
};

export type HomePageProps = {
  name?: string;
  description?: string;
  prompt?: string;
  domain?: string;
  apiKey?: string;
  subdomain?: string;
};

export type SetupContextType = {
  setupDetails: {
    name: string | null;
    description: string | null;
    prompt: string | null;
    domain: string | null;
    apiKey: string | null;
  };
  updateSetupDetails: (
    name: string | null,
    description: string | null,
    prompt: string | null,
    domain: string | null,
    apiKey: string | null
  ) => void;
};

export type UserContextType = {
  userEmail: string | null;
  updateUserEmail: (userEmail: string) => void;
  loading: boolean;
};

export type UserResponse = {
  email: string;
};
