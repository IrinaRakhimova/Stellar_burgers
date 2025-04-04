import React, { useMemo } from "react";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../modals/order-details/order-details";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addIngredient,
  resetIngredients,
} from "../../slices/burgerConstructorSlice";
import { createOrderThunk, hideModal } from "../../slices/orderSlice";
import { DraggableElement } from "./draggable-element/draggable-element";
import { useNavigate } from "react-router-dom";

interface BurgerConstructorState {
  bun: Ingredient | null;
  ingredients: Ingredient[];
}

interface OrderState {
  isModalVisible: boolean;
}

export const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { bun, ingredients } = useAppSelector(
    (state: { burgerConstructor: BurgerConstructorState }) =>
      state.burgerConstructor
  );
  const { isModalVisible } = useAppSelector(
    (state: { order: OrderState }) => state.order
  );

  const [{ isOver }, drop] = useDrop({
    accept: "ingredient",
    drop: (item: Ingredient) => {
      if (!item.instanceId) {
        dispatch(addIngredient(item));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const totalPrice = useMemo(() => {
    return (
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
    );
  }, [bun, ingredients]);

  const handleOrderClick = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!bun) {
      alert("Не хватает булки!");
      return;
    }
    if (ingredients.length === 0) {
      alert("Нужно добавить ингредиенты!");
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
      await dispatch(createOrderThunk(ingredientIds)).unwrap();
      dispatch(resetIngredients());
    } catch (error) {
      console.error("Не удалось создать заказ", error);
    }
  };

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <div ref={drop} className={styles.container}>
      <ul className={styles.scrollContainer}>
        <li className={styles.bunItem}>
          {bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <div
              className={`${styles.bunHolderTop} ${
                isOver ? styles.active : ""
              }`}
            >
              <p className={styles.holderText}>Выберите булки</p>
            </div>
          )}
        </li>

        <div className={styles.scroll}>
          {ingredients.length !== 0 ? (
            ingredients.map((ingredient) => {
              const realIndex = ingredients.findIndex(
                (item) => item.instanceId === ingredient.instanceId
              );

              return (
                <DraggableElement
                  key={ingredient.instanceId}
                  ingredient={ingredient}
                  index={realIndex}
                />
              );
            })
          ) : (
            <div
              className={`${styles.ingredientHolder} ${
                isOver ? styles.active : ""
              }`}
            >
              <p className={styles.holderText}>Выберите начинку</p>
            </div>
          )}
        </div>

        <li className={styles.bunItem}>
          {bun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <div
              className={`${styles.bunHolderBottom} ${
                isOver ? styles.active : ""
              }`}
            >
              <p className={styles.holderText}>Выберите булки</p>
            </div>
          )}
        </li>
      </ul>

      <div className={styles.totalGroup}>
        <p className={styles.totalPrice}>{totalPrice}</p>
        <div className={styles.iconContainer}>
          <CurrencyIcon type="primary" className={styles.icon} />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderClick}
        >
          Оформить заказ
        </Button>
        {isModalVisible && <OrderDetails onClose={handleClose} />}
      </div>
    </div>
  );
};
