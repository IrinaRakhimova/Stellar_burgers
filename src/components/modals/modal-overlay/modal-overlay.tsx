import React from "react";
import styles from './modal-overlay.module.css';

interface ModalProps {
  onClose: () => void;
}

const ModalOverlay: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}></div>
  );
};

export default ModalOverlay;