import React from "react";
import styles from "./order-details.module.css";
import Modal from "../modal/modal";
import OrderReady from "../../../images/order-ready";
import { Loader } from "../../ui/loader/loader";
import { useAppSelector } from "../../../store/hooks";

interface OrderDetailsProps {
  onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ onClose }) => {
  const { orderNumber, orderName, orderRequest } = useAppSelector(
    (state) => state.order
  );

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        {orderRequest ? (
          <Loader />
        ) : (
          <>
            <h1 className={styles.header}>{orderNumber}</h1>
            <OrderReady />
            <p className={styles.statusText}>Your order is being prepared</p>
            <p className={styles.locationText}>
              Please wait for completion at the orbital station
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};

export default OrderDetails;
