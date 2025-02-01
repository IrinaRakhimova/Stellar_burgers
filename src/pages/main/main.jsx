import styles from "./main.module.css";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor.jsx";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients.jsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function Main() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
      <div className="main">
        <BurgerIngredients />
        <BurgerConstructor />
        </div>
      </DndProvider>
    </div>
  );
}

export default Main;
