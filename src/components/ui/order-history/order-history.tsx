import React, { useMemo, useEffect } from "react";
import styles from "./order-history.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useMediaQuery } from "../../../hooks/useIsMobile";
import { Loader } from "../loader/loader";

export const OrderHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isSmallScreen = useMediaQuery(500);

  useEffect(() => {
    dispatch({ type: "websocket/start", payload: { type: "my" } });

    return () => {
      dispatch({ type: "websocket/stop" });
    };
  }, [dispatch]);

  const orders: Order[] = useAppSelector(
    (state) => state.websocket.userOrders || []
  );

  const connected = useAppSelector((state) => state.websocket.connected);

  const isLoading = connected && orders.length === 0;

  const ingredientsData = useAppSelector(
    (state) => state.ingredients.ingredients || []
  );

  const ingredientMap = useMemo(() => {
    const map: Record<string, { image: string; price: number }> = {};
    ingredientsData.forEach((ingredient: Ingredient) => {
      map[ingredient._id] = {
        image: ingredient.image,
        price: ingredient.price,
      };
    });
    return map;
  }, [ingredientsData]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      {[...orders].reverse().map((order) => {
        const totalPrice = order.ingredients.reduce((sum, ingredientId) => {
          return sum + ingredientMap[ingredientId]?.price;
        }, 0);

        const totalIngredients = order.ingredients.length;
        const maxVisible = isSmallScreen ? 3 : 6;
        const displayedIngredients = order.ingredients.slice(0, maxVisible);
        const extraCount = totalIngredients - (maxVisible - 1);

        const createdDate = new Date(order.createdAt);
        const formatOrderDate = (date: Date) => {
          const now = new Date();
          const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          const orderDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          );

          if (orderDate.getTime() === today.getTime()) return "Today";
          if (orderDate.getTime() === yesterday.getTime()) return "Yesterday";
          return date.toLocaleDateString();
        };

        const dateString = formatOrderDate(createdDate);
        const timeString = createdDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <Link
            to={`/profile/orders/${order.number}`}
            key={order.number}
            className={styles.link}
            state={{ background: location }}
          >
            <div className={styles.card}>
              <div className={styles.cardFirstRow}>
                <p className={styles.name}>Order #{order.number}</p>
                <p className={styles.date}>{`${dateString}, ${timeString}`}</p>
              </div>
              <div className={styles.nameContainer}>
                <p
                  className={`${styles.status} ${
                    order.status === "done" ? styles.done : ""
                  }`}
                >
                  {order.status === "done"
                    ? "Ready"
                    : order.status === "pending"
                    ? "Preparing"
                    : "Created"}
                </p>
              </div>
              <div className={styles.cardLastRow}>
                <div className={styles.pictures}>
                  {displayedIngredients.map((ingredientId, index) => {
                    const isFirstVisually = index === 0;
                    const ingredientImg = ingredientMap[ingredientId]?.image;
                    return (
                      <div
                        key={`${ingredientId}-${index}`}
                        className={styles.imageCard}
                      >
                        <div className={styles.imageBackground}></div>
                        <div className={styles.imageBackgroundOverlay}></div>
                        <img
                          src={ingredientImg}
                          alt="Ingredient"
                          className={styles.picture}
                        />
                        {isFirstVisually && extraCount > 0 && (
                          <div className={styles.extraOverlay}>
                            +{extraCount}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className={styles.price}>
                  <p className={styles.priceNumber}>{totalPrice}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
