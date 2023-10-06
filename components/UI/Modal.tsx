import React, { ReactNode } from "react";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose?: () => void;
  children?: ReactNode;
}

const Backdrop: React.FC<ModalProps> = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

const ModalOverlay: React.FC<ModalProps> = ({ children }) => {
  return <div className={styles.modal}>{children}</div>;
};

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <>
      {createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("overlays")!
      )}
      {createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById("overlays")!
      )}
    </>
  );
};

export default Modal;
