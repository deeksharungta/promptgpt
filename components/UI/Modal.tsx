import styles from "./Modal.module.scss";
import { ModalProps, useState } from "@/helpers/imports";

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const [close, setClose] = useState(false);

  const closeHandler = () => {
    setClose(true);
    setTimeout(() => {
      onClose && onClose();
    }, 200);
  };

  return (
    <>
      <div className={styles["backdrop"]} onClick={closeHandler} />
      <div className={`${styles["modal"]} ${close ? styles.close : ""}`}>
        {children}
      </div>
    </>
  );
};

export default Modal;
