import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../utils/data';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchIngredients } from '../../utils/data';
import IngredientDetails from '../modals/ingredient-details/ingredient-details';


export const BurgerIngredients: React.FC = () => {
  
    const [current, setCurrent] = useState('bun');
    const [burgerData, setBurgerData] = useState<Ingredient[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
    const bunsRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainsRef = useRef<HTMLDivElement>(null);

    const handleTabClick = (tab: string) => {
        setCurrent(tab);
        switch (tab) {
            case 'bun':
                bunsRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'sauce':
                saucesRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'main':
                mainsRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    };

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
    
    const closeModal = useCallback(() => {
        setSelectedIngredient(null);
    }, []);
    
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Соберите бургер</h1>
            <section className={styles.tabs}>
                <Tab value="bun" active={current === 'bun'} onClick={() => handleTabClick('bun')}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={() => handleTabClick('sauce')}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={() => handleTabClick('main')}>
                    Начинки
                </Tab>
            </section>
            <div className={styles.scroll}>
                <section ref={bunsRef} className={styles.typeSection}>
                    <h2 className={styles.bunHeader} id='buns'>Булки</h2>
                    <ul className={styles.ingredientType}>
                        {burgerData.map((ingredient) => ingredient.type === "bun" && (
                            <li key={ingredient._id} className={styles.ingredient} onClick={() => handleIngredientClick(ingredient)}>
                                <img src={ingredient.image} alt={ingredient.name} className={styles.image}/>
                                <Counter count={1} size="default" extraClass="m-1" />

                                <div className={styles.price}>    
                                    <p className={styles.priceValue}>{ingredient.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div> 

                                <p className={styles.name}>{ingredient.name}</p>
                            </li>
                        ))} 
                    </ul>
                </section>

                <section ref={saucesRef} className={styles.typeSection}>
                    <h2 className={styles.sauceHeader} id='sauce'>Соусы</h2>
                    <ul className={styles.ingredientType}>
                        {burgerData.map((ingredient) => ingredient.type === "sauce" && (
                            <li key={ingredient._id} className={styles.ingredient} onClick={() => handleIngredientClick(ingredient)}>
                                <img src={ingredient.image} alt={ingredient.name} />
                                <Counter count={1} size="default" extraClass="m-1" />

                                <div className={styles.price}>    
                                    <p className={styles.priceValue}>{ingredient.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div> 

                                <p className={styles.name}>{ingredient.name}</p>
                            </li>
                        ))} 
                    </ul>
                </section>

                <section ref={mainsRef} className={styles.typeSection}>
                    <h2 className={styles.mainHeader} id='main'>Начинка</h2>
                    <ul className={styles.ingredientType}>
                        {burgerData.map((ingredient) => ingredient.type === "main" && (
                            <li key={ingredient._id} className={styles.ingredient} onClick={() => handleIngredientClick(ingredient)}>
                                <img src={ingredient.image} alt={ingredient.name} />
                                <Counter count={1} size="default" extraClass="m-1" />

                                <div className={styles.price}>    
                                    <p className={styles.priceValue}>{ingredient.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div> 

                                <p className={styles.name}>{ingredient.name}</p>
                            </li>
                        ))} 
                    </ul>
                </section>

                {selectedIngredient && (<IngredientDetails ingredient={selectedIngredient} onClose={closeModal} />)}
            </div>
        </div>
    );
};