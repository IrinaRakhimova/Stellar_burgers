import React from "react";
import styles from './ingredient-details.module.css';
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const selectedIngredient = useSelector(state => state.modalIngredient.selectedIngredient);

  return (
    <div className={styles.container}>
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
