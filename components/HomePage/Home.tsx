import { UserContext } from "@/store/user-context";
import { useRouter } from "next/router";
import { useContext } from "react";
import Loading from "../Loading/Loading";
import styles from "./Home.module.scss";
import Image from "next/image";
import Login from "../Login/Login";

const Home = () => {
  const { userEmail, loading } = useContext(UserContext);
  const router = useRouter();
  if (loading) return <Loading />;
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
  }
  if (userEmail) {
    router.push("/dashboard");
    return null;
  }
};

export default Home;
