import { ChangeEvent, useReducer, useState } from "react";

type InputState = {
  value: string;
  isTouched: boolean;
};

type InputAction = {
  type: "INPUT" | "BLUR" | "RESET";
  value?: string;
};

const initialInputState: InputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (
  state: InputState,
  action: InputAction
): InputState => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value || "", isTouched: state.isTouched };
    case "BLUR":
      return { isTouched: true, value: state.value };
    case "RESET":
      return { isTouched: false, value: "" };
    default:
      return state;
  }
};
const isValidSubdomain = (subdomain: string): boolean => {
  const subdomainRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
  return subdomainRegex.test(subdomain);
};

const useDomain = (initialValue?: string) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    ...initialInputState,
    value: initialValue || "",
  });
  const [valueIsValid, setValueIsValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const hasError = !valueIsValid && inputState.isTouched;

  const checkDomainUniqueness = async (domain: string): Promise<boolean> => {
    try {
      setErrorMessage("Verifying...");
      const response = await fetch(`/api/check-domain?domain=${domain}`);
      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          setErrorMessage("Domain Name already taken");
          return false;
        }
        return true;
      } else if (response.status === 404) {
        return true;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error checking domain uniqueness:", error);
      return false;
    }
  };

  const valueChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = async (): Promise<void> => {
    dispatch({ type: "BLUR" });
    if (inputState.value.trim() === "") {
      setErrorMessage("Domain Name is required");
      setValueIsValid(false);
      return;
    }
    if (!isValidSubdomain(inputState.value.trim())) {
      setErrorMessage("Invalid format");
      setValueIsValid(false);
      return;
    }
    const isValid = await checkDomainUniqueness(inputState.value);
    setValueIsValid(isValid);
  };

  const reset = () => {
    dispatch({ type: "RESET" });
    setValueIsValid(false);
    setErrorMessage("");
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    errorMessage,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useDomain;
