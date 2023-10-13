import React, { useEffect } from "react";
import styles from "./Prompt.module.scss";
import Image from "next/image";
import Link from "next/link";
import useInput from "@/hooks/use-input";

const promptValidityCheck = (value: string) => value.trim() !== "";

type PromptProps = {
  onPromptChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
  initialPrompt?: string;
};

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
          Personalized Prompt
        </label>
        <Link href="#" className={styles.link}>
          Check Examples
          <Image
            src="images/arrow-right.svg"
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
        style={{ borderColor: promptHasError ? "#ff3333" : "" }}
        onChange={promptChangeHandler}
        onBlur={promptBlurHandler}
        value={promptValue}
      />
    </div>
  );
};

export default Prompt;
