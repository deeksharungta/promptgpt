import {
  Image,
  Link,
  Loading,
  Menu,
  Project,
  SetupForm,
  Spinner,
  ToastContainer,
  UserContext,
  fetchUserProjects,
  handleDeleteProject,
  handleEditProject,
  handleLogout,
  useContext,
  useEffect,
  useRouter,
  useState,
} from "@/helpers/imports";
import styles from "@/styles/Dashboard.module.scss";
import "react-toastify/dist/ReactToastify.css";

const Page: React.FC = () => {
  const { userEmail, updateUserEmail, loading } = useContext(UserContext);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [editProjectData, setEditProjectData] = useState<Project>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchUserProjects(setProjects, setLoadingProjects);
  }, []);

  const logoutHandler = async () => {
    await handleLogout(setShowSpinner, updateUserEmail, router);
  };

  const deleteProjectHandler = async (projectId: number) => {
    await handleDeleteProject(projectId, projects, setProjects);
  };

  const editProjectHandler = async (projectId: number) => {
    await handleEditProject(
      projectId,
      projects,
      setShowEditForm,
      setEditProjectData
    );
  };

  if (loading) return <Loading />;

  if (!userEmail) {
    router.push("/");
    return null;
  }

  if (userEmail) {
    return (
      <main className={styles.container}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className={styles.logo}>
          <Link href="/">
            <Image src="images/logo.svg" width={178} height={22.3} alt="logo" />
          </Link>
        </div>

        <div className={styles["dashboard-page"]}>
          <header className={styles["heading"]}>
            <h2 className={styles.title}>
              {showEditForm ? "Edit your PromptGPT" : "Dashboard"}
            </h2>
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
              <Menu onClose={setShowMenu} onDashboard={setShowEditForm} />
            )}
            <Link
              href="/dashboard"
              className={styles.email}
              onClick={() => {
                setShowEditForm(false);
              }}
            >
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
          {showEditForm ? (
            <SetupForm
              data={editProjectData}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <>
              <h3 className={styles["tertiary-heading"]}>Deployed PromptGPT</h3>
              <div className={styles["inner-container"]}>
                {loadingProjects ? (
                  <div className={styles.loader}>
                    <Spinner color=" rgb(255, 255, 255)" height="30px" />
                  </div>
                ) : (
                  <>
                    {!!projects.length ? (
                      projects.map((item) => (
                        <div className={styles.item} key={item.id}>
                          <Link href={`https://${item.domain}.promptgpt.tools`}>
                            {item.name}
                          </Link>
                          <div>
                            <button onClick={() => editProjectHandler(item.id)}>
                              Edit
                            </button>
                            <button
                              onClick={() => deleteProjectHandler(item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No PromptGPT Found!</p>
                    )}
                  </>
                )}
              </div>
              <Link href="/setup" className={styles["deploy-btn"]}>
                <Image
                  src="images/logoIcon.svg"
                  width={24}
                  height={24}
                  alt="logo"
                />
                <span>Deploy a PromptGPT</span>
                <Image
                  src="images/arrow-right.svg"
                  width={24}
                  height={24}
                  alt="arrow-right"
                />
              </Link>
            </>
          )}
        </div>
      </main>
    );
  }
};

export default Page;
