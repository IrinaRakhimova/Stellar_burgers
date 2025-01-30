import './App.css';
import { AppHeader } from './app-header/app-header.jsx';
import { BurgerConstructor } from './burger-constructor/burger-constructor.jsx';
import { BurgerIngredients } from './burger-ingredients/burger-ingredients.jsx';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
  return (
    <div className="app-container">
      <AppHeader />
      <div className='main'>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor /> 
        </DndProvider>         
      </div>
    </div>
  )
}

export default App;
