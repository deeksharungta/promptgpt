import { useReducer, ChangeEvent, useState } from "react";

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
  const isAPIKeyValid = async (key: string): Promise<boolean> => {
    try {
      setApiKeyError("Verifying..");
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
            ],
            temperature: 0.7,
          }),
        }
      );

      const result = await response.json();
      if (result.error) {
        if (result.error.code === "invalid_api_key")
          setApiKeyError("API Key is not valid");
        else if (result.error.code === "insufficient_quota") {
          setApiKeyError(
            "You exceeded your current quota, please check your plan and billing details on OpenAI platform"
          );
        } else {
          setApiKeyError(result.error.message);
        }
      }
      if (!response.ok) {
        throw new Error("Invalid API Key");
      }
      return result.id !== undefined;
    } catch (error) {
      return false;
    }
  };

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

    const isValid = await isAPIKeyValid(inputState.value);
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
