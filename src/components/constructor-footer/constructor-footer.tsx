import React, { useMemo, useState } from "react";
import styles from "./constructor-footer.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createOrderThunk } from "../../slices/orderSlice";
import { resetIngredients } from "../../slices/burgerConstructorSlice";
import { useNavigate } from "react-router-dom";
import MobileOrder from "../modals/mobile-order/mobile-order";
import { hideMobileModal, showMobileModal, hideModal } from "../../slices/orderSlice";
import OrderDetails from "../modals/order-details/order-details";
import { resetAllCounts } from "../../slices/ingredientsSlice";

interface OrderState {
  isMobileModalVisible: boolean;
  isModalVisible: boolean;
}

export const ConstructorFooter: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isMobileModalVisible, isModalVisible } = useAppSelector(
      (state: { order: OrderState }) => state.order
    );

  const { bun, ingredients } = useAppSelector((state) => state.burgerConstructor);

  const totalPrice = useMemo(() => {
    return (
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
    );
  }, [bun, ingredients]);

  const handleOrderClick = async () => {
      const accessToken = localStorage.getItem("accessToken");
  
      if (!bun) {
        alert("Missing bun!");
        return;
      }
      if (ingredients.length === 0) {
        alert("You need to add ingredients!");
        return;
      }
  
      if (!accessToken) {
        navigate("/login", { state: { from: "/" } });
        return;
      }

      const ingredientIds = [
        ...(bun ? [bun._id] : []),
        ...ingredients.map((i) => i._id),
        ...(bun ? [bun._id] : []),
      ];
  
      try {
       dispatch(hideMobileModal());
        await dispatch(createOrderThunk(ingredientIds)).unwrap();       
        dispatch(resetIngredients());
        dispatch(resetAllCounts());
      } catch (error) {
        console.error("Failed to create order", error);
      }
    };

  const handleMobileModalClose = () => {
      dispatch(hideMobileModal());
    };

 const handleMobileModalOpen = () => {
    dispatch(showMobileModal());
 };   

 const handleModalClose = () => {
  dispatch(hideModal());
};

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.total}>
          <span className={styles.totalPrice}>{`Total: ${totalPrice}`}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={handleMobileModalOpen} htmlType={"button"} disabled={totalPrice === 0}>
          View Order
        </Button>
      </div>

      {isMobileModalVisible && <MobileOrder handleOrderClick={handleOrderClick} onClose={handleMobileModalClose} totalPrice={totalPrice} />}
      {isModalVisible && <OrderDetails onClose={handleModalClose} />}
    </>
  );
};