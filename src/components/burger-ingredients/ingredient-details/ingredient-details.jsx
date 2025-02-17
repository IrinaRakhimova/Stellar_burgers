import React from "react";
import styles from './ingredient-details.module.css';
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { fetchIngredientsThunk } from "../../../services/slices/ingredientsSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Loader } from "../../ui/loader/loader";

const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const isModal = location.state && location.state.background;

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const isLoading = useSelector((state) => state.ingredients.ingredientsRequest);
  const hasError = useSelector((state) => state.ingredients.ingredientsFailed);

  const selectedIngredient = ingredients.find((item) => item._id === ingredientId);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredientsThunk());
    }
  }, [dispatch, ingredients.length]);

  if (isLoading) return <p><Loader /></p>;
  if (hasError) return <p>Не удалось загрузить ингредиент</p>;
  if (!selectedIngredient) return <p>Ингредиент не найден</p>;

  return (
    <div className={`${styles.container} ${isModal ? styles.modal : styles.page}`}>
      <div className={styles.info}>
        <img
          src={selectedIngredient.image_large}
          alt={selectedIngredient.name}
          className={styles.image}
        />
        <p className={styles.name}>{selectedIngredient.name}</p>
        <div className={styles.nutrition}>
          <div className={styles.textContainer}>
            <p className={styles.nutrient}>Калории, ккал</p>
            <p className={styles.nutrientValue}>{selectedIngredient.calories}</p>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.nutrient}>Белки, г</p>
            <p className={styles.nutrientValue}>{selectedIngredient.proteins}</p>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.nutrient}>Жиры, г</p>
            <p className={styles.nutrientValue}>{selectedIngredient.fat}</p>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.nutrient}>Углеводы, г</p>
            <p className={styles.nutrientValue}>{selectedIngredient.carbohydrates}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
