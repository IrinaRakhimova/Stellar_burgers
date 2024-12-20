import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../utils/data';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

interface BurgerIngredientsProps {
    burgerData: Ingredient[];
}

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ burgerData }) => {
  
    const [current, setCurrent] = useState('one');
  
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
                <h2 className="text text_type_main-medium mt-10 mb-6" id='buns'>Булки</h2>
                <ul className={styles.ingredientType}>
                    {burgerData.map((ingredient) => ingredient.type === "bun" && (
                        <li className={classNames(styles.ingredient, 'mb-8')}>
                            <img src={ingredient.image} alt={ingredient.name} />
                            <Counter count={1} size="default" extraClass="m-1" />

                            <div className={styles.price}>    
                                <p className='text text_type_digits-default mt-2 mb-2 mr-2'>{ingredient.price}</p>
                                <CurrencyIcon type="primary" />
                            </div> 

                            <p className={classNames(styles.name, "text text_type_main-default")}>{ingredient.name}</p>
                        </li>
                    ))} 
                </ul>
            </section>

            <section className={styles.typeSection}>
                <h2 className="text text_type_main-medium mt-2 mb-6" id='sauce'>Соусы</h2>
                <ul className={styles.ingredientType}>
                    {burgerData.map((ingredient) => ingredient.type === "sauce" && (
                        <li className={classNames(styles.ingredient, 'mb-8')}>
                            <img src={ingredient.image} alt={ingredient.name} />
                            <Counter count={1} size="default" extraClass="m-1" />

                            <div className={styles.price}>    
                                <p className='text text_type_digits-default mt-2 mb-2 mr-2'>{ingredient.price}</p>
                                <CurrencyIcon type="primary" />
                            </div> 

                            <p className={classNames(styles.name, "text text_type_main-default")}>{ingredient.name}</p>
                        </li>
                    ))} 
                </ul>
            </section>

            <section className={styles.typeSection}>
                <h2 className="text text_type_main-medium mt-2 mb-6" id='main'>Начинка</h2>
                <ul className={classNames(styles.ingredientType, 'mb-8')}>
                    {burgerData.map((ingredient) => ingredient.type === "main" && (
                        <li className={styles.ingredient}>
                            <img src={ingredient.image} alt={ingredient.name} />
                            <Counter count={1} size="default" extraClass="m-1" />

                            <div className={styles.price}>    
                                <p className='text text_type_digits-default mt-2 mb-2 mr-2'>{ingredient.price}</p>
                                <CurrencyIcon type="primary" />
                            </div> 

                            <p className={classNames(styles.name, "text text_type_main-default")}>{ingredient.name}</p>
                        </li>
                    ))} 
                </ul>
            </section>
        </div>

    </div>
  );
};