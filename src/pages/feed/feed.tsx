import styles from "./feed.module.css";
import { OrdersDetails } from "../../components/feed/orders-details/orders-details";
import { OrdersStatus } from "../../components/feed/orders-status/orders-status";

export const Feed: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
      <p className={styles.title}>Лента заказов</p>
      </div>
      <div className={styles.flexContainer}>
          <OrdersDetails />
          <OrdersStatus />
      </div>
    </div>
  );
};
