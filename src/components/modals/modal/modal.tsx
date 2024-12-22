import { FC, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface ModalProps {
  onClose: () => void;
}

const modalRoot = document.getElementById("react-modals");

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, onClose }) => {
  if (!modalRoot) {
    console.error("Modal root not found in the DOM");
    return null; 
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.close}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;