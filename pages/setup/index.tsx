import styles from "@/styles/Setup.module.scss";
import {
  Image,
  Link,
  Loading,
  Menu,
  SetupForm,
  Spinner,
  UserContext,
  handleLogout,
  useContext,
  useRouter,
  useState,
} from "@/helpers/imports";
const SetupPage: React.FC = () => {
  const { userEmail, updateUserEmail, loading } = useContext(UserContext);
  const router = useRouter();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const logoutHandler = async () => {
    await handleLogout(setShowSpinner, updateUserEmail, router);
  };

  if (loading) return <Loading />;

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
            {!showMenu ? (
              <button
                onClick={() => {
                  setShowMenu(true);
                }}
                className={styles.hamburger}
              >
                <Image
                  src="images/hamburger-menu.svg"
                  width={20}
                  height={20}
                  alt="hamburger menu icon"
                />
              </button>
            ) : (
              <Menu onClose={setShowMenu} />
            )}
            <Link href="/dashboard" className={styles.email}>
              {userEmail}
            </Link>
            {showSpinner ? (
              <Spinner color=" rgba(255, 255, 255, 0.4)" height="20px" />
            ) : (
              <button className={styles["logout-btn"]} onClick={logoutHandler}>
                Logout
              </button>
            )}
          </header>
          <div className={styles.divider}>
            <Image
              src="images/divider.svg"
              width={888}
              height={16}
              alt="divider"
            />
          </div>
          <SetupForm />
        </div>
      </main>
    );
  }
};

export default SetupPage;
