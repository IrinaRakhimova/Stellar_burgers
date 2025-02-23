import React from "react";
import styles from "./not-found.module.css";

export const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.number}>404</p>
      <p className={styles.text}>Not Found</p>
    </div>
  );
};
