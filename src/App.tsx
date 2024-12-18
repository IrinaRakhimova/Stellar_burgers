import './App.css';
import { AppHeader } from './components/app-header/app-header.js';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import { burgerData } from './utils/data';

function App() {
  return (
    <div className="app-container">
      <AppHeader />
      <BurgerConstructor burgerData = {burgerData}/>
    </div>
  )
}

export default App
