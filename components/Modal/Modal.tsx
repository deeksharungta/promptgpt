import styles from "./Modal.module.scss";
import { ModalProps } from "@/helpers/imports";

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const closeHandler = () => {
    onClose && onClose();
  };

  return (
    <>
      <div className={styles["backdrop"]} onClick={closeHandler} />
      <div className={styles["modal"]}>{children}</div>
    </>
  );
};

export default Modal;
