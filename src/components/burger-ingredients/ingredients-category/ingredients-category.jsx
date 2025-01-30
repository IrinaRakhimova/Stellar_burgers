import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-category.module.css';
import { IngredientCard } from '../../card/ingredient-card';

export const IngredientsCategory = ({ categoryName, categoryType, burgerData }) => {
  return (
    <>
      <h2 className={styles.bunHeader} id={categoryType}>{categoryName}</h2>
      <ul className={styles.ingredientType}>
        {burgerData.map(ingredient => (
          <li key={ingredient._id} className={styles.ingredient}>
            <IngredientCard ingredient={ingredient} />
          </li>
        ))}
      </ul>
    </>
  );
};

IngredientsCategory.propTypes = {
    categoryTitle: PropTypes.string,
    ingredients: PropTypes.array,
    onClick: PropTypes.func,
  };
  