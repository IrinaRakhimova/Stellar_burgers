import React from "react";
import styles from "./orders-status.module.css";
import { useAppSelector } from "../../../store/hooks";
import { useMediaQuery } from "../../../hooks/useIsMobile";

export const OrdersStatus: React.FC = () => {
  const { allOrders, total, totalToday } = useAppSelector(
    (state) => state.websocket
  );

  const isVeryMobile = useMediaQuery(560);

  const getLastOrders = (status: string) =>
    allOrders
      .filter((order) => order.status.toLowerCase() === status)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 20);

  const chunkArray = (arr: Order[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const readyOrders = getLastOrders("done");
  const makingOrders = getLastOrders("pending");

  const readyOrdersChunks = isVeryMobile
    ? [readyOrders] 
    : chunkArray(readyOrders, 10);

  const makingOrdersChunks = isVeryMobile
    ? [makingOrders] 
    : chunkArray(makingOrders, 10);

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.ready}>
          <p className={styles.readyTitle}>Ready:</p>
          <div className={styles.ordersGrid}>
            {readyOrdersChunks.map((chunk, index) => (
              <div key={`ready-col-${index}`} className={styles.orderColumn}>
                {chunk.map((order) => (
                  <p key={`ready-${order.number}`} className={styles.readyNumbers}>
                    {order.number}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.making}>
          <p className={styles.makingTitle}>Preparing:</p>
          <div className={styles.ordersGrid}>
            {makingOrdersChunks.map((chunk, index) => (
              <div key={`making-col-${index}`} className={styles.orderColumn}>
                {chunk.map((order) => (
                  <p key={`making-${order.number}`} className={styles.makingNumbers}>
                    {order.number}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.statContainer}>
        <div className={styles.statItem}>
          <p className={styles.totalTitle}>All orders</p>
          <p className={styles.totalNumber}>{total}</p>
        </div>
        <div className={styles.statItem}>
          <p className={styles.todayTitle}>Orders today</p>
          <p className={styles.todayNumber}>{totalToday}</p>
        </div>
      </div>
    </div>
  );
};

