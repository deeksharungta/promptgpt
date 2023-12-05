import Image from "next/image";
import styles from "@/styles/Dashboard.module.scss";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/store/user-context";
import { useRouter } from "next/router";
import SetupForm from "@/components/SetupForm/SetupForm";
import Loading from "@/components/Loading/Loading";
import Spinner from "@/components/Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Project = {
  id: number;
  name: string;
  description: string;
  apiKey: string;
  domain: string;
  prompt: string;
  userId: number;
};

const Page: React.FC = () => {
  const { userEmail, updateUserEmail, loading } = useContext(UserContext);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [editProjectData, setEditProjectData] = useState<Project>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const response = await fetch("/api/get-projects");
        if (response.ok) {
          const { projects } = await response.json();
          setProjects(projects);
        } else {
          console.error("Error fetching projects");
        }
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchUserProjects();
  }, []);

  const handleLogout = async () => {
    setShowSpinner(true);
    try {
      setTimeout(async () => {
        const response = await fetch("/api/logout", {
          method: "POST",
        });

        if (response.ok) {
          updateUserEmail("");
          router.push("/");
          setShowSpinner(false);
        } else {
          console.error("Logout failed");
          setShowSpinner(false);
        }
      }, 500);
    } catch (error) {
      console.error("Logout failed", error);
      setShowSpinner(false);
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    try {
      const response = await fetch("/api/delete-project", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: projectId }),
      });

      if (response.ok) {
        const updatedProjects = projects.filter(
          (item) => item.id !== projectId
        );
        setProjects(updatedProjects);
        toast.success(`PromptGPT deleted successfully!`);
      } else {
        toast.error("Error deleting PromptGPT!");
      }
    } catch (error) {
      toast.error("Error deleting Promptgpt!");
    }
  };

  const handleEditProject = async (projectId: number) => {
    setShowEditForm(true);
    try {
      const projectToEdit = projects.find(
        (project) => project.id === projectId
      );

      setEditProjectData(projectToEdit);
    } catch (error) {
      console.error("Project update failed", error);
      setShowEditForm(false);
    }
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
              <button className={styles["logout-btn"]} onClick={handleLogout}>
                Logout
              </button>
            )}
          </header>
          <Image
            src="images/divider.svg"
            width={888}
            height={16}
            alt="divider"
          />
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
                            <button onClick={() => handleEditProject(item.id)}>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProject(item.id)}
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
