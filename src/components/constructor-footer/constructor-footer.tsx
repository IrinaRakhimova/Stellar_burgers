import React, { useMemo, useState } from "react";
import styles from "./constructor-footer.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createOrderThunk } from "../../slices/orderSlice";
import { resetIngredients } from "../../slices/burgerConstructorSlice";
import { useNavigate } from "react-router-dom";
import MobileOrder from "../modals/mobile-order/mobile-order";
import { hideModal, showModal } from "../../slices/orderSlice";

interface OrderState {
    isModalVisible: boolean;
  }

export const ConstructorFooter: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isModalVisible } = useAppSelector(
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
      bun._id,
      ...ingredients.map((i) => i._id),
      bun._id,
    ];

    try {
      await dispatch(createOrderThunk(ingredientIds)).unwrap();
      dispatch(resetIngredients());
      hideModal();
    } catch (error) {
      console.error("Order failed", error);
    }
  };

  const handleClose = () => {
      dispatch(hideModal());
    };

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.total}>
          <span className={styles.totalPrice}>{`Total: ${totalPrice}`}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={showModal} htmlType={"button"}>
          View Order
        </Button>
      </div>

      {isModalVisible && <MobileOrder handleOrderClick={handleOrderClick} onClose={handleClose} totalPrice={totalPrice}/>}
    </>
  );
};