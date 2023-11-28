import { ReactNode } from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  onClose?: () => void;
  children: ReactNode;
};

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
