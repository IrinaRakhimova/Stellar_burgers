import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from './ingredients-category/ingredients-category';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredientsThunk, setCurrentSection } from '../../services/slices/ingredientsSlice';

export const BurgerIngredients = () => {
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed, currentSection } =
    useSelector((state) => state.ingredients);

  const groupedIngredients = useMemo(() => {
    if (ingredients.length === 0) {
      return { bun: [], sauce: [], main: [] };
    }
    return {
      bun: ingredients.filter((item) => item.type === 'bun'),
      sauce: ingredients.filter((item) => item.type === 'sauce'),
      main: ingredients.filter((item) => item.type === 'main'),
    };
  }, [ingredients]);

  useEffect(() => {
    dispatch(fetchIngredientsThunk()); 
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const containerRect = scrollContainerRef.current.getBoundingClientRect();
    const sections = [
      { ref: bunsRef, id: 'bun' },
      { ref: saucesRef, id: 'sauce' },
      { ref: mainsRef, id: 'main' },
    ];

    let closestSection = null;
    let smallestDistance = Infinity;

    sections.forEach(({ ref, id }) => {
      if (ref.current) {
        const sectionRect = ref.current.getBoundingClientRect();
        const distanceY = Math.abs(containerRect.top - sectionRect.top);
        if (distanceY < smallestDistance) {
          smallestDistance = distanceY;
          closestSection = id;
        }
      }
    });

    const threshold = 50; 
    if (closestSection && smallestDistance < threshold && closestSection !== currentSection) {
      dispatch(setCurrentSection(closestSection)); 
    }
  }, [dispatch, currentSection]);

  const content = useMemo(() => {
    if (ingredientsRequest) return <p>Загрузка...</p>;
    if (ingredientsFailed) return <p>Ошибка загрузки ингредиентов.</p>;
    if (!ingredients.length) return <p>Ингредиенты не найдены.</p>;

    return (
      <div className={styles.scroll} onScroll={handleScroll}>
        <section id="bun" ref={bunsRef} className={styles.typeSection}>
          <IngredientsCategory categoryName="Булки" categoryType="bun" burgerData={groupedIngredients.bun} />
        </section>

        <section id="sauce" ref={saucesRef} className={styles.typeSection}>
          <IngredientsCategory categoryName="Соусы" categoryType="sauce" burgerData={groupedIngredients.sauce} />
        </section>

        <section id="main" ref={mainsRef} className={styles.typeSection}>
          <IngredientsCategory categoryName="Начинки" categoryType="main" burgerData={groupedIngredients.main} />
        </section>
      </div>
    );
  }, [ingredientsRequest, ingredients, ingredientsFailed, groupedIngredients]);

  return (
    <div className={styles.container} ref={scrollContainerRef}>
      <h1 className={styles.header}>Соберите бургер</h1>
      <section className={styles.tabs}>
        <Tab value="bun" active={currentSection === 'bun'}>Булки</Tab>
        <Tab value="sauce" active={currentSection === 'sauce'}>Соусы</Tab>
        <Tab value="main" active={currentSection === 'main'}>Начинки</Tab>
      </section>

      <div className={styles.scroll} ref={scrollContainerRef} onScroll={handleScroll}>
        {content}
      </div>
    </div>
  );
};