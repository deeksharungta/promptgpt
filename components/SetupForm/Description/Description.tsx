import React, { useEffect } from "react";
import styles from "./Description.module.scss";
import useInput from "@/hooks/use-input";

const descriptionValidityCheck = (value: string) => value.trim() !== "";

type DescriptionProps = {
  onDescriptionChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
};

const Description: React.FC<DescriptionProps> = ({
  onDescriptionChange,
  onValidityChange,
}) => {
  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(descriptionValidityCheck);

  useEffect(() => {
    onDescriptionChange(descriptionValue);
    onValidityChange(descriptionIsValid);
  }, [descriptionValue, descriptionIsValid]);

  return (
    <div className={styles["input-item"]}>
      <label htmlFor="description" className={styles.title}>
        Short Description
      </label>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter a short description about the tool"
        name="description"
        id="description"
        style={{ borderColor: descriptionHasError ? "#ff3333" : "" }}
        onChange={descriptionChangeHandler}
        onBlur={descriptionBlurHandler}
        value={descriptionValue}
      />
    </div>
  );
};

export default Description;
