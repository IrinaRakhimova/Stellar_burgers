import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import orderReducer from './slices/orderSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import modalIngredientReducer from './slices/modalIngredientSlice';
import userDataReducer from './slices/userDataSlice';

export const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    modalIngredient: modalIngredientReducer,
    userData: userDataReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools in development mode
});

export default store;