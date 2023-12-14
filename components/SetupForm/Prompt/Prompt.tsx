import styles from "./Prompt.module.scss";
import {
  Image,
  Link,
  PromptProps,
  useEffect,
  useInput,
} from "@/helpers/imports";

const promptValidityCheck = (value: string) => value.trim() !== "";

const Prompt: React.FC<PromptProps> = ({
  onPromptChange,
  onValidityChange,
  initialPrompt,
}) => {
  const {
    value: promptValue,
    isValid: promptIsValid,
    hasError: promptHasError,
    valueChangeHandler: promptChangeHandler,
    inputBlurHandler: promptBlurHandler,
    reset: resetPrompt,
  } = useInput(promptValidityCheck, initialPrompt);

  useEffect(() => {
    onPromptChange(promptValue);
    onValidityChange(promptIsValid);
  }, [promptValue, promptIsValid]);

  return (
    <div className={styles["input-item"]}>
      <div className={styles.heading}>
        <label htmlFor="prompt" className={styles.title}>
          Personalized Prompt <span>*</span>
        </label>
        <Link
          href="https://early-drive-d38.notion.site/Prompts-Example-b2ebb1773a55416d85ce30296d085216"
          target="_blank"
          className={styles.link}
        >
          Check Examples
          <Image
            src="/images/arrow-right.svg"
            width={16}
            height={16}
            alt="arrow-right-icon"
          />
        </Link>
      </div>
      <textarea
        className={styles["prompt-textarea"]}
        id="prompt"
        placeholder="Enter your Personalized Prompt here"
        name="prompt"
        style={{ borderColor: promptHasError ? "#DB3031" : "" }}
        onChange={promptChangeHandler}
        onBlur={promptBlurHandler}
        value={promptValue}
      />
      {promptHasError && (
        <p className={styles["error-message"]}>Prompt is required</p>
      )}
    </div>
  );
};

export default Prompt;
