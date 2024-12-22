import React, { useState, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../utils/data';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { fetchIngredients } from '../../utils/data';
import IngredientDetails from '../modals/ingredient-details/ingredient-details';


export const BurgerIngredients: React.FC = () => {
  
    const [current, setCurrent] = useState('one');
    const [burgerData, setBurgerData] = useState<Ingredient[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

    useEffect(() => {
        const getIngredients = async () => {
          try {
            const ingredients = await fetchIngredients();
            setBurgerData(ingredients);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
          }
        };
    
        getIngredients();
      }, []);

      const handleIngredientClick = (ingredient: Ingredient) => {
        setSelectedIngredient(ingredient);
      };
    
      const closeModal = () => {
        setSelectedIngredient(null);
      };
    
      if (error) {
        return <p>Error: {error}</p>;
      }

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
                        <li key={ingredient._id} className={classNames(styles.ingredient, 'mb-8')} onClick={() => handleIngredientClick(ingredient)}>
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
                        <li key={ingredient._id} className={classNames(styles.ingredient, 'mb-8')} onClick={() => handleIngredientClick(ingredient)}>
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
                        <li key={ingredient._id} className={styles.ingredient} onClick={() => handleIngredientClick(ingredient)}>
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

            {selectedIngredient && (
        <IngredientDetails ingredient={selectedIngredient} onClose={closeModal} />
      )}
        </div>

    </div>
  );
};