import './App.css';
import { AppHeader } from './components/app-header/app-header.js';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor.js';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients.js';
import { burgerData } from './utils/data';

function App() {
  return (
    <div className="app-container">
      <AppHeader />
      <div className='main'>
        <BurgerIngredients burgerData = {burgerData}/>
        <BurgerConstructor burgerData = {burgerData}/>        
      </div>
    </div>
  )
}

export default App
