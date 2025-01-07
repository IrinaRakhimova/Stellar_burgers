import React, { useState, useEffect, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { Ingredient } from '../../utils/api';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchIngredients } from '../../utils/api';
import OrderDetails from '../modals/order-details/order-details';

export const BurgerConstructor: React.FC = () => {
    const [burgerData, setBurgerData] = useState<Ingredient[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [modalIsVisible, setModalIsVisible] = useState(false);
        
    useEffect(() => {
        const getIngredients = async () => {
            try {
                const ingredients = await fetchIngredients();
                setBurgerData(ingredients);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error');
            }
        };       
        getIngredients();
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    const bun = useMemo(() => burgerData.find((ingredient) => ingredient.type === 'bun'), [burgerData]); 
    const otherIngredients = useMemo(() => burgerData.filter((ingredient) => ingredient.type !== 'bun'), [burgerData]);
    const totalPrice = useMemo(() => burgerData.reduce((sum, ingredient) => sum + ingredient.price, 0), [burgerData]);
    
    const handleOrderClick = () => {
        setModalIsVisible(true);
    };

    const handleClose = () => {
        setModalIsVisible(false);
    };

    return (
        <div className={styles.container}>
            <ul className={styles.scrollContainer}>
                <li className={styles.bunItem}>
                    {bun && (                    
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    )}
                </li>
                <div className={styles.scroll}>                    
                    {otherIngredients.map((ingredient) => (
                        <li key={ingredient._id}  className={styles.constructorElement}>
                            <DragIcon type="primary" />
                            <ConstructorElement text={ingredient.name}  thumbnail={ingredient.image} price={ingredient.price}/>
                        </li>
                    ))}
                </div>
                <li className={styles.bunItem}>
                    {bun && (
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                         />
                    )}
                </li>
            </ul>
            <div className={styles.totalGroup}>
                <p className={styles.totalPrice}>{totalPrice}</p>
                <div className={styles.iconContainer}>
                    <CurrencyIcon type="primary" className={styles.icon}/>
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
                    Оформить заказ
                </Button>
                {modalIsVisible && <OrderDetails onClose={handleClose}/>}
            </div>
        </div>
    );
};