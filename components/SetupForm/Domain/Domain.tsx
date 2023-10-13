import useInput from "@/hooks/use-input";
import styles from "./Domain.module.scss";
import { useEffect } from "react";

const domainValidityCheck = (value: string) => value.trim() !== "";

type DomainProps = {
  onDomainChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
  initialDomain?: string;
};

const Domain: React.FC<DomainProps> = ({
  onDomainChange,
  onValidityChange,
  initialDomain,
}) => {
  const {
    value: domainValue,
    isValid: domainIsValid,
    hasError: domainHasError,
    valueChangeHandler: domainChangeHandler,
    inputBlurHandler: domainBlurHandler,
    reset: resetDomain,
  } = useInput(domainValidityCheck, initialDomain);

  useEffect(() => {
    onDomainChange(domainValue);
    onValidityChange(domainIsValid);
  }, [domainValue, domainIsValid]);

  return (
    <div className={styles["input-item"]}>
      <label className={styles.title} htmlFor="domain">
        Select Domain
      </label>
      <div
        className={styles["domain-input"]}
        style={{ borderColor: domainHasError ? "#ff3333" : "" }}
      >
        <input
          className={styles.input}
          type="text"
          placeholder="Enter domain name"
          name="domain"
          id="domain"
          onChange={domainChangeHandler}
          onBlur={domainBlurHandler}
          value={domainValue}
        />
        <p>.prompt.to</p>
      </div>
    </div>
  );
};

export default Domain;
