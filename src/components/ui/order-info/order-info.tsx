import React, { useMemo, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../services/store";
import { fetchOrderByNumberThunk } from "../../../services/slices/orderSlice";
import { Loader } from "../loader/loader";

export const OrderInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const allOrders = useSelector(
    (state: RootState) => state.websocket.allOrders || []
  );
  const userOrders = useSelector(
    (state: RootState) => state.websocket.userOrders || []
  );
  const ingredientsData = useSelector(
    (state: RootState) => state.ingredients.ingredients || []
  );

  const fetchedOrder = useSelector((state: RootState) => state.order.order);
  const orderLoading = useSelector((state: RootState) => state.order.loading);
  const orderError = useSelector((state: RootState) => state.order.error);

  const orders: Order[] = useMemo(() => {
    return location.pathname.includes("/profile/orders")
      ? userOrders
      : allOrders;
  }, [location.pathname, allOrders, userOrders]);

  const { number } = useParams<{ number: string }>();
  const orderNumber = Number(number);
  let order =
    orders.find((order) => order.number === orderNumber) || fetchedOrder;

  useEffect(() => {
    if (!order) {
      dispatch(fetchOrderByNumberThunk(orderNumber));
    }
  }, [order, orderNumber, dispatch]);

  const isModal =
    location.state && (location.state as { background?: boolean }).background;

  if (orderLoading)
    return (
      <p className={styles.loading}>
        <Loader />
      </p>
    );
  if (orderError) return <p className={styles.error}>{orderError}</p>;
  if (!order) return <p className={styles.error}>Order not found.</p>;

  const createdDate = order.createdAt ? new Date(order.createdAt) : new Date();
  const formatOrderDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const orderDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (orderDate.getTime() === today.getTime()) return `Сегодня`;
    if (orderDate.getTime() === yesterday.getTime()) return `Вчера`;
    return date.toLocaleDateString();
  };
  const dateString = formatOrderDate(createdDate);
  const timeString = createdDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const ingredientMap = Object.fromEntries(
    ingredientsData.map((ingredient) => [ingredient._id, ingredient])
  );

  const ingredientCount: Record<string, number> = {};
  order.ingredients.forEach((id) => {
    ingredientCount[id] = (ingredientCount[id] || 0) + 1;
  });

  const totalPrice = Object.entries(ingredientCount).reduce(
    (sum, [id, count]) => sum + (ingredientMap[id]?.price || 0) * count,
    0
  );

  return (
    <div
      className={`${styles.container} ${isModal ? styles.modal : styles.page}`}
    >
      <div className={styles.card} key={order.number}>
        <div className={styles.cardFirstRow}>
          <p className={styles.number}>#{order.number}</p>
        </div>
        <div className={styles.nameContainer}>
          <p className={styles.name}>{order.name}</p>
          <p
            className={`${styles.status} ${
              order.status === "done" ? styles.done : ""
            }`}
          >
            {order.status === "done"
              ? "Выполнен"
              : order.status === "pending"
              ? "Готовится"
              : "Создан"}
          </p>
        </div>

        <p className={styles.ingredientsTitle}>Состав:</p>

        <div className={styles.pictures}>
          {Object.entries(ingredientCount).map(([id, count]) => {
            const ingredient = ingredientMap[id];
            return (
              <div key={id} className={styles.ingredientRow}>
                <div className={styles.ingredientRowStart}>
                  <div className={styles.imageCard}>
                    <div className={styles.imageBackground}></div>
                    <div className={styles.imageBackgroundOverlay}></div>
                    <img
                      src={ingredient?.image}
                      alt={ingredient?.name}
                      className={styles.picture}
                    />
                  </div>
                  <p className={styles.ingredientName}>{ingredient?.name}</p>
                </div>
                <div className={styles.ingredientRowEnd}>
                  <p
                    className={styles.ingredientCount}
                  >{`${count} x ${ingredient?.price}`}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.cardLastRow}>
          <p className={styles.date}>{`${dateString}, ${timeString}`}</p>
          <div className={styles.price}>
            <p className={styles.priceNumber}>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
