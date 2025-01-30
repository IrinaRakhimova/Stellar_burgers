import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-card.module.css';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { SET_SELECTED_INGREDIENT } from '../../services/actions/modalIngredient';

export const IngredientCard = ({ ingredient }) => {
  const { bun, ingredients = [] } = useSelector((state) => state.addedIngredients || {});
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: {
      _id: ingredient._id,
      name: ingredient.name,
      image: ingredient.image,
      price: ingredient.price,
      type: ingredient.type,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClick = () => {
    dispatch({ type: SET_SELECTED_INGREDIENT, ingredient });
  };

  const count = ingredient.type === 'bun' && bun?._id === ingredient._id
    ? 2 
    : ingredients.filter((item) => item._id === ingredient._id).length;

  return (
    <div
      ref={dragRef} 
      className={styles.card}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={handleClick}
    >
      <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
      {count !== 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <div className={styles.price}>
        <p className={styles.priceValue}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.name}>{ingredient.name}</p>
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