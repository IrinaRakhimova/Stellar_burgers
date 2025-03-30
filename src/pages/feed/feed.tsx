import styles from "./feed.module.css";
import { OrdersDetails } from "../../components/feed/orders-details/orders-details";
import { OrdersStatus } from "../../components/feed/orders-status/orders-status";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../services/store";

export const Feed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
    useEffect(() => {
      dispatch({ type: "websocket/start", payload: { type: "all" } });
  
      return () => {
        dispatch({ type: "websocket/stop" });
      };
    }, [dispatch]);

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
