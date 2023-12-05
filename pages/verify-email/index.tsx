import styles from "@/styles/Verify.module.scss";
import {
  Link,
  UserContext,
  handleEmailVerification,
  useContext,
  useRouter,
  useSearchParams,
  useState,
} from "@/helpers/imports";

export default function VerifyEmail() {
  const { updateUserEmail } = useContext(UserContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hasError, setHasError] = useState<boolean>(false);

  const token = searchParams.get("token");
  token && handleEmailVerification(token, updateUserEmail, router, setHasError);

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
