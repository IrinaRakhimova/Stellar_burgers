import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor.jsx";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients.jsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addIngredient } from "../../services/slices/burgerConstructorSlice";

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedIngredients = JSON.parse(
      localStorage.getItem("selectedIngredients")
    );
    if (savedIngredients) {
      if (savedIngredients.bun) {
        dispatch(addIngredient(savedIngredients.bun));
      }
      savedIngredients.ingredients.forEach((ingredient) => {
        dispatch(addIngredient(ingredient));
      });
      localStorage.removeItem("selectedIngredients");
    }
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main">
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </DndProvider>
  );
}

export default Main;
