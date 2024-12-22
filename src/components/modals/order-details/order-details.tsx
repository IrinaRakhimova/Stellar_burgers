import React from "react";
import styles from './order-details.module.css'
import Modal from "../modal/modal";
import OrderReady from "../../../images/order-ready";

interface OrderDetailsProps {
    onClose: () => void;
}
  

const OrderDetails: React.FC<OrderDetailsProps> = ({  onClose }) => {
  return (
    <Modal onClose={onClose} >
        <div className={styles.container}>
            <h1 className={styles.header}>034536</h1>
            <p className={styles.orderText}>идентификатор заказа</p>
            <OrderReady />
            <p className={styles.statusText}>Ваш заказ начали готовить</p>
            <p className={styles.locationText}>Дождитесь готовности на орбитальной станции</p>
        </div>
    </Modal>
  );
};

export default OrderDetails;