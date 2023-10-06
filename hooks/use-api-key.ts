import { useState, useEffect, ChangeEvent } from "react";

type UseApiKeyResult = {
  apiKey: string;
  apiKeyValid: boolean;
  apiKeyTouched: boolean;
  apiKeyError: string;
  apiKeyChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  apiKeyBlurHandler: () => Promise<void>;
  resetApiKey: () => void;
};

const useApiKey = (): UseApiKeyResult => {
  const [apiKey, setApiKey] = useState<string>("");
  const [apiKeyValid, setApiKeyValid] = useState<boolean>(false);
  const [apiKeyTouched, setApiKeyTouched] = useState<boolean>(false);
  const [apiKeyError, setApiKeyError] = useState<string>("");

  const isAPIKeyValid = async (key: string): Promise<boolean> => {
    try {
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

      if (!response.ok) {
        throw new Error("Invalid API Key");
      }

      const result = await response.json();
      return result.id !== undefined;
    } catch (error) {
      return false;
    }
  };

  const apiKeyChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setApiKey(event.target.value);
    setApiKeyTouched(true);
  };

  const apiKeyBlurHandler = async (): Promise<void> => {
    if (apiKey.trim() === "") {
      setApiKeyValid(false);
      setApiKeyError("API Key is required");
      return;
    }

    const isValid = await isAPIKeyValid(apiKey);
    setApiKeyValid(isValid);
    setApiKeyError(isValid ? "" : "Invalid API Key");
  };

  const resetApiKey = (): void => {
    setApiKey("");
    setApiKeyTouched(false);
    setApiKeyValid(false);
    setApiKeyError("");
  };

  useEffect(() => {
    apiKeyBlurHandler();
  }, []);

  return {
    apiKey,
    apiKeyValid,
    apiKeyTouched,
    apiKeyError,
    apiKeyChangeHandler,
    apiKeyBlurHandler,
    resetApiKey,
  };
};

export default useApiKey;
