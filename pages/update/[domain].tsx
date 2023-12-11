import {
  Image,
  Link,
  Loading,
  Menu,
  ProjectData,
  SetupForm,
  Spinner,
  UserContext,
  fetchProjectData,
  handleLogout,
  useContext,
  useEffect,
  useRouter,
  useState,
} from "@/helpers/imports";
import styles from "@/styles/Update.module.scss";

const Page: React.FC = () => {
  const {
    userEmail,
    updateUserEmail,
    loading: userLoading,
  } = useContext(UserContext);
  const [editProjectData, setEditProjectData] = useState<ProjectData>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const domain = Array.isArray(router.query.domain)
    ? router.query.domain[0]
    : router.query.domain;

  useEffect(() => {
    const fetchData = async () => {
      if (domain) {
        try {
          const projectData = await fetchProjectData(domain);
          projectData && setEditProjectData(projectData);
        } catch (error) {
          console.error("Error fetching project data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [domain]);

  const logoutHandler = async () => {
    await handleLogout(setShowSpinner, updateUserEmail, router);
  };

  if (userLoading || loading) return <Loading />;

  if (!userEmail) {
    router.push("/");
    return null;
  }

  if (userEmail) {
    return (
      <main className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/images/logo.svg"
              width={178}
              height={22.3}
              alt="logo"
            />
          </Link>
        </div>

        <div className={styles["dashboard-page"]}>
          <header className={styles["heading"]}>
            <h2 className={styles.title}>Edit your PromptGPT</h2>
            {!showMenu ? (
              <button
                onClick={() => {
                  setShowMenu(true);
                }}
                className={styles.hamburger}
              >
                <Image
                  src="/images/hamburger-menu.svg"
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
              src="/images/divider.svg"
              width={888}
              height={16}
              alt="divider"
            />
          </div>
          <SetupForm data={editProjectData} />
        </div>
      </main>
    );
  }
};

export default Page;
