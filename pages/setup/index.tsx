import Image from "next/image";
import styles from "@/styles/Setup.module.scss";
import Link from "next/link";
import SetupForm from "@/components/SetupForm/SetupForm";

export default function Page() {
  return (
    <main>
      <Link href="/">
        <Image
          src="images/logo.svg"
          width={178}
          height={22.3}
          alt="logo"
          className={styles.logo}
        />
      </Link>
      <div className={styles["setup-page"]}>
        <header className={styles["heading"]}>
          <h2 className={styles.title}>Setup your GPT Profile</h2>
          <p className={styles.email}>pratyush987@gmail.com</p>
          <button className={styles["logout-btn"]}>Logout</button>
        </header>
        <Image src="images/divider.svg" width={888} height={16} alt="divider" />
        <SetupForm />
      </div>
    </main>
  );
}
