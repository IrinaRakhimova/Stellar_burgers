import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-card.module.css';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedIngredient } from '../../services/slices/modalIngredientSlice'; // Updated import

export const IngredientCard = ({ ingredient }) => {
  const { bun, ingredients = [] } = useSelector((state) => ({
    bun: state.addedIngredients?.bun,
    ingredients: state.addedIngredients?.ingredients || [],
  }));

  const dispatch = useDispatch();

  // Destructure ingredient for clarity
  const { _id, name, image, price, type } = ingredient;

  // Drag-and-drop hook
  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: { _id, name, image, price, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Handle ingredient click to set it as selected
  const handleClick = useCallback(() => {
    dispatch(setSelectedIngredient(ingredient)); // Use the setSelectedIngredient action
  }, [dispatch, ingredient]);

  // Calculate the count of this ingredient in the cart
  const count = type === 'bun' && bun?._id === _id
    ? 2  // If it's a bun and it's selected, set count to 2
    : ingredients.filter((item) => item._id === _id).length;  // Otherwise, count how many times it's in the cart

  return (
    <div
      ref={dragRef} 
      className={styles.card}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={handleClick}
    >
      <img src={image} alt={name} className={styles.image} />
      {count !== 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <div className={styles.price}>
        <p className={styles.priceValue}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.name}>{name}</p>
    </div>
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