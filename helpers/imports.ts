// React imports
export {
  useEffect,
  useRef,
  useState,
  useContext,
  useReducer,
  createContext,
} from "react";
export type { FormEvent, ChangeEvent, ReactNode } from "react";
export { ToastContainer, toast } from "react-toastify";

// Types
export type {
  ButtonProps,
  LayoutProps,
  HomePageProps,
  ModalProps,
  ProjectNameProps,
  OpenAPIKeyProps,
  Project,
  ProjectData,
  PromptProps,
  DescriptionProps,
  DomainProps,
  SetupFormProps,
  SpinnerProps,
  SubdomainProps,
  UserContextType,
  UserResponse,
  SetupContextType,
  InputAction,
  InputState,
} from "@/helpers/types";

// Contexts and Hooks
export { UserContext } from "@/store/user-context";
export { SetupContext } from "@/store/setup-context";
export { default as useInput } from "@/hooks/use-input";
export { default as useDomain } from "@/hooks/use-domain";
export { default as useApiKey } from "@/hooks/use-api-key";

// Next.js and Components
export { useRouter } from "next/router";
export { useSearchParams } from "next/navigation";
export type { NextApiRequest, NextApiResponse, GetServerSideProps } from "next";
export { default as Loading } from "@/components/Loading/Loading";
export { default as Image } from "next/image";
export { default as Login } from "@/components/Login/Login";
export { default as Head } from "next/head";
export { default as Link } from "next/link";
export { default as Spinner } from "../components/Spinner/Spinner";
export { default as Button } from "@/components/Button/Button";
export { default as Subdomain } from "@/components/Subdomain/Subdomain";
export { default as Home } from "@/components/HomePage/Home";
export { default as SetupForm } from "@/components/SetupForm/SetupForm";

// Helper Functions
export {
  handleEmailSubmit,
  handleProjectSubmit,
  isAPIKeyValid,
  chatData,
  checkDomainUniqueness,
  handleDeleteProject,
  fetchProjectData,
  fetchUserEmail,
  handleEmailVerification,
  fetchUserProjects,
  handleLogout,
} from "@/helpers/apiFunctions";
export { handleCopy, handleEditProject } from "@/helpers/functions";

// Setup Form Components
export { default as ProjectName } from "@/components/SetupForm/ProjectName/ProjectName";
export { default as Description } from "@/components/SetupForm/Description/Description";
export { default as Prompt } from "@/components/SetupForm/Prompt/Prompt";
export { default as Domain } from "@/components/SetupForm/Domain/Domain";
export { default as OpenAPIKey } from "@/components/SetupForm/OpenAPIKey/OpenAPIKey";

// Additional imports
export { PrismaClient } from "@prisma/client";
export { parse, serialize } from "cookie";
export { default as jwt } from "jsonwebtoken";
export { v4 as uuidv4 } from "uuid";
