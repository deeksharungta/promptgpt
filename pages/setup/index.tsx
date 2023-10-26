import Image from "next/image";
import styles from "@/styles/Setup.module.scss";
import Link from "next/link";
import SetupForm from "@/components/SetupForm/SetupForm";
import { useContext } from "react";
import { UserContext } from "@/store/user-context";
import { useRouter } from "next/router";

const SetupPage: React.FC = () => {
  const { userEmail, updateUserEmail, loading } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        updateUserEmail("");
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading)
    return (
      <main>
        <h1 style={{ color: "white" }}>loadinggg user data</h1>
      </main>
    );

  if (!userEmail) {
    router.push("/");
    return null;
  }

  if (userEmail) {
    return (
      <main className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="images/logo.svg" width={178} height={22.3} alt="logo" />
          </Link>
        </div>
        <div className={styles["setup-page"]}>
          <header className={styles["heading"]}>
            <h2 className={styles.title}>Setup your GPT Profile</h2>
            <Link href="/dashboard" className={styles.email}>
              {userEmail}
            </Link>
            <button className={styles["logout-btn"]} onClick={handleLogout}>
              Logout
            </button>
          </header>
          <Image
            src="images/divider.svg"
            width={888}
            height={16}
            alt="divider"
          />
          <SetupForm />
        </div>
      </main>
    );
  }
};

export default SetupPage;
