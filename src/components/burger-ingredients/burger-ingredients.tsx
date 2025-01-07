import React, { useState, useRef, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../utils/api';
import IngredientDetails from '../modals/ingredient-details/ingredient-details';
import { IngredientsCategory } from './ingredients-category/ingredients-category';
import { fetchIngredients } from '../../utils/api';


export const BurgerIngredients: React.FC = () => {
    
    const [burgerData, setBurgerData] = useState<Ingredient[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [current, setCurrent] = useState('bun');
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
    const bunsRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainsRef = useRef<HTMLDivElement>(null);

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

    if (error) {
        return <p>Error: {error}</p>;
    }    

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
    
    const closeModal = () => {
        setSelectedIngredient(null);
    };

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
                    <IngredientsCategory categoryName = "Булки" categoryType="bun" setSelectedIngredient={setSelectedIngredient} burgerData={burgerData}/>
                </section>

                <section ref={saucesRef} className={styles.typeSection}>
                    <IngredientsCategory categoryName = "Соусы" categoryType="sauce" setSelectedIngredient={setSelectedIngredient} burgerData={burgerData}/>
                </section>

                <section ref={mainsRef} className={styles.typeSection}>
                    <IngredientsCategory categoryName = "Начинка" categoryType="main" setSelectedIngredient={setSelectedIngredient} burgerData={burgerData}/>
                </section>

                {selectedIngredient && (<IngredientDetails ingredient={selectedIngredient} onClose={closeModal} />)}
            </div>
        </div>
    );
};