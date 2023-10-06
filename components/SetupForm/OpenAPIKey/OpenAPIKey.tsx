import React, { useEffect } from "react";
import styles from "./OpenAPIKey.module.scss";
import Image from "next/image";
import Link from "next/link";
import useInput from "@/hooks/use-input";
import useApiKey from "@/hooks/use-api-key";

type OpenAPIKeyProps = {
  onKeyChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
};

const OpenAPIKey: React.FC<OpenAPIKeyProps> = ({
  onKeyChange,
  onValidityChange,
}) => {
  const {
    apiKey: keyValue,
    apiKeyValid: keyIsValid,
    apiKeyTouched: keyIsTouched,
    apiKeyChangeHandler: keyChangeHandler,
    apiKeyBlurHandler: keyBlurHandler,
    resetApiKey: resetKey,
    apiKeyError: keyError,
  } = useApiKey();

  useEffect(() => {
    onKeyChange(keyValue);
    onValidityChange(keyIsValid);
  }, [keyValue, keyIsValid]);

  return (
    <div className={styles["input-item"]}>
      <div className={styles.heading}>
        <label htmlFor="key" className={styles.title}>
          Open API Key
        </label>
        <Link
          href="https://platform.openai.com/account/api-keys"
          className={styles.link}
          target="_blank"
        >
          Where to find
          <Image
            src="images/arrow-right.svg"
            width={16}
            height={16}
            alt="arrow-right-icon"
          />
        </Link>
      </div>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter API Key"
        name="key"
        id="key"
        style={{
          borderColor: keyIsTouched && keyError !== "" ? "#ff3333" : "",
        }}
        onChange={keyChangeHandler}
        onBlur={keyBlurHandler}
        value={keyValue}
      />
      {keyIsTouched && <p>{keyError}</p>}
    </div>
  );
};

export default OpenAPIKey;
