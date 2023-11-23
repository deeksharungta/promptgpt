import useInput from "@/hooks/use-input";
import styles from "./ProjectName.module.scss";
import { useEffect } from "react";

const nameValidityCheck = (value: string) => value.trim() !== "";

type ProjectNameProps = {
  onNameChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
  initialName?: string;
};

const ProjectName: React.FC<ProjectNameProps> = ({
  onNameChange,
  onValidityChange,
  initialName,
}) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(nameValidityCheck, initialName);

  useEffect(() => {
    onNameChange(nameValue);
    onValidityChange(nameIsValid);
  }, [nameValue, nameIsValid]);

  return (
    <div className={styles["input-item"]}>
      <label htmlFor="name" className={styles.title}>
        Project Name <span>*</span>
      </label>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter Project Name"
        name="name"
        id="name"
        style={{ borderColor: nameHasError ? "#ff3333" : "" }}
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        value={nameValue}
      />
      {nameHasError && <p>Project Name is required</p>}
    </div>
  );
};

export default ProjectName;
