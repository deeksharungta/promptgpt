import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import styles from "@/styles/Verify.module.scss";
import { useContext, useState } from "react";
import Link from "next/link";
import { UserContext } from "@/store/user-context";

export default function VerifyEmail() {
  const { updateUserEmail } = useContext(UserContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hasError, setHasError] = useState<boolean>(false);

  const token = searchParams.get("token");
  const handleEmailVerification = async (token: string | null) => {
    const response = await fetch("/api/verify-magic-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    if (response.ok) {
      updateUserEmail(data.data.email);
      setHasError(false);
      router.push("/setup");
    } else {
      setHasError(true);
    }
  };

  token && handleEmailVerification(token);

  return (
    <div className={styles["verify-page"]}>
      {hasError ? (
        <div className={styles.error}>
          <p>Something went wrong!</p>
          <Link href="/">Go Home</Link>
        </div>
      ) : (
        <div className={styles.success}>
          <p>Logging in...</p>
        </div>
      )}
    </div>
  );
}
