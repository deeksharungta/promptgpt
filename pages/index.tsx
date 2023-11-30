import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Login from "@/components/Login/Login";
import { useContext } from "react";
import { UserContext } from "@/store/user-context";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";
import { GetServerSideProps } from "next";

type ProjectData = {
  name: string;
  description: string;
  prompt: string;
  domain: string;
  key: string;
};
const HomePage: React.FC<{ wildcard: string }> = ({ wildcard }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Wildcard value: {wildcard}</p>
    </div>
  );
  // const { userEmail, loading } = useContext(UserContext);
  // const router = useRouter();
  // if (loading) return <Loading />;
  // if (!userEmail) {
  //   return (
  //     <main className={styles["home-page"]}>
  //       <Image src="/images/logo.svg" width={232} height={29.1} alt="logo" />
  //       <h1 className={styles.title}>Get your prompt engineering to life</h1>
  //       <h3 className={styles["sub-title"]}>
  //         With Prompt GPT, you can deploy your own personalized Chat GPT for
  //         free in 2 min.
  //       </h3>
  //       <Login />
  //     </main>
  //   );
  // }
  // if (userEmail) {
  //   router.push("/dashboard");
  //   return null;
  // }
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let wildcard = context?.req?.headers?.host?.split(".")[0];
  wildcard =
    wildcard != "promptgpt"
      ? wildcard != "localhost:3000"
        ? wildcard
        : "abc"
      : "home";
  return { props: { wildcard } };
};
