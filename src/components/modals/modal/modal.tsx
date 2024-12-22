import { FC, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface ModalProps {
  onClose: () => void;
  header: string;
}

const modalRoot = document.getElementById("react-modals");

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, header, onClose }) => {
  if (!modalRoot) {
    console.error("Modal root not found in the DOM");
    return null; 
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.cardTop}>
          <h1 className="text text_type_main-large">{header}</h1>
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