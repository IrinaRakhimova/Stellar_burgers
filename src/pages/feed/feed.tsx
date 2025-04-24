import styles from "./feed.module.css";
import { OrdersDetails } from "../../components/feed/orders-details/orders-details";
import { OrdersStatus } from "../../components/feed/orders-status/orders-status";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { useMediaQuery } from "../../hooks/useIsMobile";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"; 

export const Feed: React.FC = () => {
  const isMobile = useMediaQuery(1230);
  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState<"orders" | "status">("status");

  useEffect(() => {
    dispatch({ type: "websocket/start", payload: { type: "all" } });
    return () => {
      dispatch({ type: "websocket/stop" });
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>Order Feed</p>
      </div>

      {isMobile ? (
        <>
          <div className={styles.tabs}>
            <Tab value="status" active={currentTab === "status"} onClick={() => setCurrentTab("status")}>
              Status
            </Tab>
            <Tab value="orders" active={currentTab === "orders"} onClick={() => setCurrentTab("orders")}>
              Orders
            </Tab>
            
          </div>

          <div className={styles.mobileContent}>
            {currentTab === "status" && <OrdersStatus />}
            {currentTab === "orders" && <OrdersDetails />}         
          </div>
        </>
      ) : (
        <div className={styles.flexContainer}>
          <OrdersDetails />
          <OrdersStatus />
        </div>
      )}
    </div>
  );
};