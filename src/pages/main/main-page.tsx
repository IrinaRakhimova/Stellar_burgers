import styles from "./main-page.module.css";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useEffect } from "react";
import { addIngredient } from "../../slices/burgerConstructorSlice";
import { useAppDispatch } from "../../store/hooks";
import { useMediaQuery } from "../../hooks/useIsMobile";
import { ConstructorFooter } from "../../components/constructor-footer/constructor-footer";

interface SavedIngredients {
  bun?: Ingredient;
  ingredients: Ingredient[];
}

export const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(1230);

  useEffect(() => {
    const savedIngredients = localStorage.getItem("selectedIngredients");
    if (savedIngredients) {
      const parsedIngredients: SavedIngredients = JSON.parse(savedIngredients);

      if (parsedIngredients.bun) {
        dispatch(addIngredient(parsedIngredients.bun));
      }

      parsedIngredients.ingredients.forEach((ingredient) => {
        dispatch(addIngredient(ingredient));
      });

      localStorage.removeItem("selectedIngredients");
    }
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.main}>
        <BurgerIngredients />
        {!isMobile && <BurgerConstructor />}
        {isMobile && <ConstructorFooter />}
      </div>
    </DndProvider>
  );
};
