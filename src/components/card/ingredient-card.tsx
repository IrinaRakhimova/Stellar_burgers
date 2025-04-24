import React, { useCallback, useState } from "react";
import styles from "./ingredient-card.module.css";
import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, Link } from "react-router-dom";
import { setSelectedIngredient } from "../../slices/ingredientsSlice";
import {
  addIngredient,
  deleteIngredient,
} from "../../slices/burgerConstructorSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ingredientTranslations } from "../../utils/translationMap";
import { useMediaQuery } from "../../hooks/useIsMobile";
import {
  incrementIngredientCount,
  decrementIngredientCount,
} from "../../slices/ingredientsSlice";

interface IngredientCardProps {
  ingredient: Ingredient;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
}) => {
  const isMobile = useMediaQuery(1230);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { _id, name, image, price, type } = ingredient;

  const { bun, ingredients = [] } = useAppSelector((state) => ({
    bun: state.burgerConstructor.bun,
    ingredients: state.burgerConstructor.ingredients || [],
  }));

  const localCount = useAppSelector(
    (state) => state.ingredients.localCounts[_id] || 0
  );

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

  const handleAdd = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (type === "bun") {
      if (!bun) {
        dispatch(addIngredient(ingredient));
        dispatch(incrementIngredientCount(_id));
      } else if (bun._id === _id) {
      } else {
      }
    } else {
      dispatch(addIngredient(ingredient));
      dispatch(incrementIngredientCount(_id));
    }
  };

  const handleRemove = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (type === "bun") {
      if (bun && bun._id === _id) {
        dispatch(deleteIngredient(bun.instanceId));
        dispatch(decrementIngredientCount(_id));
      }
    } else {
      const foundInstance = ingredients.find(
        (item) => item._id === ingredient._id
      );
      if (foundInstance) {
        dispatch(deleteIngredient(foundInstance.instanceId));
        dispatch(decrementIngredientCount(_id));
      }
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardContainer}>
        <Link
          key={_id}
          to={`/ingredients/${_id}`}
          state={{ background: location }}
          className={styles.link}
          data-testid="ingredient-link"
        >
          <div
            ref={!isMobile ? dragRef : undefined}
            className={styles.card}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            onClick={handleClick}
            data-testid="ingredient"
          >
            <img src={image} alt={name} className={styles.image} />
            {count !== 0 && (
              <Counter count={count} size="default" extraClass="m-4" />
            )}
            <div className={styles.price}>
              <p className={styles.priceValue}>{price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <p className={styles.name}>
              {ingredientTranslations[name] || name}
            </p>
          </div>
        </Link>

        {isMobile && (
          <div className={styles.mobileControls}>
            {type === "bun" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (!bun || bun._id !== _id) {
                    dispatch(addIngredient(ingredient));
                    dispatch(incrementIngredientCount(_id));
                  } else {
                    dispatch(deleteIngredient(bun.instanceId));
                    dispatch(decrementIngredientCount(_id));
                  }
                }}
                className={styles.ingredientButton}
              >
                {bun && bun._id === _id ? "Remove" : "Add"}
              </button>
            ) : (
              <div className={styles.counterRow}>
                <button
                  onClick={(e) => handleRemove(e as React.SyntheticEvent)}
                  className={styles.ingredientButton}
                >
                  −
                </button>
                <span className={styles.localCount}>{localCount}</span>
                <button
                  onClick={(e) => handleAdd(e as React.SyntheticEvent)}
                  className={styles.ingredientButton}
                >
                  +
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
