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
    onClose(false);
  };

  return (
    <div className={styles.menu}>
      <button
        className={styles["close-btn"]}
        onClick={() => {
          onClose(false);
        }}
      >
        <Image
          src="/images/cross.svg"
          width={20}
          height={20}
          alt="cross icon"
        />
      </button>
      <Link
        href="/dashboard"
        onClick={() => {
          onClose(false);
        }}
      >
        Dashboard
      </Link>
      {!showSpinner ? (
        <button onClick={logoutHandler} className={styles["logout-btn"]}>
          Logout
        </button>
      ) : (
        <Spinner color=" rgba(0, 0, 0, 0.4)" height="16px" />
      )}
    </div>
  );
};

export default Menu;
