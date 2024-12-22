import './App.css';
import { AppHeader } from './app-header/app-header.js';
import { BurgerConstructor } from './burger-constructor/burger-constructor.js';
import { BurgerIngredients } from './burger-ingredients/burger-ingredients.js';

function App() {
  return (
    <div className="app-container">
      <AppHeader />
      <div className='main'>
        <BurgerIngredients />
        <BurgerConstructor />        
      </div>
    </div>
  )
}

export default App
