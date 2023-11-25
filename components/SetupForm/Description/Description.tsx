import React, { useEffect } from "react";
import styles from "./Description.module.scss";
import useInput from "@/hooks/use-input";

const descriptionValidityCheck = (value: string) => value.trim() !== "";

type DescriptionProps = {
  onDescriptionChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
  initialDescription?: string;
};

const Description: React.FC<DescriptionProps> = ({
  onDescriptionChange,
  onValidityChange,
  initialDescription,
}) => {
  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(descriptionValidityCheck, initialDescription);

  useEffect(() => {
    onDescriptionChange(descriptionValue);
    onValidityChange(descriptionIsValid);
  }, [descriptionValue, descriptionIsValid]);

  return (
    <div className={styles["input-item"]}>
      <label htmlFor="description" className={styles.title}>
        Short Description <span>*</span>
      </label>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter a short description about the tool"
        name="description"
        id="description"
        style={{ borderColor: descriptionHasError ? "#DB3031" : "" }}
        onChange={descriptionChangeHandler}
        onBlur={descriptionBlurHandler}
        value={descriptionValue}
      />
      {descriptionHasError && (
        <p className={styles["error-message"]}>Description is required</p>
      )}
    </div>
  );
};

export default Description;
