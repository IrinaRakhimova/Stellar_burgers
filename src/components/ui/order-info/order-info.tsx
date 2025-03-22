import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const mockData = [
    {
      number: "163704603",
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
      number: "263704603",
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
      number: "363704603",
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
      number: "463704603",
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
      number: "563704603",
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
      number: "663704603",
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

  export const OrderInfo: React.FC = () => {
    const { number } = useParams<{ number: string }>(); 
    const order = mockData.find((order) => order.number === number); 

    const location = useLocation();

    const isModal =
    location.state && (location.state as { background?: boolean }).background;
  
    if (!order) {
      return <p className={styles.error}>Order not found.</p>;
    }
  
    const totalIngredients = order.ingredients.length;
    const displayedIngredients = order.ingredients.slice(0, 6);
    const extraCount = totalIngredients - 5;
  
    return (
      <div className={`${styles.container} ${isModal ? styles.modal : styles.page}`}>
        <div className={styles.card} key={order.number}>
          <div className={styles.cardFirstRow}>
            <p className={styles.number}>#{order.number}</p>
            
          </div>
          <p className={styles.name}>{order.name}</p>
          <p className={styles.status}>{order.status}</p>

          <p className={styles.ingredientsTitle}>Состав:</p>
          
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
            <div className={styles.cardLastRow}>
                <p className={styles.date}>{`${order.date}, ${order.time}`}</p>
            <div className={styles.price}>
              <p className={styles.priceNumber}>{order.price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    );
  };
