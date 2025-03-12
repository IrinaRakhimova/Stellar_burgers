import React from "react";
import styles from "./order-details.module.css";
import Modal from "../modal/modal";
import OrderReady from "../../../images/order-ready";
import { useSelector } from "react-redux";
import { Loader } from "../../ui/loader/loader";
import { RootState } from "../../../services/store";

interface OrderDetailsProps {
  onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ onClose }) => {
  const { orderNumber, orderName, orderRequest } = useSelector(
    (state: RootState) => state.order
  );

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        {orderRequest ? (
          <Loader />
        ) : (
          <>
            <h1 className={styles.header}>{orderNumber}</h1>
            <p className={styles.orderText}>{orderName}</p>
            <OrderReady />
            <p className={styles.statusText}>Ваш заказ начали готовить</p>
            <p className={styles.locationText}>
              Дождитесь готовности на орбитальной станции
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};

export default OrderDetails;
