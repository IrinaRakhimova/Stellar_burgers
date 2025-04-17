import React, { useEffect } from "react";
import styles from "./ingredient-details.module.css";
import { useParams, useLocation } from "react-router-dom";
import { fetchIngredientsThunk } from "../../../slices/ingredientsSlice";
import { Loader } from "../../ui/loader/loader";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ingredientTranslations } from "../../../utils/translationMap";

const IngredientDetails: React.FC = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isModal =
    location.state && (location.state as { background?: boolean }).background;

  const ingredients = useAppSelector(
    (state) => state.ingredients.ingredients as Ingredient[]
  );
  const isLoading = useAppSelector(
    (state) => state.ingredients.ingredientsRequest
  );
  const hasError = useAppSelector(
    (state) => state.ingredients.ingredientsFailed
  );

  const selectedIngredient = ingredients.find(
    (item) => item._id === ingredientId
  );

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredientsThunk());
    }
  }, [dispatch, ingredients.length]);

  if (isLoading)
    return (
      <p>
        <Loader />
      </p>
    );
  if (hasError) return <p>Failed to load ingredient</p>;
  if (!selectedIngredient) return <p>Ingredient not found</p>;

  return (
    <div
      className={`${styles.container} ${isModal ? styles.modal : styles.page}`}
      data-testid="ingredient-modal"
    >
      <div className={styles.info}>
        <img
          src={selectedIngredient.image_large}
          alt={ingredientTranslations[selectedIngredient.name] || selectedIngredient.name}
          className={styles.image}
        />
        <p className={styles.name} data-testid="ingredient-name">{ingredientTranslations[selectedIngredient.name] || selectedIngredient.name}</p>
        <div className={styles.nutrition}>
          <div className={styles.textContainer}>
            <p className={styles.nutrient}>Calories, kcal</p>
            <p className={styles.nutrientValue} data-testid="ingredient-calories">
              {selectedIngredient.calories}
            </p>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.nutrient}>Proteins, g</p>
            <p className={styles.nutrientValue}>
              {selectedIngredient.proteins}
            </p>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.nutrient}>Fats, g</p>
            <p className={styles.nutrientValue}>{selectedIngredient.fat}</p>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.nutrient}>Carbohydrates, g</p>
            <p className={styles.nutrientValue}>
              {selectedIngredient.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
