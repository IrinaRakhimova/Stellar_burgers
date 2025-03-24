import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/store"; 
import styles from "./orders-status.module.css";

export const OrdersStatus: React.FC = () => {
  const { orders, total, totalToday } = useSelector((state: RootState) => ({
    orders: state.websocket.orders?.orders || [],
    total: state.websocket.orders?.total || 0,
    totalToday: state.websocket.orders?.totalToday || 0,
  }));

  const getLastOrders = (status: string) =>
    orders
      .filter((order: { status: string; }) => order.status.toLowerCase() === status) 
      .sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by latest
      .slice(0, 5); 

  const readyOrders = getLastOrders("done");
  const makingOrders = getLastOrders("pending");

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.ready}>
          <p className={styles.readyTitle}>Готовы:</p>
          <div className={styles.readyContainer}>
          {readyOrders.map((order: { number: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
            <p key={`ready-${order.number}`} className={styles.readyNumbers}>
              {order.number}
            </p>
          ))}
          </div>
        </div>
        <div className={styles.making}>
          <p className={styles.makingTitle}>В работе:</p>
          {makingOrders.map((order: { number: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
            <p key={`making-${order.number}`} className={styles.makingNumbers}>
              {order.number}
            </p>
          ))}
        </div>
      </div>
      <div>
        <p className={styles.totalTitle}>Выполнено за все время:</p>
        <p className={styles.totalNumber}>{total}</p>
      </div>
      <div>
        <p className={styles.todayTitle}>Выполнено за сегодня:</p>
        <p className={styles.todayNumber}>{totalToday}</p>
      </div>
    </div>
  );
};
