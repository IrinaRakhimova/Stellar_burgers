import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-card.module.css";
import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setSelectedIngredient } from "../../services/slices/modalIngredientSlice";
import { getIngredients } from "../../services/slices/ingredientsSlice";
import { Link } from "react-router-dom";

export const IngredientCard = ({ ingredient }) => {
  const { bun, ingredients = [] } = useSelector((state) => ({
    bun: state.addedIngredients?.bun,
    ingredients: state.addedIngredients?.ingredients || [],
  }));

  const dispatch = useDispatch();

  const location = useLocation();

  const ingredientId = ingredient["_id"];

  const { _id, name, image, price, type } = ingredient;

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: { _id, name, image, price, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  const handleClick = useCallback(() => {
    dispatch(setSelectedIngredient(ingredient));
  }, [dispatch, ingredient]);

  const count =
    type === "bun" && bun?._id === _id
      ? 2
      : ingredients.filter((item) => item._id === _id).length;

  return (
    <Link
      key={ingredientId}
      to={`/ingredients/${ingredientId}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div
        ref={dragRef}
        className={styles.card}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onClick={handleClick}
      >
        <img src={image} alt={name} className={styles.image} />
        {count !== 0 && (
          <Counter count={count} size="default" extraClass="m-1" />
        )}
        <div className={styles.price}>
          <p className={styles.priceValue}>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.name}>{name}</p>
      </div>
    </Link>
  );
};

IngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
