import React, { useRef, useMemo, useCallback } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsCategory } from "./ingredients-category/ingredients-category";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCurrentSection } from "../../slices/ingredientsSlice";
import { Loader } from "../ui/loader/loader";

export const BurgerIngredients: React.FC = () => {
  const bunsRef = useRef<HTMLDivElement | null>(null);
  const saucesRef = useRef<HTMLDivElement | null>(null);
  const mainsRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed, currentSection } =
  useAppSelector(
      state =>
        state.ingredients as {
          ingredients: Ingredient[];
          ingredientsRequest: boolean;
          ingredientsFailed: boolean;
          currentSection: string;
        }
    );

  const groupedIngredients = useMemo(() => {
    if (ingredients.length === 0) {
      return {
        bun: [] as Ingredient[],
        sauce: [] as Ingredient[],
        main: [] as Ingredient[],
      };
    }
    return {
      bun: ingredients.filter((item) => item.type === "bun"),
      sauce: ingredients.filter((item) => item.type === "sauce"),
      main: ingredients.filter((item) => item.type === "main"),
    };
  }, [ingredients]);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const containerRect = scrollContainerRef.current.getBoundingClientRect();
    const sections = [
      { ref: bunsRef, id: "bun" },
      { ref: saucesRef, id: "sauce" },
      { ref: mainsRef, id: "main" },
    ];

    let closestSection: string | null = null;
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
    if (
      closestSection &&
      smallestDistance < threshold &&
      closestSection !== currentSection
    ) {
      dispatch(setCurrentSection(closestSection));
    }
  }, [dispatch, currentSection]);

  const content = useMemo(() => {
    if (ingredientsRequest) return <Loader />;
    if (ingredientsFailed) return <p>Ошибка загрузки ингредиентов.</p>;
    if (!ingredients.length) return <p>Ингредиенты не найдены.</p>;

    return (
      <div className={styles.scroll} onScroll={handleScroll}>
        <section id="bun" ref={bunsRef} className={styles.typeSection}>
          <IngredientsCategory
            categoryName="Булки"
            categoryType="bun"
            burgerData={groupedIngredients.bun}
          />
        </section>

        <section id="sauce" ref={saucesRef} className={styles.typeSection}>
          <IngredientsCategory
            categoryName="Соусы"
            categoryType="sauce"
            burgerData={groupedIngredients.sauce}
          />
        </section>

        <section id="main" ref={mainsRef} className={styles.typeSection}>
          <IngredientsCategory
            categoryName="Начинки"
            categoryType="main"
            burgerData={groupedIngredients.main}
          />
        </section>
      </div>
    );
  }, [
    ingredientsRequest,
    ingredients,
    ingredientsFailed,
    groupedIngredients,
    handleScroll,
  ]);

  return (
    <div className={styles.container} ref={scrollContainerRef}>
      <h1 className={styles.header}>Соберите бургер</h1>
      <section className={styles.tabs}>
        <Tab value="bun" active={currentSection === "bun"} onClick={() => {}}>
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentSection === "sauce"}
          onClick={() => {}}
        >
          Соусы
        </Tab>
        <Tab value="main" active={currentSection === "main"} onClick={() => {}}>
          Начинки
        </Tab>
      </section>

      <div
        className={styles.scroll}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {content}
      </div>
    </div>
  );
};
