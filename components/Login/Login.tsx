import React, { useState } from "react";
import styles from "./Login.module.scss";
import { FormEvent, handleEmailSubmit, useInput } from "@/helpers/imports";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValidityCheck = (value: string) => value.trim() !== "" && emailPattern.test(value);

function Login() {
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(emailValidityCheck);

  const loginFormSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowFeedback(true);
      resetEmail();
    }, 1000);

    if (emailIsValid) {
      handleEmailSubmit(emailValue);
    }
  };

  return (
    <>
      {showFeedback ? (
        <div className={styles.feedback}>
          Check your email inbox
          <br />
          You should receive a magic link to login
        </div>
      ) : (
        <form
          className={styles["email-input"]}
          onSubmit={loginFormSubmitHandler}
          style={{ borderColor: emailHasError ? "#db3031" : "" }}
        >
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? <Spinner color="#000" height="28px" /> : "Get Started"}
          </button>
        </form>
      )}
      {emailHasError && <p className={styles["error-message"]}>Please enter a valid email</p>}
    </>
  );
}

export default Login;

