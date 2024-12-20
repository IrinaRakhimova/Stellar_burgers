import React from 'react';
import styles from './burger-constructor.module.css';
import { Ingredient } from '../../utils/data';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

interface BurgerConstructorProps {
    burgerData: Ingredient[];
}

export const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ burgerData }) => {
    const bun = burgerData.find((ingredient) => ingredient.type === 'bun'); 
    const otherIngredients = burgerData.filter((ingredient) => ingredient.type !== 'bun');
    const totalPrice = burgerData.reduce((sum, ingredient) => sum + ingredient.price, 0); 

    return (
        <div className={classNames(styles.container, 'mt-25')}>
            <ul className={styles.scrollContainer}>
                <li>
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
                        <li>
                            <DragIcon type="primary" />
                            <ConstructorElement text={ingredient.name}  thumbnail={ingredient.image} price={ingredient.price}/>
                        </li>
                    ))}
                </div>
                <li>
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
                <p className="text text_type_digits-medium">{totalPrice}</p>
                <div className='mr-10'>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
};