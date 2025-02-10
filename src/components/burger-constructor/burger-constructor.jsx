import React, { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../modals/order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, deleteIngredient, resetIngredients } from '../../services/slices/burgerConstructorSlice';
import { createOrder, hideModal } from '../../services/slices/orderSlice';
import { DraggableElement } from './draggable-element/draggable-element';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  
  // Corrected useSelector paths (assuming state name is `burgerConstructor`)
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { isModalVisible } = useSelector((state) => state.order); 

  const [{ isOver }, drop] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (!item.instanceId) {
        dispatch(addIngredient(item)); // Use Redux Toolkit's action
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Calculate total price using useMemo
  const totalPrice = useMemo(() => {
    return (
      (bun ? bun.price * 2 : 0) + ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
    );
  }, [bun, ingredients]);

  // Handle order button click
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
    
    dispatch(createOrder(ingredientIds))
      .then(() => {
        dispatch(resetIngredients()); 
      })
      .catch((error) => {
        console.error("Order creation failed", error);
      });
  };

  const handleClose = () => {
    dispatch(hideModal());
  };

  // Handle ingredient deletion
  const onDelete = (id) => {
    dispatch(deleteIngredient(id)); // Use Redux Toolkit's action
  };

  return (
    <div ref={drop} className={styles.container}>
      <ul className={styles.scrollContainer}>
        {/* Top Bun */}
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
            <div className={`${styles.bunHolderTop} ${isOver ? styles.active : ''}`}>
              <p className={styles.holderText}>Выберите булки</p>
            </div>
          )}
        </li>

        {/* Ingredients List */}
        <div className={styles.scroll}>
          {ingredients.length !== 0 ? (
            ingredients.map((ingredient) => {
              const realIndex = ingredients.findIndex(
                (item) => item.instanceId === ingredient.instanceId
              );

              return (
                <DraggableElement
                  key={ingredient.instanceId}
                  ingredient={ingredient}
                  index={realIndex}
                  onDelete={onDelete}
                />
              );
            })
          ) : (
            <div className={`${styles.ingredientHolder} ${isOver ? styles.active : ''}`}>
              <p className={styles.holderText}>Выберите начинку</p>
            </div>
          )}
        </div>

        {/* Bottom Bun */}
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
            <div className={`${styles.bunHolderBottom} ${isOver ? styles.active : ''}`}>
              <p className={styles.holderText}>Выберите булки</p>
            </div>
          )}
        </li>
      </ul>

      {/* Total Price and Order Button */}
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
