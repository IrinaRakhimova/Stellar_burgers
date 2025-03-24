import React, { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/store";
import styles from "./orders-details.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface Order {
  ingredients: string[];
  number: number;
  createdAt: string;
  name: string;
  status: string;
  price?: number;
}

export const OrdersDetails: React.FC = () => {
  const location = useLocation();

  const orders: Order[] = useSelector(
    (state: RootState) => state.websocket.orders?.orders || []
  );

  const ingredientsData = useSelector(
    (state: RootState) => state.ingredients.ingredients || []
  );

  const ingredientMap = useMemo(() => {
    const map: Record<string, { image: string; price: number }> = {}; 
    ingredientsData.forEach((ingredient: any) => {
      map[ingredient._id] = { 
        image: ingredient.image, 
        price: ingredient.price
      };
    });
    return map;
  }, [ingredientsData]);

  return (
  <div className={styles.container}>
    {orders.map((order) => {
      const totalPrice = order.ingredients.reduce((sum, ingredientId) => {
        return sum + (ingredientMap[ingredientId]?.price); 
      }, 0);

      const totalIngredients = order.ingredients.length;
      const displayedIngredients = order.ingredients.slice(0, 6);
      const extraCount = totalIngredients - 5;

      const createdDate = new Date(order.createdAt);

      const formatOrderDate = (date: Date) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
      
        const orderDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      
        if (orderDate.getTime() === today.getTime()) {
          return `Today`;
        } else if (orderDate.getTime() === yesterday.getTime()) {
          return `Yesterday`;
        } else {
          return date.toLocaleDateString(); 
        }
      };
      
      const dateString = formatOrderDate(createdDate);
      const timeString = createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return (
        <Link
          to={`/feed/${order.number}`}
          key={order.number}
          className={styles.link}
          state={{ background: location }}
        >
          <div className={styles.card}>
            <div className={styles.cardFirstRow}>
              <p className={styles.number}>#{order.number}</p>
              <p className={styles.date}>{`${dateString}, ${timeString}`}</p>
            </div>
            <div className={styles.nameContainer}>
              <p className={styles.name}>{order.name}</p>
            </div>
            <div className={styles.cardLastRow}>
              <div className={styles.pictures}>
                {displayedIngredients.map((ingredientId, index) => {
                  const isFirstVisually = index === 0;
                  const ingredientImg = ingredientMap[ingredientId]?.image;
                  return (
                    <div key={ingredientId} className={styles.imageCard}>
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
