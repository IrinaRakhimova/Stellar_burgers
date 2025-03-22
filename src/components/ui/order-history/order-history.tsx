import React from "react";
import styles from "./order-history.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, Link } from "react-router-dom";

const mockData = [
  {
    number: "763704603",
    date: "Сегодня",
    time: "11.03",
    name: "Interstellar бургер",
    status: "Готовится",
    ingredients: [
      {
        id: 1,
        img: "src/assets/react.svg",
      },
      {
        id: 2,
        img: "src/assets/react.svg",
      },
      {
        id: 3,
        img: "src/assets/react.svg",
      },
    ],
    price: "100",
  },
  {
    number: "863704603",
    date: "Сегодня",
    time: "11.03",
    name: "Interstellar бургер",
    status: "Готовится",
    ingredients: [
      {
        id: 1,
        img: "src/assets/react.svg",
      },
      {
        id: 2,
        img: "src/assets/react.svg",
      },
      {
        id: 3,
        img: "src/assets/react.svg",
      },
      {
        id: 4,
        img: "src/assets/react.svg",
      },
      {
        id: 5,
        img: "src/assets/react.svg",
      },
      {
        id: 6,
        img: "src/assets/react.svg",
      },
      {
        id: 7,
        img: "src/assets/react.svg",
      },
      {
        id: 8,
        img: "src/assets/react.svg",
      },
    ],
    price: "100",
  },
  {
    number: "963704603",
    date: "Сегодня",
    time: "11.03",
    name: "Interstellar бургер",
    status: "Готовится",
    ingredients: [
      {
        id: 1,
        img: "src/assets/react.svg",
      },
      {
        id: 2,
        img: "src/assets/react.svg",
      },
      {
        id: 3,
        img: "src/assets/react.svg",
      },
    ],
    price: "100",
  },
  {
    number: "1063704603",
    date: "Сегодня",
    time: "11.03",
    name: "Interstellar бургер",
    status: "Готовится",
    ingredients: [
      {
        id: 1,
        img: "src/assets/react.svg",
      },
      {
        id: 2,
        img: "src/assets/react.svg",
      },
      {
        id: 3,
        img: "src/assets/react.svg",
      },
    ],
    price: "100",
  },
  {
    number: "1163704603",
    date: "Сегодня",
    time: "11.03",
    name: "Interstellar бургер",
    status: "Готовится",
    ingredients: [
      {
        id: 1,
        img: "src/assets/react.svg",
      },
      {
        id: 2,
        img: "src/assets/react.svg",
      },
      {
        id: 3,
        img: "src/assets/react.svg",
      },
    ],
    price: "100",
  },
  {
    number: "1263704603",
    date: "Сегодня",
    time: "11.03",
    name: "Interstellar бургер",
    status: "Готовится",
    ingredients: [
      {
        id: 1,
        img: "src/assets/react.svg",
      },
      {
        id: 2,
        img: "src/assets/react.svg",
      },
      {
        id: 3,
        img: "src/assets/react.svg",
      },
    ],
    price: "100",
  },
];

export const OrderHistory: React.FC = () => {
  const location = useLocation();
    return (
      <div className={styles.container}>
        {mockData.map((order) => {
          const totalIngredients = order.ingredients.length;
          const displayedIngredients = order.ingredients.slice(0, 6); 
          const extraCount = totalIngredients - 5;
  
          return (
            <Link
            to={`/profile/orders/${order.number}`}
            key={order.number}
            className={styles.link}
            state={{ background: location }}
          >
            <div className={styles.card} key={order.number}>
              <div className={styles.cardFirstRow}>
                <p className={styles.number}>{order.number}</p>
                <p className={styles.date}>{`${order.date}, ${order.time}`}</p>
              </div>
              <p className={styles.name}>{order.name}</p>
              <p className={styles.status}>{order.status}</p>
              <div className={styles.cardLastRow}>
                <div className={styles.pictures}>
                  {displayedIngredients.map((ingredient, index) => {
                    const isFirstVisually = index === 0; 
  
                    return (
                      <div key={ingredient.id} className={styles.imageCard}>
                        <div className={styles.imageBackground}></div>
                        <img src={ingredient.img} alt="No" className={styles.picture} />
                        {isFirstVisually && extraCount > 0 && (
                          <div className={styles.extraOverlay}>+{extraCount}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className={styles.price}>
                  <p className={styles.priceNumber}>{order.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </div>
          </Link>);
        })}
      </div>
    );
  };
  