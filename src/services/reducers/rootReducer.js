import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './burgerConstructor';
import { modalReducer } from './modalIngredient';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    addedIngredients: constructorReducer,
    modal: modalReducer,
    order: orderReducer,
});