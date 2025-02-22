import styles from "./not-found.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.number}>404 </p>
      <p className={styles.text}> Not Found</p>
    </div>
  );
}

export default NotFound;
