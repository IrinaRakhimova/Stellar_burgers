import React from "react";
import styles from "./orders-status.module.css";

const orders = {
  ready: [84356834, 84356831, 84356832, 84356833, 84356835],
  making: [74356834, 74356831, 74356832],
  total: 28752,
  today: 138,
};

export const OrdersStatus: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.ready}>
          <p className={styles.readyTitle}>Готовы:</p>
          {orders.ready.map((order) => (
            <p className={styles.readyNumbers}>{order}</p>
          ))}
        </div>
        <div className={styles.making}>
          <p className={styles.makingTitle}>В работе:</p>
          {orders.making.map((order) => (
            <p className={styles.makingNumbers}>{order}</p>
          ))}
        </div>
      </div>
      <div>
        <p className={styles.totalTitle}>Выполнено за все время:</p>
        <p className={styles.totalNumber}>{orders.total}</p>
      </div>
      <div>
        <p className={styles.todayTitle}>Выполнено за сегодня:</p>
        <p  className={styles.todayNumber}>{orders.today}</p>
      </div>
    </div>
  );
};
