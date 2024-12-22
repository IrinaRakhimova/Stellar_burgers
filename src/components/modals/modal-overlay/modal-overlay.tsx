import React from "react";
import styles from './modal-overlay.module.css';

interface ModalProps {
  onClose: () => void;
}

const ModalOverlay: React.FC<ModalProps> = () => {
  return (
    <span className={styles.overlay}></span>
  );
};

export default ModalOverlay;