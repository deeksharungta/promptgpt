import styles from "./OpenAPIKey.module.scss";
import {
  Image,
  Link,
  OpenAPIKeyProps,
  useApiKey,
  useEffect,
} from "@/helpers/imports";

const OpenAPIKey: React.FC<OpenAPIKeyProps> = ({
  onKeyChange,
  onValidityChange,
  initialKey,
}) => {
  const {
    value: keyValue,
    isValid: keyIsValid,
    hasError: keyHasError,
    apiKeyError,
    apiKeyChangeHandler: keyChangeHandler,
    apiKeyBlurHandler: keyBlurHandler,
    resetApiKey: resetKey,
  } = useApiKey(initialKey);

  useEffect(() => {
    onKeyChange(keyValue);
    onValidityChange(keyIsValid);
  }, [keyValue, keyIsValid]);

  return (
    <div className={styles["input-item"]}>
      <div className={styles.heading}>
        <label htmlFor="apiKey" className={styles.title}>
          Open API Key <span>*</span>
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
        name="apiKey"
        id="apiKey"
        style={{
          borderColor: keyHasError
            ? apiKeyError === "Verifying.."
              ? ""
              : "#DB3031"
            : "",
        }}
        onChange={keyChangeHandler}
        onBlur={keyBlurHandler}
        value={keyValue}
      />
      {keyHasError && (
        <p
          style={{ color: apiKeyError === "Verifying.." ? "#fff" : "" }}
          className={styles["error-message"]}
        >
          {apiKeyError}
        </p>
      )}
    </div>
  );
};

export default OpenAPIKey;
