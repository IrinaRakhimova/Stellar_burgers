import React, { useCallback } from "react";
import styles from "./ingredient-card.module.css";
import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { setSelectedIngredient } from "../../services/slices/ingredientsSlice";
import { RootState, AppDispatch } from "../../services/store";

interface IngredientCardProps {
  ingredient: Ingredient;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
}) => {
  const { bun, ingredients = [] } = useSelector((state: RootState) => ({
    bun: state.burgerConstructor.bun,
    ingredients: state.burgerConstructor.ingredients || [],
  }));

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

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
      key={_id}
      to={`/ingredients/${_id}`}
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
