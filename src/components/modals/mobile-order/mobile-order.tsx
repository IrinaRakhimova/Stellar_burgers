import React from "react";
import styles from "./mobile-order.module.css";
import Modal from "../modal/modal";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../../store/hooks";

interface MobileOrderProps {
  onClose: () => void;
  handleOrderClick: () => void;
  totalPrice: number;
}

const MobileOrder: React.FC<MobileOrderProps> = ({ onClose, handleOrderClick, totalPrice }) => {
  const { bun, ingredients } = useAppSelector((state) => state.burgerConstructor);

  return (
    <Modal header="Your Order" onClose={onClose}>
          <div className={styles.modalContent}>
            <div className={styles.ingredientsList}>
              {bun && (
                <div className={styles.ingredientItem}>
                  <span>{bun.name} (bun)</span> <span>{bun.price * 2}</span>
                </div>
              )}
              {ingredients.map((i) => (
                <div key={i.instanceId} className={styles.ingredientItem}>
                  <span>{i.name}</span> <span>{i.price}</span>
                </div>
              ))}
            </div>

            <div className={styles.footerActions}>
              <div className={styles.totalConfirm}>
                <span className={styles.totalPrice}>{totalPrice}</span>
                <CurrencyIcon type="primary" />
              </div>
              <Button size="medium" onClick={handleOrderClick} htmlType={"button"}>
                Place Order
              </Button>
              <Button size="medium" type="secondary" onClick={onClose} htmlType={"button"}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
  );
};

export default MobileOrder;