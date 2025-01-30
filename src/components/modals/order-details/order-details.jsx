import React from "react";
import PropTypes from "prop-types"; 
import styles from './order-details.module.css';
import Modal from "../modal/modal";
import OrderReady from "../../../images/order-ready";
import { useSelector } from "react-redux";

const OrderDetails = ({ onClose }) => {
  const { orderNumber, orderName } = useSelector(state => state.order);
  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h1 className={styles.header}>{orderNumber}</h1>
        <p className={styles.orderText}>{orderName}</p>
        <OrderReady />
        <p className={styles.statusText}>Ваш заказ начали готовить</p>
        <p className={styles.locationText}>Дождитесь готовности на орбитальной станции</p>
      </div>
    </Modal>
  );
};

OrderDetails.propTypes = {
  onClose: PropTypes.func,
};

export default OrderDetails;