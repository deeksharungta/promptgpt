import { FormEvent, useContext, useState } from "react";
import styles from "./Login.module.scss";
import { UserContext } from "@/store/user-context";
import useInput from "@/hooks/use-input";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValidityCheck = (value: string) =>
  value.trim() !== "" && emailPattern.test(value);

function Login() {
  const { updateUserEmail } = useContext(UserContext);
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
    setShowFeedback(true);
    if (emailIsValid) {
      handleEmailSubmit(emailValue);
      resetEmail();
    }
  };

  const handleEmailSubmit = async (email: string) => {
    const response = await fetch("/api/send-magic-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      console.log("Success");
      updateUserEmail(emailValue);
    } else {
      console.log("Error hogya");
    }
  };

  return (
    <>
      {showFeedback ? (
        <div className={styles.feedback}>
          Check you email inbox
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
          <button type="submit">Get Started</button>
        </form>
      )}
      {emailHasError && (
        <p className={styles["error-message"]}>Please enter a valid email</p>
      )}
    </>
  );
}

export default Login;
