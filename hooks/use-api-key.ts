import {
  ChangeEvent,
  InputAction,
  InputState,
  isAPIKeyValid,
  useReducer,
  useState,
} from "@/helpers/imports";

const initialInputState: InputState = {
  value: "",
  isTouched: false,
};

const apiKeyReducer = (state: InputState, action: InputAction): InputState => {
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

const useApiKey = (initialValue?: string) => {
  const [apiKeyValid, setApiKeyValid] = useState<boolean>(false);
  const [apiKeyError, setApiKeyError] = useState<string>("");
  const [inputState, dispatch] = useReducer(apiKeyReducer, {
    ...initialInputState,
    value: initialValue || "",
  });

  const apiKeyChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const apiKeyBlurHandler = async (): Promise<void> => {
    dispatch({ type: "BLUR" });
    if (inputState.value.trim() === "") {
      setApiKeyError("API Key is required");
      setApiKeyValid(false);
      return;
    }

    const isValid = await isAPIKeyValid(inputState.value, setApiKeyError);
    setApiKeyValid(isValid);
  };

  const resetApiKey = () => {
    dispatch({ type: "RESET" });
    setApiKeyValid(false);
    setApiKeyError("");
  };

  const hasError = inputState.isTouched && !apiKeyValid;

  return {
    value: inputState.value,
    isValid: apiKeyValid,
    hasError,
    apiKeyError,
    apiKeyChangeHandler,
    apiKeyBlurHandler,
    resetApiKey,
  };
};

export default useApiKey;
