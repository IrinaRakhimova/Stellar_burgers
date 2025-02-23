import React, { useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

interface ModalProps {
  children: ReactNode;
  header?: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, header, onClose }) => {
  if (!modalRoot) {
    console.error("Modal root not found in the DOM");
    return null;
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.cardTop}>
          <h1 className={styles.header}>{header}</h1>
          <div className={styles.close} onClick={onClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
