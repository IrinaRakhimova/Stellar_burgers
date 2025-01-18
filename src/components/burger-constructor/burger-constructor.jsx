import React, { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../modals/order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_INGREDIENT } from '../../services/actions/burgerConstructor';
import { createOrder, hideModal } from '../../services/actions/order';
import { DraggableElement } from './draggable-element/draggable-element';
import { addIngredient, resetIngredients } from '../../services/actions/burgerConstructor';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, ingredients = [] } = useSelector((state) => state.addedIngredients || {});
  const { isModalVisible } = useSelector((state) => state.order); 

  const [{ isOver }, drop] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (!item.instanceId) {
        dispatch(addIngredient({ ...item }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });


  const totalPrice = useMemo(() => {
    return (
      (bun ? bun.price * 2 : 0) + ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0));
  }, [bun, ingredients]);

  const handleOrderClick = () => {
    if (!bun) {
        alert('Please add a bun to your order!');
        return;
    }
    if (ingredients.length === 0) {
        alert('Please add some ingredients to your order!');
        return;
    }
    const ingredientIds = [
        ...(bun ? [bun._id] : []), 
        ...ingredients.map((i) => i._id), 
        ...(bun ? [bun._id] : []),
    ];
    dispatch(createOrder(ingredientIds)) // Create the order
    .then(() => {
      dispatch(resetIngredients()); // Reset ingredients after successful order
    })
    .catch((error) => {
      console.error("Order creation failed", error);
    });
};

  const handleClose = () => {
    dispatch(hideModal());
  };

  const onDelete = (id) => {
    dispatch({ type: DELETE_INGREDIENT, id });
  };

  return (
    <div ref={drop} className={styles.container}>
      <ul className={styles.scrollContainer}>
        <li className={styles.bunItem}>
          {bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <div className={`${styles.bunHolderTop} ${isOver ? styles.active : ''}`}><p className={styles.holderText}>Выберите булки</p></div>
          )}
        </li>

        <div className={styles.scroll}>
          {ingredients.length != 0 ? (ingredients.map((ingredient, index) => {
            const realIndex = ingredients.findIndex(
              (item) => item.instanceId === ingredient.instanceId
            );

            return (
              <DraggableElement
                key={`${ingredient._id}-${index}`}
                ingredient={ingredient}
                index={realIndex}
                onDelete={onDelete}
              />
            );
          })) : (
            <div className={`${styles.ingredientHolder} ${isOver ? styles.active : ''}`}><p className={styles.holderText}>Выберите начинку</p></div>
          )}
        </div>

        <li className={styles.bunItem}>
          {bun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <div className={`${styles.bunHolderBottom} ${isOver ? styles.active : ''}`}><p className={styles.holderText}>Выберите булки</p></div>
          )}
        </li>
      </ul>

      <div className={styles.totalGroup}>
        <p className={styles.totalPrice}>{totalPrice}</p>
        <div className={styles.iconContainer}>
          <CurrencyIcon type="primary" className={styles.icon} />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderClick}
        >
          Оформить заказ
        </Button>
        {isModalVisible && <OrderDetails onClose={handleClose} />}
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  addedIngredients: PropTypes.object, 
  isModalVisible: PropTypes.bool,
};