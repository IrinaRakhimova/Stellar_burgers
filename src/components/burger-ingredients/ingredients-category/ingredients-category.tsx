import React from "react";
import styles from "./ingredients-category.module.css";
import { IngredientCard } from "../../card/ingredient-card";

interface IngredientsCategoryProps {
  categoryName: string;
  categoryType: string;
  burgerData: Ingredient[];
}

export const IngredientsCategory: React.FC<IngredientsCategoryProps> = ({
  categoryName,
  categoryType,
  burgerData,
}) => {
  return (
    <>
      <h2 className={styles.bunHeader} id={categoryType}>
        {categoryName}
      </h2>
      <ul className={styles.ingredientType}>
        {burgerData.map((ingredient) => (
          <li key={ingredient._id} className={styles.ingredient}>
            <IngredientCard ingredient={ingredient} />
          </li>
        ))}
      </ul>
    </>
  );
};
