import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Login from "@/components/Login/Login";
import { useContext } from "react";
import { UserContext } from "@/store/user-context";
import { useRouter } from "next/router";

export default function HomePage() {
  const { userEmail } = useContext(UserContext);
  const router = useRouter();

  if (!userEmail) {
    return (
      <main className={styles["home-page"]}>
        <Image src="/images/logo.svg" width={232} height={29.1} alt="logo" />
        <h1 className={styles.title}>Get your prompt engineering to life</h1>
        <h3 className={styles["sub-title"]}>
          With Prompt GPT, you can deploy your own personalized Chat GPT for
          free in 2 min.
        </h3>
        <Login />
      </main>
    );
  } else {
    router.push("/dashboard");
  }
}
