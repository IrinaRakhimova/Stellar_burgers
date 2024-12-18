import React, { useState } from 'react';
import styles from './burger-constructor.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../utils/data';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface BurgerConstructorProps {
    burgerData: Ingredient[];
}

export const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ burgerData }) => {
  
    const [current, setCurrent] = useState('one')
  
    return (
    <div className={styles.container}>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <section className={styles.tabs}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </section>
        <div className={`${styles.scroll} custom-scroll`}>
            <section className={styles.typeSection}>
                <h2 className="text text_type_main-medium mt-10">Булки</h2>
                <ul className={styles.ingredientType}>
                    {burgerData.map((ingredient) => ingredient.type === "bun" && (
                        <li className={styles.ingredient}>
                            <img src={ingredient.image} alt={ingredient.name} />
                            <Counter count={1} size="default" extraClass="m-1" />

                            <div className={styles.price}>    
                                <p className='text text_type_digits-default mr-2 mb-2'>{ingredient.price}</p>
                                <CurrencyIcon type="primary" />
                            </div> 

                            <p className="text text_type_main-default">{ingredient.name}</p>
                        </li>
                    ))} 
                </ul>
            </section>

            <section className={styles.typeSection}>
                <h2 className="text text_type_main-medium mt-10">Соусы</h2>
                <ul className={styles.ingredientType}>
                    {burgerData.map((ingredient) => ingredient.type === "sauce" && (
                        <li className={styles.ingredient}>
                            <img src={ingredient.image} alt={ingredient.name} />
                            <Counter count={1} size="default" extraClass="m-1" />

                            <div className={styles.price}>    
                                <p className='text text_type_digits-default mr-2 mb-2'>{ingredient.price}</p>
                                <CurrencyIcon type="primary" />
                            </div> 

                            <p className="text text_type_main-default">{ingredient.name}</p>
                        </li>
                    ))} 
                </ul>
            </section>

            <section className={styles.typeSection}>
                <h2 className="text text_type_main-medium mt-10">Начинка</h2>
                <ul className={styles.ingredientType}>
                    {burgerData.map((ingredient) => ingredient.type === "main" && (
                        <li className={styles.ingredient}>
                            <img src={ingredient.image} alt={ingredient.name} />
                            <Counter count={1} size="default" extraClass="m-1" />

                            <div className={styles.price}>    
                                <p className='text text_type_digits-default mr-2 mb-2'>{ingredient.price}</p>
                                <CurrencyIcon type="primary" />
                            </div> 

                            <p className="text text_type_main-default">{ingredient.name}</p>
                        </li>
                    ))} 
                </ul>
            </section>
        </div>

    </div>
  );
};