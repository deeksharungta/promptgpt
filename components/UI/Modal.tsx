import { ReactNode, useState } from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  onClose?: () => void;
  children?: ReactNode;
};

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
