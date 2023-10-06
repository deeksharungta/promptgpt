import Image from "next/image";
import styles from "@/styles/Dashboard.module.scss";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/store/user-context";
import { useRouter } from "next/router";

export default function Page() {
  const { userEmail } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="images/logo.svg" width={178} height={22.3} alt="logo" />
        </Link>
      </div>
      <div className={styles["dashboard-page"]}>
        <header className={styles["heading"]}>
          <h2 className={styles.title}>Dashboard</h2>
          <p className={styles.email}>{userEmail}</p>
          <button className={styles["logout-btn"]} onClick={handleLogout}>
            Logout
          </button>
        </header>
        <Image src="images/divider.svg" width={888} height={16} alt="divider" />
        <h3 className={styles["tertiary-heading"]}>Deployed PromptGPT</h3>
        <div className={styles["inner-container"]}>
          <Link href="#">
            UX Writer
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </Link>
          <Link href="#">
            UX Writer
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </Link>
          <Link href="#">
            UX Writer
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </Link>
          <Link href="#">
            UX Writer
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </Link>
        </div>
        <Link href="/setup" className={styles["deploy-btn"]}>
          <Image src="images/logoIcon.svg" width={24} height={24} alt="logo" />
          <span>Deploy more PromptGPT</span>
          <Image
            src="images/arrow-right.svg"
            width={24}
            height={24}
            alt="arrow-right"
          />
        </Link>
      </div>
    </main>
  );
}
