import styles from "./ProjectName.module.scss";
import { ProjectNameProps, useEffect, useInput } from "@/helpers/imports";

const nameValidityCheck = (value: string) => value.trim() !== "";

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
        style={{ borderColor: nameHasError ? "#DB3031" : "" }}
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        value={nameValue}
      />
      {nameHasError && (
        <p className={styles["error-message"]}>Project Name is required</p>
      )}
    </div>
  );
};

export default ProjectName;
