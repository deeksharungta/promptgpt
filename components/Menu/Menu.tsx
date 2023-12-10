import styles from "./Menu.module.scss";
import {
  Image,
  Link,
  UserContext,
  handleLogout,
  useContext,
  useState,
  useRouter,
  Spinner,
  MenuProps,
} from "@/helpers/imports";

const Menu: React.FC<MenuProps> = ({ onClose }) => {
  const { updateUserEmail } = useContext(UserContext);
  const router = useRouter();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const logoutHandler = async () => {
    await handleLogout(setShowSpinner, updateUserEmail, router);
  };

  return (
    <div className={styles.menu}>
      <button
        className={styles["close-btn"]}
        onClick={() => {
          onClose(false);
        }}
      >
        <Image src="images/cross.svg" width={20} height={20} alt="cross icon" />
      </button>
      <Link href="/dashboard">Dashboard</Link>
      <button onClick={logoutHandler} className={styles["logout-btn"]}>
        Logout{" "}
        {showSpinner && <Spinner color=" rgba(0, 0, 0, 0.4)" height="16px" />}
      </button>
    </div>
  );
};

export default Menu;
