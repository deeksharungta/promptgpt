import { ChangeEvent, FormEvent, useContext, useState } from "react";
import styles from "./Login.module.scss";
import { UserContext } from "@/store/user-context";

function Login() {
  const { updateUserEmail } = useContext(UserContext);
  const [emailInput, setEmailInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const loginFormSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.trim() === "") {
      setError("Please enter a value.");
      console.log("hi");
    } else if (!emailPattern.test(emailInput)) {
      setError("Please enter a valid email address.");
      return;
    }
    console.log(error);
    setError("");

    updateUserEmail(emailInput);
  };

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  return (
    <>
      <form className={styles["email-input"]} onSubmit={loginFormSubmitHandler}>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={emailInput}
          onChange={handleEmailInputChange}
          required
        />
        <button type="submit">Get Started</button>
      </form>
      {error && <p className={styles["error-message"]}>{error}</p>}
    </>
  );
}

export default Login;
