import styles from "./Domain.module.scss";
import { DomainProps, useDomain, useEffect } from "@/helpers/imports";

const Domain: React.FC<DomainProps> = ({
  onDomainChange,
  onValidityChange,
  initialDomain,
}) => {
  const {
    value: domainValue,
    isValid: domainIsValid,
    hasError: domainHasError,
    errorMessage,
    valueChangeHandler: domainChangeHandler,
    inputBlurHandler: domainBlurHandler,
    reset: resetDomain,
  } = useDomain(initialDomain);

  useEffect(() => {
    onDomainChange(domainValue);
    onValidityChange(domainIsValid);
  }, [domainValue, domainIsValid]);

  return (
    <div className={styles["input-item"]}>
      <label className={styles.title} htmlFor="domain">
        Select Domain <span>*</span>
      </label>
      <div
        className={styles["domain-input"]}
        style={{
          borderColor: domainHasError
            ? errorMessage === "Verifying..."
              ? ""
              : "#DB3031"
            : "",
        }}
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
        <p>.promptgpt.tools</p>
      </div>
      {domainHasError && (
        <p
          style={{ color: errorMessage === "Verifying..." ? "#fff" : "" }}
          className={styles["error-message"]}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Domain;
